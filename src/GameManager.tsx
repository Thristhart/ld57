import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Entity } from "./entities/entity";
import { Player } from "./entities/player";
import { GameState, GameUpgradeLevels } from "./gametypes";
import { collectablesList, defaultGameState, flockList } from "./startstate";
import { Collectable } from "./entities/collectable";
import Flock from "./entities/boids/flock";
import { Vector } from "./vector";
import { DebugVector } from "./entities/debugvector";

let nextEntId = 0;

export class GameManager {
    private rerenderUI: () => void = () => {};
    private gameState: GameState = defaultGameState;
    public maxPixelHeight: number = 0;
    public maxDepth = 500;
    private mapEntities = new Map<number, Entity>();
    public messageList: string[] = [
        "A scientist who had been a close and trusted colleague of yours for many years went on a solo deep sea exploration in a state of the art Neo Human Interface Submarine one year ago. Back in college, where you were roommates, the two of you dreamed about creating such a vessel. Building another one by yourself was a difficult endeavor. It was much easier to work alongside them. You have your own Neo Human Interface Submarine now. It's time to rescue your partner.",
        "The Neo Human Interface Submarine is a state of the art vessel capable of adapting to hostile environments by subsuming local resources for the purpose of self modification. It's also finally done! I couldn't resist taking it for a quick little dive. I'm sure my colleague will understand. Now let's get to cataloging what sorts of materials are available to me down here.",
    ];

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

    public setMaxPixelHeight(height: number) {
        this.maxPixelHeight = height;
    }

    public addMessage(message: string) {
        this.messageList.push(message);
        this.forceUpdate();
    }

    public setGameState<K extends keyof GameState>(property: K, value: GameState[K]): void {
        this.gameState[property] = value;
        // this.rerenderUI();
    }

    public getGameState<K extends keyof GameState>(property: K): GameState[K] {
        return this.gameState[property];
    }

    public getUpgradedMaxValue<K extends keyof GameUpgradeLevels>(property: K): number | string {
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

        const playerY = this.player.y;
        const depth = Math.floor((playerY * this.maxDepth) / this.maxPixelHeight);
        this.setGameState("currentDepth", depth);
    }

    public addDebugVector(start: Vector, end: Vector, color = "red") {
        this.addEntity(new DebugVector(start, end, color));
    }

    public click() {}
}

export const gameManager = new GameManager();

// @ts-ignore
window.DEV_gameManager = gameManager;
