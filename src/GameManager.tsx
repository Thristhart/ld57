import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Entity } from "./entities/entity";
import { Player } from "./entities/player";

export interface GameUpgradeLevels {
    fuelUpgradeLevel: number;
    hullUpgradeLevel: number;
    depthUpgradeLevel: number;
    inventoryUpgradeLevel: number;
    grabberUpgradeLevel: number;
    lightUpgradeLevel: number;
    speedUpgradeLevel: number;
}

export interface GameState extends GameUpgradeLevels {
    fuelPoints: number;
    hullPoints: number;
    lightOn: boolean;
    currentDepth: number;
    inventory: string[];

    upgrades: { [type: string]: Upgrade[] };
}

export interface Upgrade {
    upgradeValue: number | string;
    materials: { [matType: string]: number };
    isVisible: boolean;
    description: string;
}

const upgrades: { [type: string]: Upgrade[] } = {
    fuelUpgradeLevel: [
        { description: "increases max fuel to 100", upgradeValue: 100, materials: {}, isVisible: true },
        { description: "increases max fuel to 200", upgradeValue: 200, materials: { sand: 1 }, isVisible: true },
        {
            description: "increases max fuel to 300",
            upgradeValue: 300,
            materials: { copper: 1, sand: 1 },
            isVisible: false,
        },
        {
            description: "increases max fuel to 400",
            upgradeValue: 400,
            materials: { copper: 2, sand: 2 },
            isVisible: false,
        },
    ],
    speedUpgradeLevel: [
        { description: "increases max fuel to 400", upgradeValue: 10, materials: {}, isVisible: true },
        { description: "increases max fuel to 400", upgradeValue: 20, materials: { sand: 1 }, isVisible: false },
        {
            description: "increases max fuel to 400",
            upgradeValue: 30,
            materials: { copper: 1, sand: 1 },
            isVisible: false,
        },
        {
            description: "increases max fuel to 400",
            upgradeValue: 40,
            materials: { copper: 2, sand: 2 },
            isVisible: false,
        },
    ],
    hullUpgradeLevel: [
        { description: "increases max fuel to 400", upgradeValue: 100, materials: {}, isVisible: true },
        { description: "increases max fuel to 400", upgradeValue: 200, materials: { sand: 1 }, isVisible: false },
        {
            description: "increases max fuel to 400",
            upgradeValue: 300,
            materials: { copper: 1, sand: 1 },
            isVisible: false,
        },
        {
            description: "increases max fuel to 400",
            upgradeValue: 400,
            materials: { copper: 2, sand: 2 },
            isVisible: false,
        },
    ],
    depthUpgradeLevel: [
        { description: "increases max fuel to 400", upgradeValue: 100, materials: {}, isVisible: true },
        { description: "increases max fuel to 400", upgradeValue: 200, materials: { sand: 1 }, isVisible: false },
        {
            description: "increases max fuel to 400",
            upgradeValue: 300,
            materials: { copper: 1, sand: 1 },
            isVisible: false,
        },
        {
            description: "increases max fuel to 400",
            upgradeValue: 400,
            materials: { copper: 2, sand: 2 },
            isVisible: false,
        },
    ],
    inventoryUpgradeLevel: [
        { description: "increases max fuel to 400", upgradeValue: 3, materials: {}, isVisible: true },
        { description: "increases max fuel to 400", upgradeValue: 5, materials: { sand: 1 }, isVisible: false },
        {
            description: "increases max fuel to 400",
            upgradeValue: 10,
            materials: { copper: 1, sand: 1 },
            isVisible: false,
        },
    ],
    lightUpgradeLevel: [
        { description: "increases max fuel to 400", upgradeValue: "small cone", materials: {}, isVisible: true },
        {
            description: "increases max fuel to 400",
            upgradeValue: "medium cone",
            materials: { sand: 1 },
            isVisible: false,
        },
        {
            description: "increases max fuel to 400",
            upgradeValue: "angler fish",
            materials: { copper: 1, sand: 1 },
            isVisible: false,
        },
    ],
    grabberUpgradeLevel: [
        { description: "increases max fuel to 400", upgradeValue: "short", materials: {}, isVisible: true },
        { description: "increases max fuel to 400", upgradeValue: "long", materials: { sand: 1 }, isVisible: false },
        {
            description: "increases max fuel to 400",
            upgradeValue: "tentacle",
            materials: { copper: 1, sand: 1 },
            isVisible: false,
        },
    ],
};

const defaultGameState: GameState = {
    fuelUpgradeLevel: 0,
    hullUpgradeLevel: 0,
    depthUpgradeLevel: 0,
    inventoryUpgradeLevel: 0,
    grabberUpgradeLevel: 0,
    lightUpgradeLevel: 0,
    speedUpgradeLevel: 0,
    fuelPoints: 100,
    hullPoints: 100,
    lightOn: false,
    currentDepth: 0,
    inventory: [],
    upgrades: upgrades,
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
}

export const gameManager = new GameManager();

// @ts-ignore
window.DEV_gameManager = gameManager;
