import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Entity } from "./entities/entity";
import { Player } from "./entities/player";

export interface GameState {
    maxFuelPoints: number;
    fuelPoints: number;
    hullPoints: number;
    maxHullPoints: number;
    lightOn: boolean;
    currentDepth: number;
    maxDepth: number;
    inventory: string[];
    maxInventorySlots: number;
    upgradesAvailable: string[];
    upgradesTaken: string[];
}

const defaultGameState: GameState = {
    maxFuelPoints: 100,
    fuelPoints: 100,
    hullPoints: 100,
    maxHullPoints: 100,
    lightOn: false,
    currentDepth: 0,
    maxDepth: 100,
    inventory: [],
    maxInventorySlots: 3,
    upgradesAvailable: [],
    upgradesTaken: [],
};

let nextEntId = 0;

export class GameManager {
    private rerenderUI: () => void = () => {};
    private gameState: GameState = defaultGameState;
    private mapEntities = new Map<number, Entity>();

    private player: Player;

    constructor() {
        const root = ReactDOM.createRoot(document.getElementById("root")!);
        const rootRender = () =>
            root.render(
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            );
        this.rerenderUI = rootRender;

        this.player = this.addEntity(new Player(200, 200));
    }

    public setGameState<K extends keyof GameState>(property: K, value: GameState[K]): void {
        this.gameState[property] = value;
        this.rerenderUI();
    }

    public getGameState<K extends keyof GameState>(property: K): GameState[K] {
        return this.gameState[property];
    }

    public forceUpdate = () => this.rerenderUI();

    public addEntity(ent: Entity) {
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
}

export const gameManager = new GameManager();
