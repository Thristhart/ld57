import { upgrades } from "./startstate";

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

    upgrades: { [type: string]: Array<(typeof upgrades)[keyof typeof upgrades][number]> };
    messageList: string[];
}

export interface Upgrade {
    upgradeValue: number | string;
    materials: { [matType: string]: number };
    isVisible: boolean;
    description: string;
}

export interface CollectableConfig {
    resource: string;
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;
}
