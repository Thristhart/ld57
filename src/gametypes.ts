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
