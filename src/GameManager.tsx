import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

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
    maxFuelPoints: 0,
    fuelPoints: 0,
    hullPoints: 0,
    maxHullPoints: 0,
    lightOn: false,
    currentDepth: 0,
    maxDepth: 0,
    inventory: [],
    maxInventorySlots: 3,
    upgradesAvailable: [],
    upgradesTaken: [],
};

export class GameManager {
    private rerenderUI: () => void = () => {};
    private gameState: GameState = defaultGameState;

    constructor() {
        const root = ReactDOM.createRoot(document.getElementById("root")!);
        const rootRender = () =>
            root.render(
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            );
        this.rerenderUI = rootRender;
    }

    public setGameState<K extends keyof GameState>(property: K, value: GameState[K]): void {
        this.gameState[property] = value;
        this.rerenderUI();
    }

    public getGameState<K extends keyof GameState>(property: K): GameState[K] {
        return this.gameState[property];
    }

    public forceUpdate = () => this.rerenderUI();
}

export const gameManager = new GameManager();
