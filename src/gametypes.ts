import { CollectableName, upgrades } from "./startstate";

export interface GameUpgradeLevels {
    depthUpgradeLevel: number;
    inventoryUpgradeLevel: number;
    fuelUpgradeLevel: number;
    hullUpgradeLevel: number;
    // grabberUpgradeLevel: number;
    // lightUpgradeLevel: number;
    // speedUpgradeLevel: number;
}

export interface GameState extends GameUpgradeLevels {
    fuelPoints: number;
    hullPoints: number;
    lightOn: boolean;
    currentDepth: number;
    inventory: string[];
    seenMaterials: Set<CollectableName>;

    upgrades: { [type: string]: Array<(typeof upgrades)[keyof typeof upgrades][number]> };
    messageList: string[];
    warning: string;
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

export interface CollectableMetadata {
    name: string;
    imageUrl: string;
    description: string;
    fuelPoints: number;
    hullPoints: number;
    storyMessage: string;
}
