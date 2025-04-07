import { baseFlock } from "./entities/boids/constants";
import { FlockSetting, PartialFlockSetting } from "./entities/boids/types";
import { CollectableConfig, CollectableMetadata, GameState, Upgrade } from "./gametypes";
import {
    creepyFish3Image,
    creepyFish4Image,
    cuteFish1Image,
    cobaltOreImage,
    fancyOreImage,
    ironOreImage,
    fleshMoteImage,
    eyeBallImage,
} from "./images";
import merge from "lodash.merge";

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
            materials: { eyeball: 3, sand: 1 },
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

function makeFlock(partialSettings: PartialFlockSetting): FlockSetting {
    return merge({}, baseFlock, partialSettings);
}

export const flockList: FlockSetting[] = [
    makeFlock({
        image: cuteFish1Image,
        flockType: "cuteFish",
        characteristics: {
            roost: { position: { x: 2000, y: 600 } },
            flockingBoids: {
                speedRatio: 0.2,
            },
        },
    }),
    makeFlock({
        image: creepyFish3Image,
        flockType: "creepyFish3",
        characteristics: {
            roost: { position: { x: 2300, y: 600 } },
            flockingBoids: {
                count: 5,
                speedRatio: 0.5,
            },
        },
    }),
    makeFlock({
        image: creepyFish4Image,
        flockType: "creepyFish4",
        characteristics: {
            roost: { position: { x: 2600, y: 600 } },
            flockingBoids: {
                count: 3,
                speedRatio: 0.7,
            },
        },
    }),
];

import ironImageUrl from "#assets/ocean_objects/minerals/iron_ore.png";
import cobaltOreUrl from "#assets/ocean_objects/minerals/cobalt_ore.png";
import crystalOreUrl from "#assets/ocean_objects/minerals/fancy_ore.png";

import cuteFishImageUrl from "#assets/ocean_objects/fish/cute_fish_1.png";
import creepyFish3Url from "#assets/ocean_objects/fish/creepy_fish_3.png";
import creepyFish4Url from "#assets/ocean_objects/fish/creepy_fish_4.png";

import eyeballImageUrl from "#assets/ocean_objects/eldritch/eyeball1.png";
import fleshMoteImageUrl from "#assets/ocean_objects/eldritch/flesh_mote1.png";

export const collectablesList: CollectableConfig[] = [
    {
        resource: "iron",
        x: 1227,
        y: 1628,
        height: 50,
        width: 50,
        image: ironOreImage,
    },
    {
        resource: "iron",
        x: 1424,
        y: 1846,
        height: 50,
        width: 50,
        image: ironOreImage,
    },
    {
        resource: "iron",
        x: 1259,
        y: 1679,
        height: 50,
        width: 50,
        image: ironOreImage,
    },
    {
        resource: "iron",
        x: 1394,
        y: 2743,
        height: 50,
        width: 50,
        image: ironOreImage,
    },
    // {
    //     resource: "cobalt",
    //     x: 2100,
    //     y: 400,
    //     height: 50,
    //     width: 50,
    //     image: cobaltOreImage,
    // },
    // {
    //     resource: "crystal",
    //     x: 2200,
    //     y: 400,
    //     height: 50,
    //     width: 50,
    //     image: fancyOreImage,
    // },
    // {
    //     resource: "fleshMote",
    //     x: 1900,
    //     y: 400,
    //     height: 50,
    //     width: 50,
    //     image: fleshMoteImage,
    // },
    // {
    //     resource: "eyeball",
    //     x: 1800,
    //     y: 400,
    //     height: 50,
    //     width: 50,
    //     image: eyeBallImage,
    // },
];

export const collectablesMetadata = {
    iron: {
        name: "iron",
        imageUrl: ironImageUrl,
        description: "a chunk of iron ore",
        fuelPoints: 0,
        hullPoints: 25,
        storyMessage: "Discovered iron, it can patch small dents in hull or be used for upgrades.",
    },
    cobalt: {
        name: "cobalt",
        imageUrl: cobaltOreUrl,
        description: "a hefty lump of cobalt ore",
        fuelPoints: 0,
        hullPoints: 50,
        storyMessage: "Discovered cobalt, it can repair moderate damage to the hull or be used for upgrades.",
    },
    crystal: {
        name: "crystal",
        imageUrl: crystalOreUrl,
        description: "a glowing crystal of indeterminate nature",
        fuelPoints: 0,
        hullPoints: 100,
        storyMessage: "Discovered a mysterious glowing crystal, it contains previously undiscovered isotopes.",
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
        fuelPoints: 40,
        hullPoints: 0,
        storyMessage: "Discovered a weird fish, it appears to be an efficient fuel source.",
    },
    creepyFish4: {
        name: "creepyFish4",
        imageUrl: creepyFish4Url,
        description: "this one is even weirder",
        fuelPoints: 60,
        hullPoints: 0,
        storyMessage: "Discovered a very strange fish. Its biomass is dense and should be a more efficient fuel source.",
    },
    eyeball: {
        name: "eyeball",
        imageUrl: eyeballImageUrl,
        description: "its stares",
        fuelPoints: 150,
        hullPoints: 0,
        storyMessage: "Discovered an eyeball. I see. You see. We all see.",
    },
    fleshMote: {
        name: "fleshMote",
        imageUrl: fleshMoteImageUrl,
        description: "the machine hums in excitement",
        fuelPoints: 150,
        hullPoints: 0,
        storyMessage: "Discovered a flesh mote. This mysterious ball of meat seems compatible with the strange glowing mineral.",
    },
} as const satisfies { [name: string]: CollectableMetadata };

export type CollectableName = keyof typeof collectablesMetadata;
