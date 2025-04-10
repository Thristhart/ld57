import { add, addMut, angleDistance, copyMut, length, normalizeVector, scale, subtract } from "#src/vector.ts";
import React, { useSyncExternalStore } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
    bgmBiome1,
    bgmBiome2,
    bgmBiome3,
    bgmBiome4,
    playCollisionSound,
    pressureDamageSFX1,
    pressureDamageSFX2,
    switchBGM,
    youDied,
} from "./audio";
import Flock from "./entities/boids/flock";
import FlockingBoid from "./entities/boids/flockingboid";
import { DebugVector } from "./entities/debugvector";
import { Entity } from "./entities/entity";
import { Player } from "./entities/player";
import { Checkpoint, GameState, GameUpgradeLevels, Message } from "./gametypes";
import { screenshakeKeyframes } from "./screenshake";
import { CollectableName, collectablesList, defaultGameState, flockList, upgrades } from "./startstate";
import { Vector } from "./vector";
import cloneDeep from "lodash.clonedeep";
import { MessageEntity } from "./entities/messageentity";
import { Collectable } from "./entities/collectable";
import { camera, isPointOnScreen } from "./canvas";
import { mousePosition } from "./input";
import { isWithinBounds, lerp } from "./util";
import { animate, tickAnimations } from "./animation";

const fuelScale = 0.125;
const hullScale = 1.5;
let nextEntId = 0;
const checkpointFuelPoints = 20;
const checkpointHullPoints = 20;

export function useGameStateValue<K extends keyof GameState>(key: K): GameState[K] {
    return useSyncExternalStore(
        (onStoreChange: () => void) => {
            gameManager.subscribeToStateChange(key, onStoreChange);
            return () => gameManager.unsubscribeFromStateChange(key, onStoreChange);
        },
        () => gameManager.getGameState(key)
    );
}

export function useUpgradedMaxValue<K extends keyof GameUpgradeLevels>(
    property: K
): (typeof upgrades)[K][number]["upgradeValue"] {
    useGameStateValue("upgrades"); // makes us re-render when upgrades changes
    return gameManager.getUpgradedMaxValue(property);
}

const bossBoundsTopLeft = { x: 2360, y: 32772 };
const bossBoundsBottomRight = { x: 3902, y: 35880 };
const bossBoundsCameraPosition = { x: 3133, y: 33616 };
const bossBoundsCameraScale = 1.1;
const bossBoundsPlayerPos = { x: 2660, y: 33661 };
const bossBoundsPlayerAngle = 5.88195;

export class GameManager {
    private rerenderUI: () => void = () => {};
    private gameState: GameState = defaultGameState;
    public maxPixelWidth: number = 4000;
    public maxPixelHeight: number = 36000;
    public maxDepth = 5000;
    private mapEntities = new Map<number, Entity>();
    public player: Player;

    public loading = true;
    public gameOverTimestamp: number | undefined;

    public checkpoints: Checkpoint[] = [];
    public isIntro = true;
    public isDatingSim = false;

    public iFrames = 0;

    constructor() {
        const root = ReactDOM.createRoot(document.getElementById("root")!);
        const rootRender = () =>
            root.render(
                <React.StrictMode>
                    <App
                        isIntro={this.isIntro}
                        loading={this.loading}
                        gameOver={this.gameOverTimestamp !== undefined}
                        hasCheckpoint={this.checkpoints.length > 0}
                        isDatingSim={this.isDatingSim}
                    />
                </React.StrictMode>
            );
        this.rerenderUI = rootRender;

        this.player = this.addEntity(new Player(2000, 200));

        collectablesList.forEach((collectable) => {
            collectable.entityId = this.addEntity(new Collectable(collectable)).id;
        });

        flockList.forEach((flock) => {
            this.addEntity(new Flock(flock));
        });
    }

    stateChangeSubscriptions = new Map<string, Set<() => void>>();
    public subscribeToStateChange<K extends keyof GameState>(property: K, onStoreChange: () => void) {
        const setSubscriptions = this.stateChangeSubscriptions.get(property) ?? new Set();
        setSubscriptions.add(onStoreChange);
        this.stateChangeSubscriptions.set(property, setSubscriptions);
    }
    public unsubscribeFromStateChange<K extends keyof GameState>(property: K, onStoreChange: () => void) {
        this.stateChangeSubscriptions.get(property)?.delete(onStoreChange);
    }

    public getAllGameState() {
        return this.gameState;
    }

    public setGameState<K extends keyof GameState>(property: K, value: GameState[K]): void {
        this.gameState[property] = value;
        this.stateChangeSubscriptions.get(property)?.forEach((callback) => callback());
        if (this.countUpgrades() > 5 && this.getUpgradedMaxValue("depthUpgradeLevel") > 4000) {
            this.player.upgradeLevel = 3;
        } else if (this.countUpgrades() > 3) {
            this.player.upgradeLevel = 2;
        }
    }

    public countUpgrades() {
        return (
            this.gameState.depthUpgradeLevel +
            this.gameState.inventoryUpgradeLevel +
            this.gameState.fuelUpgradeLevel +
            this.gameState.hullUpgradeLevel
        );
    }

    public addGameStateMessage(value: Message): void {
        const messages = this.gameState.messageList;
        this.gameState.messageList = [...messages, value];
        this.stateChangeSubscriptions.get("messageList")?.forEach((callback) => callback());
    }

    public addGameStateSeenMaterial(name: CollectableName): void {
        const oldSet = this.gameState.seenMaterials;
        const newSet = new Set(oldSet);
        newSet.add(name);
        this.gameState.seenMaterials = newSet;
        this.stateChangeSubscriptions.get("seenMaterials")?.forEach((callback) => callback());
    }

    public getGameState<K extends keyof GameState>(property: K): GameState[K] {
        return this.gameState[property];
    }

    public getUpgradedMaxValue<K extends keyof GameUpgradeLevels>(
        property: K
    ): (typeof upgrades)[K][number]["upgradeValue"] {
        const level = this.gameState[property];
        const value = this.gameState.upgrades[property][level].upgradeValue;
        return value;
    }

    public startGame = () => {
        this.isIntro = false;
        this.forceUpdate();
    };

    public forceUpdate = () => this.rerenderUI();

    public addEntity<Ent extends Entity>(ent: Ent) {
        let id = nextEntId++;
        this.mapEntities.set(id, ent);
        ent.id = id;
        return ent;
    }

    public deleteEntity<Ent extends Entity>(ent: number | Ent) {
        if (typeof ent === "number") {
            this.mapEntities.delete(ent);
        } else {
            this.mapEntities.delete(ent.id);
            if (ent instanceof FlockingBoid) {
                ent.flock.instances.flockingBoids.splice(ent.flock.instances.flockingBoids.indexOf(ent), 1);
            }
        }
    }

    public getEntity(id: number) {
        return this.mapEntities.get(id);
    }

    public getAllEntities() {
        return this.mapEntities.values();
    }

    public setCheckPoint() {
        const newState = cloneDeep(this.gameState);
        this.checkpoints.push({
            playerX: this.player.x,
            playerY: this.player.y,
            gameState: newState,
        });
    }

    public loadCheckpoint() {
        if (this.checkpoints.length > 0) {
            const lastCheckpoint = this.checkpoints[this.checkpoints.length - 1];

            this.gameState = cloneDeep(lastCheckpoint.gameState);
            this.player.x = lastCheckpoint.playerX;
            this.player.y = lastCheckpoint.playerY;
            this.player.velocity.x = 0;
            this.player.velocity.y = 0;
            this.player.acceleration.x = 0;
            this.player.acceleration.y = 0;
            this.gameOverTimestamp = undefined;
            this.isDatingSim = false;
            camera.scale = 1;
            this.forceUpdate();
            this.isDatingSim = false;

            const leftUI = document.querySelector(".LeftUI") as HTMLDivElement;
            const rightUI = document.querySelector(".RightUI") as HTMLDivElement;
            const canvas = document.querySelector("canvas") as HTMLCanvasElement;

            leftUI.style.transform = "";
            rightUI.style.transform = "";
            canvas.width = 1080;
            canvas.height = 1920;
        }
    }

    isAnimatingDatingSim = false;

    public tick(dt: number) {
        tickAnimations(dt);
        if (this.gameOverTimestamp || gameManager.isAnimatingDatingSim || gameManager.isDatingSim) {
            return;
        }
        for (const ent of this.getAllEntities()) {
            ent.tick(dt);
        }

        gameManager.setGameState("alert", null);

        // set the player depth
        const playerY = this.player.y;
        const depth = Math.floor((playerY * this.maxDepth) / (this.maxPixelHeight + 4000));
        this.setGameState("currentDepth", depth);

        // set the hull damage
        const hullPoints = this.gameState.hullPoints;
        if (!this.iFrames && this.player.collisions.length > 0 && length(this.player.velocity) > 6) {
            const damage = length(this.player.velocity) * hullScale;
            const newHullPoints = hullPoints - Math.floor(damage);
            this.setGameState("hullPoints", newHullPoints);
            playCollisionSound();
            this.iFrames = 500;
        }
        if (this.iFrames) {
            this.iFrames -= dt;
        }
        if (this.iFrames < 0) {
            this.iFrames = 0;
        }

        const fuel = this.gameState.fuelPoints;
        // set fuel spent
        if (this.player.acceleration) {
            const fuelExpended = length(this.player.acceleration);
            const fuelScaled = Math.max(fuel - fuelExpended * (fuelScale * dt), 0);
            this.setGameState("fuelPoints", fuelScaled);
        }

        if (fuel <= 0) {
            this.setGameState("alert", { text: "FUEL DEPLETED", type: "error" });
        }

        const maxDepth = gameManager.getUpgradedMaxValue("depthUpgradeLevel");

        // add a checkpoint if conditions match
        if (
            depth > (this.checkpoints.length + 1) * 1000 &&
            depth < maxDepth &&
            fuel > checkpointFuelPoints &&
            hullPoints > checkpointHullPoints
        ) {
            this.setCheckPoint();
            this.addEntity(new MessageEntity(this.player.x, this.player.y, "CHECKPOINT SAVED"));
        }

        const biome1DepthMax = 1000;
        const biome2DepthMax = biome1DepthMax + 1000;
        const biome3DepthMax = biome2DepthMax + 1000;

        if (depth < biome1DepthMax) {
            // choose correct bgm for depth
            // beware: arbitrary numbers, change these to match actual biome differences
            switchBGM(bgmBiome1);
        } else if (depth < biome2DepthMax) {
            switchBGM(bgmBiome2);
        } else if (depth < biome3DepthMax) {
            switchBGM(bgmBiome3);
        } else {
            switchBGM(bgmBiome4);
        }

        if (depth > maxDepth && !localStorage.getItem("noclip") && !localStorage.getItem("god")) {
            this.setGameState("alert", { text: "MAXIMUM DEPTH EXCEEDED", type: "error" });
            if (!pressureDamageSFX1.playing()) {
                pressureDamageSFX1.play();
            }
            if (this.depthDamageTimer === undefined) {
                this.depthDamageTimer = 300;
            }
            this.depthDamageTimer -= dt;
            if (this.depthDamageTimer <= 0) {
                this.hurtFromDepth();
                this.depthDamageTimer = 1000;
            }
        } else {
            this.depthDamageTimer = undefined;
            if (pressureDamageSFX1.playing()) {
                pressureDamageSFX1.stop();
            }
        }

        const hp = gameManager.getGameState("hullPoints");
        if (hp <= 0) {
            this.gameOverTimestamp = performance.now();
            pressureDamageSFX1.stop();
            pressureDamageSFX2.stop();
            youDied.play();
            setTimeout(() => this.forceUpdate(), 1000);
        }

        // respawn collectables if offscreen
        for (const collectable of collectablesList) {
            if (!collectable.entityId) {
                continue;
            }
            if (this.getEntity(collectable.entityId)) {
                continue;
            }
            if (collectable.resource.startsWith("cassette")) {
                continue;
            }
            if (isPointOnScreen(collectable)) {
                continue;
            }
            collectable.entityId = this.addEntity(new Collectable(collectable)).id;
        }

        if (isWithinBounds(gameManager.player, bossBoundsTopLeft, bossBoundsBottomRight)) {
            this.isAnimatingDatingSim = true;
            const startCamera = { ...camera };
            const cameraDiff = subtract(startCamera, bossBoundsCameraPosition);
            const cameraDirection = normalizeVector(cameraDiff);
            const distance = length(cameraDiff);
            const playerStart = { x: gameManager.player.x, y: gameManager.player.y, angle: gameManager.player.angle };
            const angleDiff = angleDistance(playerStart.angle, bossBoundsPlayerAngle);
            const leftUI = document.querySelector(".LeftUI") as HTMLDivElement;
            const rightUI = document.querySelector(".RightUI") as HTMLDivElement;
            const canvas = document.querySelector("canvas") as HTMLCanvasElement;
            (document.querySelector(".AppCtn") as HTMLElement).style.overflow = "hidden";
            animate({
                apply(t) {
                    camera.scale = lerp(t, startCamera.scale, bossBoundsCameraScale);
                    const lerpedCameraLength = lerp(t, distance, 0);
                    copyMut(camera, add(bossBoundsCameraPosition, scale(cameraDirection, lerpedCameraLength)));

                    gameManager.player.angle = playerStart.angle + lerp(t, 0, angleDiff);
                    gameManager.player.x = lerp(t, playerStart.x, bossBoundsPlayerPos.x);
                    gameManager.player.y = lerp(t, playerStart.y, bossBoundsPlayerPos.y);
                    leftUI.style.transform = `scaleX(${1 - t})`;
                    rightUI.style.transform = `scaleX(${1 - t})`;
                    canvas.width = lerp(t, 1080, 1920);
                    canvas.height = lerp(t, 1920, 1080);
                },
                duration: 1800,
            }).then(() => {
                setTimeout(() => {
                    this.isAnimatingDatingSim = false;
                    this.isDatingSim = true;
                    this.forceUpdate();
                }, 2000);
            });
            this.forceUpdate();
        }
    }

    private hurtFromDepth() {
        const hp = gameManager.getGameState("hullPoints");
        gameManager.setGameState("hullPoints", hp - 12);
        const screenshakeFrames = new KeyframeEffect(screenshakeKeyframes);
        screenshakeFrames.target = document.querySelector(".Center");
        const screenshakeAnim = new Animation(screenshakeFrames);
        screenshakeAnim.play();
    }

    depthDamageTimer: number | undefined;

    public addDebugVector(start: Vector, end: Vector, color = "red") {
        this.addEntity(new DebugVector(start, end, color));
    }

    public click() {
        if (localStorage.getItem("editor")) {
            const line = `addCollectable("iron", { x: ${Math.floor(mousePosition.x)}, y: ${Math.floor(
                mousePosition.y
            )} });`;
            console.log(line);
            navigator.clipboard.writeText(line);
        }
        if (this.player.grabber) {
            this.player.retractGrabber();
        } else {
            this.player.emitGrabber();
        }
    }
}

export const gameManager = new GameManager();

// @ts-ignore
window.DEV_gameManager = gameManager;
