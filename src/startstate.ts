import { exampleFlock } from "./entities/boids/constants";
import { FlockSetting } from "./entities/boids/types";
import { CollectableConfig, GameState, Upgrade } from "./gametypes";
import { redRectImage } from "./images";

export const upgrades: { [type: string]: Upgrade[] } = {
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

export const defaultGameState: GameState = {
    fuelUpgradeLevel: 0,
    hullUpgradeLevel: 0,
    depthUpgradeLevel: 0,
    inventoryUpgradeLevel: 0,
    grabberUpgradeLevel: 0,
    lightUpgradeLevel: 0,
    speedUpgradeLevel: 0,
    fuelPoints: 100,
    hullPoints: 100,
    lightOn: true,
    currentDepth: 0,
    inventory: [],
    upgrades: upgrades,
    messageList: [
        "A scientist who had been a close and trusted colleague of yours for many years went on a solo deep sea exploration in a state of the art Neo Human Interface Submarine one year ago. Back in college, where you were roommates, the two of you dreamed about creating such a vessel. Building another one by yourself was a difficult endeavor. It was much easier to work alongside them. You have your own Neo Human Interface Submarine now. It's time to rescue your partner.",
        "The Neo Human Interface Submarine is a state of the art vessel capable of adapting to hostile environments by subsuming local resources for the purpose of self modification. It's also finally done! I couldn't resist taking it for a quick little dive. I'm sure my colleague will understand. Now let's get to cataloging what sorts of materials are available to me down here.",
    ],
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

export const flockList: FlockSetting[] = [exampleFlock];
