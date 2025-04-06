import { baseFlock } from "./entities/boids/constants";
import { FlockSetting } from "./entities/boids/types";
import { CollectableConfig, CollectableMetadata, GameState, Upgrade } from "./gametypes";
import { redRectImage } from "./images";

export const upgrades = {
    depthUpgradeLevel: [
        { description: "Max Depth 100m", upgradeValue: 100, materials: {} },
        { description: "Max Depth 200m", upgradeValue: 200, materials: { cuteFish: 1 } },
        {
            description: "Max Depth 300m",
            upgradeValue: 300,
            materials: { cuteFish: 1, iron: 1 },
        },
        {
            description: "Max Depth 300m",
            upgradeValue: 400,
            materials: { iron: 2, cuteFish: 2 },
        },
    ],
    inventoryUpgradeLevel: [
        { description: "3 slots", upgradeValue: 3, materials: {} },
        { description: "5 slots", upgradeValue: 5, materials: { sand: 1 } },
        {
            description: "10 slots",
            upgradeValue: 10,
            materials: { copper: 1, sand: 1 },
        },
    ],
    fuelUpgradeLevel: [{ description: "", upgradeValue: 100, materials: {} }],
    hullUpgradeLevel: [{ description: "", upgradeValue: 100, materials: {} }],
} as const satisfies { [type: string]: Upgrade[] };

export const defaultGameState: GameState = {
    depthUpgradeLevel: 0,
    inventoryUpgradeLevel: 1,
    fuelUpgradeLevel: 0,
    hullUpgradeLevel: 0,

    // grabberUpgradeLevel: 0,
    // lightUpgradeLevel: 0,
    // speedUpgradeLevel: 0,
    fuelPoints: 100,
    hullPoints: 100,
    lightOn: true,
    currentDepth: 0,
    inventory: ["iron", "iron"],
    upgrades: upgrades,
    seenMaterials: new Set(),
    messageList: [
        {
            text: "A scientist who had been a close and trusted colleague of yours for many years went on a solo deep sea exploration in a state of the art Neo Human Interface Submarine one year ago. Back in college, where you were roommates, the two of you dreamed about creating such a vessel. Building another one by yourself was a difficult endeavor. It was much easier to work alongside them. You have your own Neo Human Interface Submarine now. It's time to rescue your partner.",
        },
        {
            text: "The Neo Human Interface Submarine is a state of the art vessel capable of adapting to hostile environments by subsuming local resources for the purpose of self modification. It's also finally done! I couldn't resist taking it for a quick little dive. I'm sure my colleague will understand. Now let's get to cataloging what sorts of materials are available to me down here.",
        },
    ],
    warning: "",
};

export const collectablesList: CollectableConfig[] = [
    {
        resource: "copper",
        x: 2000,
        y: 200,
        height: 20,
        width: 20,
        image: redRectImage,
    },
];

function makeFlock(flockType: CollectableName, position: Vector): FlockSetting {
    return {
        ...baseFlock,
        flockType,
        characteristics: {
            ...baseFlock.characteristics,
            roost: {
                ...baseFlock.characteristics.roost,
                position,
            },
        },
    };
}

export const flockList: FlockSetting[] = [makeFlock("cuteFish", { x: 2000, y: 600 })];

import ironImageUrl from "#assets/ocean_objects/minerals/iron_ore.png";
import cuteFishImageUrl from "#assets/ocean_objects/fish/cute_fish_1.png";
import { Vector } from "./vector";

export const collectablesMetadata = {
    iron: {
        name: "iron",
        imageUrl: ironImageUrl,
        description: "a chunk of iron ore",
        fuelPoints: 0,
        hullPoints: 20,
        storyMessage: "Discovered iron, can fix the hull or be used for upgrades",
    },
    cuteFish: {
        name: "cuteFish",
        imageUrl: cuteFishImageUrl,
        description: "almost too cute to subsume",
        fuelPoints: 20,
        hullPoints: 0,
        storyMessage: "Discovered a cute fish, fish are fuel not food",
    },
} as const satisfies { [name: string]: CollectableMetadata };

export type CollectableName = keyof typeof collectablesMetadata;
