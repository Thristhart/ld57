import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Entity } from "./entities/entity";
import { Player } from "./entities/player";
import { GameState, GameUpgradeLevels } from "./gametypes";
import { collectablesList, defaultGameState } from "./startstate";
import { Collectable } from "./entities/collectable";

let nextEntId = 0;

export class GameManager {
    private rerenderUI: () => void = () => {};
    private gameState: GameState = defaultGameState;
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
        collectablesList.forEach((collectable) => {
            this.addEntity(new Collectable(collectable));
        });
    }

    public setGameState<K extends keyof GameState>(property: K, value: GameState[K]): void {
        this.gameState[property] = value;
        this.rerenderUI();
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
    }

    public click() {}
}

export const gameManager = new GameManager();

// @ts-ignore
window.DEV_gameManager = gameManager;
