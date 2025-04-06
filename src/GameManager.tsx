import React, { useSyncExternalStore } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Entity } from "./entities/entity";
import { Player } from "./entities/player";
import { GameState, GameUpgradeLevels } from "./gametypes";
import { collectablesList, defaultGameState, flockList, upgrades } from "./startstate";
import { Collectable } from "./entities/collectable";
import Flock from "./entities/boids/flock";
import { Vector } from "./vector";
import { DebugVector } from "./entities/debugvector";
import { length } from "#src/vector.ts";
import Boid from "./entities/boids/boid";
import FlockingBoid from "./entities/boids/flockingboid";
import { bgmBiome1, bgmBiome2, currentBgm, switchBGM } from "./audio";

const fuelScale = 10;
let nextEntId = 0;

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

export class GameManager {
    private rerenderUI: () => void = () => {};
    private gameState: GameState = defaultGameState;
    public maxPixelHeight: number = 0;
    public maxDepth = 400;
    private mapEntities = new Map<number, Entity>();
    public player: Player;

    public loading = true;

    constructor() {
        const root = ReactDOM.createRoot(document.getElementById("root")!);
        const rootRender = () =>
            root.render(
                <React.StrictMode>
                    <App loading={this.loading} />
                </React.StrictMode>
            );
        this.rerenderUI = rootRender;

        this.player = this.addEntity(new Player(2000, 200));
        // collectablesList.forEach((collectable) => {
        //     this.addEntity(new Collectable(collectable));
        // });
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

    public setMaxPixelHeight(height: number) {
        this.maxPixelHeight = height;
    }
    public getAllGameState() {
        return this.gameState;
    }

    public setGameState<K extends keyof GameState>(property: K, value: GameState[K]): void {
        this.gameState[property] = value;
        this.stateChangeSubscriptions.get(property)?.forEach((callback) => callback());
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

    public tick(dt: number) {
        for (const ent of this.getAllEntities()) {
            ent.tick(dt);
        }

        // set the player depth
        const playerY = this.player.y;
        const depth = Math.floor((playerY * this.maxDepth) / this.maxPixelHeight);
        this.setGameState("currentDepth", depth);

        // set the hull damage
        if (this.player.collisions.length > 0) {
            const hullPoints = this.gameState.hullPoints;
            const damage = length(this.player.velocity);
            const newHullPoints = hullPoints - Math.floor(damage);
            this.setGameState("hullPoints", newHullPoints);
        }

        // set fuel spent
        if (this.player.acceleration) {
            const fuel = this.gameState.fuelPoints;
            const fuelExpended = length(this.player.acceleration);
            const fuelScaled = Math.max(fuel - fuelExpended * fuelScale, 0);
            this.setGameState("fuelPoints", fuelScaled);
        }

        // choose correct bgm for depth
        // beware: arbitrary numbers, change these to match actual biome differences
        if (depth < 60) {
            switchBGM(bgmBiome1);
        } else if (depth < 200) {
            switchBGM(bgmBiome2);
        }

        // TODO: check for game over conditions
        // max depth exceeded
        // no more hull points
        // no more fuel
    }

    public addDebugVector(start: Vector, end: Vector, color = "red") {
        this.addEntity(new DebugVector(start, end, color));
    }

    public click() {
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
