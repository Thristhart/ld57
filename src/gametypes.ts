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

export type UpgradeType = keyof GameUpgradeLevels;
export interface Message {
    text: string;
    image?: string;
}

export interface GameState extends GameUpgradeLevels {
    fuelPoints: number;
    hullPoints: number;
    lightOn: boolean;
    currentDepth: number;
    inventory: string[];
    seenMaterials: Set<CollectableName>;

    upgrades: { [type: string]: Array<(typeof upgrades)[keyof typeof upgrades][number]> };
    messageList: Message[];
    alert: { text: string; type: "error" | "success" } | null;
}

export interface Upgrade {
    upgradeValue: number | string;
    materials: { [matType: string]: number };
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

export interface Checkpoint {
    gameState: GameState;
    playerX: number;
    playerY: number;
}
