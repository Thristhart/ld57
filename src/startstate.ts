import { baseFlock } from "./entities/boids/constants";
import { FlockSetting } from "./entities/boids/types";
import { CollectableConfig, CollectableMetadata, GameState, Upgrade } from "./gametypes";
import {
    creepyFish3Image,
    creepyFish4Image,
    cuteFish1Image,
    fancyOre2Image,
    fancyOreImage,
    ironOreImage,
    redRectImage,
} from "./images";
import { Vector } from "./vector";

export const introParagraph =
    "You have been assigned by the Organization for Deep Exploration and Protection of Terrestrial and Hydrospatial Systems to investigate the mysterious disappearance of one of their lead ecologists. Equipped with the state-of-the-art Submersible for Underwater Mapping and Exploration—identical to the one used by the missing researcher—you’ll venture into uncharted waters. This advanced vessel is capable of adapting to hostile environments by integrating local resources for self-repair and modification. Now, it’s up to you: delve into the unknown, uncover the truth behind the disappearance, and, if possible, bring the researcher back to safety. The clock is ticking—are you ready to face the depths?";

export const upgrades = {
    depthUpgradeLevel: [
        { description: "Max Depth 1000m", upgradeValue: 1000, materials: {} },
        { description: "Max Depth 2000m", upgradeValue: 2000, materials: { cuteFish: 1 } },
        {
            description: "Max Depth 3000m",
            upgradeValue: 3000,
            materials: { cuteFish: 1, iron: 1 },
        },
        {
            description: "Max Depth 5000m",
            upgradeValue: 4000,
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
    fuelUpgradeLevel: [
        { description: "Max Fuel 100 units", upgradeValue: 100, materials: {} },
        { description: "Max Fuel 200 units", upgradeValue: 200, materials: {} },
        { description: "Max Fuel 300 units", upgradeValue: 300, materials: {} },
    ],
    hullUpgradeLevel: [
        { description: "Max Defense 100 units", upgradeValue: 100, materials: {} },
        { description: "Max Defense 200 units", upgradeValue: 200, materials: {} },
        { description: "Max Defense 300 units", upgradeValue: 300, materials: {} },
    ],
} as const satisfies { [type: string]: Upgrade[] };

export const defaultGameState: GameState = {
    depthUpgradeLevel: 0,
    inventoryUpgradeLevel: 0,
    fuelUpgradeLevel: 0,
    hullUpgradeLevel: 0,

    // grabberUpgradeLevel: 0,
    // lightUpgradeLevel: 0,
    // speedUpgradeLevel: 0,
    fuelPoints: 100,
    hullPoints: 100,
    lightOn: true,
    currentDepth: 0,
    inventory: [],
    upgrades: upgrades,
    seenMaterials: new Set(),
    messageList: [
        {
            text: introParagraph,
        },
    ],
    alert: null,
};

function makeFlock(flockType: CollectableName, image: HTMLImageElement, position: Vector): FlockSetting {
    return {
        ...baseFlock,
        image,
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

export const flockList: FlockSetting[] = [
    makeFlock("cuteFish", cuteFish1Image, { x: 2000, y: 600 }),
    makeFlock("creepyFish3", creepyFish3Image, { x: 2300, y: 600 }),
    makeFlock("creepyFish4", creepyFish4Image, { x: 2600, y: 600 }),
];

import ironImageUrl from "#assets/ocean_objects/minerals/iron_ore.png";
import cobaltOreUrl from "#assets/ocean_objects/minerals/fancy_ore2.png";
import crystalOreUrl from "#assets/ocean_objects/minerals/fancy_ore.png";

import cuteFishImageUrl from "#assets/ocean_objects/fish/cute_fish_1.png";
import creepyFish3Url from "#assets/ocean_objects/fish/creepy_fish_3.png";
import creepyFish4Url from "#assets/ocean_objects/fish/creepy_fish_4.png";

export const collectablesList: CollectableConfig[] = [
    {
        resource: "iron",
        x: 2000,
        y: 400,
        height: 50,
        width: 50,
        image: ironOreImage,
    },
    {
        resource: "cobalt",
        x: 2100,
        y: 400,
        height: 50,
        width: 50,
        image: fancyOre2Image,
    },
    {
        resource: "crystal",
        x: 2200,
        y: 400,
        height: 50,
        width: 50,
        image: fancyOreImage,
    },
];

export const collectablesMetadata = {
    iron: {
        name: "iron",
        imageUrl: ironImageUrl,
        description: "a chunk of iron ore",
        fuelPoints: 0,
        hullPoints: 25,
        storyMessage: "Discovered iron, can fix a bit of damage to the hull or be used for upgrades",
    },
    cobalt: {
        name: "cobalt",
        imageUrl: cobaltOreUrl,
        description: "a hefty lump of cobalt ore",
        fuelPoints: 0,
        hullPoints: 50,
        storyMessage: "Discovered cobalt, can fix moderate damage to the hull or be used for upgrades",
    },
    crystal: {
        name: "crystal",
        imageUrl: crystalOreUrl,
        description: "a glowing crystal of indeterminate nature",
        fuelPoints: 0,
        hullPoints: 100,
        storyMessage: "Discovered a mysterious crystal, the machine is eager to devour it",
    },
    cuteFish: {
        name: "cuteFish",
        imageUrl: cuteFishImageUrl,
        description: "almost too cute to subsume",
        fuelPoints: 20,
        hullPoints: 0,
        storyMessage: "Discovered a cute fish, fish are fuel not food",
    },
    creepyFish3: {
        name: "creepyFish3",
        imageUrl: creepyFish3Url,
        description: "this one is kind of weird",
        fuelPoints: 20,
        hullPoints: 0,
        storyMessage: "Discovered a creepyfish3, what do we even do with this",
    },
    creepyFish4: {
        name: "creepyFish4",
        imageUrl: creepyFish4Url,
        description: "this one is even weirder",
        fuelPoints: 20,
        hullPoints: 0,
        storyMessage: "Discovered a creepyfish4, this is even weirder",
    },
} as const satisfies { [name: string]: CollectableMetadata };

export type CollectableName = keyof typeof collectablesMetadata;
