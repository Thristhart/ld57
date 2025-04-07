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
    cassetteImage,
} from "./images";
import merge from "lodash.merge";

export const introParagraph =
    "A scientist who had been a close and trusted colleague of yours for many years went on a solo deep sea exploration in a state of the art Neo Human Interface Submarine one year ago. Back in college, where you were roommates, the two of you dreamed about creating such a vessel. Building another one by yourself was a difficult endeavor. It was much easier to work alongside them. You have your own Neo Human Interface Submarine now. It's time to rescue your partner.";

export const upgrades = {
    depthUpgradeLevel: [
        { description: "Max Depth 1000m", upgradeValue: 1000, materials: {} },
        { description: "Max Depth 2000m", upgradeValue: 2000, materials: { iron: 3 } },
        {
            description: "Max Depth 3000m",
            upgradeValue: 3000,
            materials: { cobalt: 5 },
        },
        {
            description: "Max Depth ????m",
            upgradeValue: 4000,
            materials: { fleshMote: 4, crystal: 4 },
        },
    ],
    inventoryUpgradeLevel: [
        { description: "3 slots", upgradeValue: 3, materials: {} },
        { description: "5 slots", upgradeValue: 5, materials: { cobalt: 2, iron: 1 } },
        {
            description: "10 slots",
            upgradeValue: 10,
            materials: { cobalt: 3, crystal: 2, fleshMote: 1 },
        },
    ],
    fuelUpgradeLevel: [
        { description: "Max Fuel 100 units", upgradeValue: 100, materials: {} },
        { description: "Max Fuel 200 units", upgradeValue: 200, materials: { iron: 1, cuteFish: 1 } },
        { description: "Max Fuel 300 units", upgradeValue: 300, materials: { cobalt: 2, cuteFish2: 2 } },
    ],
    hullUpgradeLevel: [
        { description: "Max Hull Integrity 100 centiTitans", upgradeValue: 100, materials: {} },
        { description: "Max Hull Integrity 200 centiTitans", upgradeValue: 200, materials: { iron: 2, cobalt: 2 } },
        {
            description: "Max Hull Integrity 300 centiTitans",
            upgradeValue: 300,
            materials: { crystal: 3, fleshMote: 3 },
        },
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
    // cute Fish
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
        image: cuteFish1Image,
        flockType: "cuteFish",
        characteristics: {
            roost: { position: { x: 1292, y: 5185 } },
            flockingBoids: {
                speedRatio: 0.2,
            },
        },
    }),
    makeFlock({
        image: cuteFish1Image,
        flockType: "cuteFish",
        forces: {
            roosting: {
                distance: 300,
            },
        },
        characteristics: {
            roost: { position: { x: 2102, y: 6793 } },
            flockingBoids: {
                speedRatio: 0.2,
            },
        },
    }),
    makeFlock({
        image: cuteFish1Image,
        flockType: "cuteFish",
        forces: {
            roosting: {
                distance: 300,
            },
        },
        characteristics: {
            roost: { position: { x: 2878, y: 12597 } },
            flockingBoids: {
                speedRatio: 0.2,
            },
        },
    }),
    // Cute Fish 2
    makeFlock({
        image: cuteFish1Image,
        flockType: "cuteFish2",
        forces: {
            roosting: {
                distance: 300,
            },
        },
        characteristics: {
            roost: { position: { x: 1869, y: 20850 } },
            flockingBoids: {
                speedRatio: 0.2,
            },
        },
    }),
    makeFlock({
        image: cuteFish1Image,
        flockType: "cuteFish2",
        forces: {
            roosting: {
                distance: 300,
            },
        },
        characteristics: {
            roost: { position: { x: 1709, y: 15105 } },
            flockingBoids: {
                speedRatio: 0.2,
            },
        },
    }),
    makeFlock({
        image: cuteFish1Image,
        flockType: "cuteFish2",
        forces: {
            roosting: {
                distance: 300,
            },
        },
        characteristics: {
            roost: { position: { x: 1670, y: 11142 } },
            flockingBoids: {
                speedRatio: 0.2,
            },
        },
    }),
];

// THEYFLOWER USE THISS!!!!!
// makeFlock({
//     image: cuteFish1Image, //change this
//     flockType: "cuteFish2", // change this
//     forces: {
//         roosting: {
//             distance: 300,
//         },
//     },
//     characteristics: {
//         roost: { position: { x: 1670, y: 11142 } },  // change this
//         flockingBoids: {
//             speedRatio: 0.2,
//         },
//     },
// }),

import ironImageUrl from "#assets/ocean_objects/minerals/iron_ore.png";
import cobaltOreUrl from "#assets/ocean_objects/minerals/cobalt_ore.png";
import crystalOreUrl from "#assets/ocean_objects/minerals/fancy_ore.png";

import cuteFishImageUrl from "#assets/ocean_objects/fish/cute_fish_1.png";
import creepyFish3Url from "#assets/ocean_objects/fish/creepy_fish_3.png";
import creepyFish4Url from "#assets/ocean_objects/fish/creepy_fish_4.png";

import eyeballImageUrl from "#assets/ocean_objects/eldritch/eyeball.png";
import fleshMoteImageUrl from "#assets/ocean_objects/eldritch/flesh_mote.png";
import cassetteUrl from "../assets/ocean_objects/story/cassette_1.png";
import { Vector } from "./vector";

export const collectablesList: CollectableConfig[] = [
    {
        resource: "cassette1",
        x: 1394,
        y: 2743,
        height: 100,
        width: 100,
        image: cassetteImage,
    },
    {
        resource: "cassette2",
        x: 1282,
        y: 3821,
        height: 100,
        width: 100,
        image: cassetteImage,
    },
];
const collectableImages = {
    iron: ironOreImage,
    cobalt: cobaltOreImage,
    crystal: fancyOreImage,
    fleshMote: fleshMoteImage,
    eyeball: eyeBallImage,
} as const;

function addCollectable(
    resource: keyof typeof collectablesMetadata,
    position: Vector,
    options?: Partial<CollectableConfig>
) {
    collectablesList.push({
        resource,
        ...position,
        height: 100,
        width: 100,
        image:
            resource in collectableImages
                ? collectableImages[resource as keyof typeof collectableImages]
                : collectableImages["iron"],
        ...options,
    });
}
//iron
addCollectable("iron", { x: 1427, y: 1807 });
addCollectable("iron", { x: 2866, y: 5594 });
addCollectable("iron", { x: 3065, y: 5572 });
addCollectable("iron", { x: 1061, y: 7056 });
addCollectable("iron", { x: 1133, y: 7157 });
addCollectable("iron", { x: 1199, y: 7224 });
addCollectable("iron", { x: 1327, y: 7264 });
addCollectable("iron", { x: 3157, y: 9043 });
addCollectable("iron", { x: 735, y: 12664 });
addCollectable("iron", { x: 2920, y: 9978 });
addCollectable("iron", { x: 3024, y: 13725 });
addCollectable("iron", { x: 880, y: 15222 });
//cobalt_ore
addCollectable("cobalt", { x: 2929, y: 8895 });
addCollectable("cobalt", { x: 2983, y: 9162 });
addCollectable("cobalt", { x: 760, y: 12434 });
addCollectable("cobalt", { x: 750, y: 12234 });
addCollectable("cobalt", { x: 1024, y: 12506 });
addCollectable("cobalt", { x: 2800, y: 10192 });
addCollectable("cobalt", { x: 3000, y: 10395 });
addCollectable("cobalt", { x: 3100, y: 13289 });
addCollectable("cobalt", { x: 2725, y: 13442 });
addCollectable("cobalt", { x: 3104, y: 13469 });
addCollectable("cobalt", { x: 1000, y: 15423 });
addCollectable("cobalt", { x: 1000, y: 15045 });
addCollectable("cobalt", { x: 2650, y: 17756 });
addCollectable("cobalt", { x: 3069, y: 18087 });
addCollectable("cobalt", { x: 3119, y: 17930 });
addCollectable("cobalt", { x: 3032, y: 17844 });
addCollectable("cobalt", { x: 2827, y: 17925 });
addCollectable("cobalt", { x: 2620, y: 19260 });
addCollectable("cobalt", { x: 2824, y: 20431 });
addCollectable("cobalt", { x: 3062, y: 23061 });
addCollectable("cobalt", { x: 3495, y: 23001 });
addCollectable("cobalt", { x: 2424, y: 23166 });
//crystal in biome3
addCollectable("crystal", { x: 2844, y: 22700 });
addCollectable("crystal", { x: 2126, y: 22950 });
addCollectable("crystal", { x: 2700, y: 21892 });
addCollectable("crystal", { x: 2449, y: 22102 });
addCollectable("crystal", { x: 2050, y: 21800 });
addCollectable("crystal", { x: 2400, y: 16924 });
addCollectable("crystal", { x: 2521, y: 17156 });
addCollectable("crystal", { x: 2396, y: 18088 });
addCollectable("crystal", { x: 2500, y: 18317 });
addCollectable("crystal", { x: 1817, y: 19649 });
addCollectable("crystal", { x: 2512, y: 20286 });
addCollectable("crystal", { x: 1080, y: 21981 });
addCollectable("crystal", { x: 572, y: 22310 });
addCollectable("crystal", { x: 482, y: 23266 });

export const collectablesMetadata = {
    iron: {
        name: "iron",
        imageUrl: ironImageUrl,
        description: "It will be easy to refine such high purity iron ore.",
        fuelPoints: 0,
        hullPoints: 25,
        storyMessage: "Discovered iron, it can patch small dents in hull or be used for upgrades.",
    },
    cobalt: {
        name: "cobalt",
        imageUrl: cobaltOreUrl,
        description: "This lump of cobalt ore has some heft to it.",
        fuelPoints: 0,
        hullPoints: 50,
        storyMessage: "Discovered cobalt, it can repair moderate damage to the hull or be used for upgrades.",
    },
    crystal: {
        name: "crystal",
        imageUrl: crystalOreUrl,
        description: "It contains undiscovered isotopes.",
        fuelPoints: 0,
        hullPoints: 100,
        storyMessage: "Discovered a mysterious glowing crystal, it contains previously undiscovered isotopes.",
    },
    cuteFish: {
        name: "cuteFish",
        imageUrl: cuteFishImageUrl,
        description: "Almost too cute to subsume!",
        fuelPoints: 20,
        hullPoints: 0,
        storyMessage: "Discovered a cute fish, fish are fuel not food",
    },
    cuteFish2: {
        name: "cuteFish2",
        imageUrl: cuteFishImageUrl, //REMEMBER TO CHANGE THIS
        description: "REMEMBER TO CHANGE THIS",
        fuelPoints: 40,
        hullPoints: 0,
        storyMessage: "REMEMBER TO CHANGE THIS",
    },
    creepyFish3: {
        name: "creepyFish3",
        imageUrl: creepyFish3Url,
        description: "This fish is strange.",
        fuelPoints: 60,
        hullPoints: 0,
        storyMessage: "Discovered a weird fish, it appears to be an efficient fuel source.",
    },
    creepyFish4: {
        name: "creepyFish4",
        imageUrl: creepyFish4Url,
        description: "What a creepy fish.",
        fuelPoints: 80,
        hullPoints: 0,
        storyMessage:
            "Discovered a very strange fish. Its biomass is dense and should be a more efficient fuel source.",
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
        storyMessage:
            "Discovered a flesh mote. This mysterious ball of meat seems compatible with the strange glowing mineral.",
    },
    cassette1: {
        //1-1
        name: "cassette1",
        imageUrl: cassetteUrl,
        description: "if you see this message it's a bug",
        fuelPoints: 0,
        hullPoints: 0,
        storyMessage:
            "The Neo Human Interface Submarine is a state of the art vessel capable of adapting to hostile environments by subsuming local resources for the purpose of self modification. It's also finally done! I couldn't resist taking it for a quick little dive. I'm sure my colleague will understand. Now let's get to cataloging what sorts of materials are available to me down here.",
    },
    cassette2: {
        //1-2
        name: "cassette2",
        imageUrl: cassetteUrl,
        description: "if you see this message it's a bug",
        fuelPoints: 0,
        hullPoints: 0,
        storyMessage:
            "By subsuming local minerals and wildlife I've managed to improve the Neo Human Interface Submarine's hull while also refilling the fuel reserves with some fish based biofuel. Analysis of upgraded hull integrity signifies a new maximum safe depth. How could I resist going just a little bit deeper? My research partner won't mind as long as I'm back in the morning.",
    },
    cassette3: {
        //2-1
        name: "cassette3",
        imageUrl: cassetteUrl,
        description: "if you see this message it's a bug",
        fuelPoints: 0,
        hullPoints: 0,
        storyMessage:
            "This new technology is amazing! Before today a solo exploration mission would require so much arduous planning, but now such undertakings can happen on a whim. If I go any deeper my colleague might need some explaining about where I've been, but surely they will understand if I bring back data on some big new discovery. Just a little bit further down and surely there will be something new for me to find.",
    },
    cassette4: {
        //2-2
        name: "cassette4",
        imageUrl: cassetteUrl,
        description: "if you see this message it's a bug",
        fuelPoints: 0,
        hullPoints: 0,
        storyMessage:
            "With materials gathered down here I've manage to further reinforce my hull to allow further diving. There is a certain closeness I now feel with the Neo Human Interface Submarine. At times it's easy to forget where my body ends and the vessel begins. After I return to the surface in a couple of days with an new discovery my partner in science will forgive me for venturing down here alone. I'm sure they're worried sick by now.",
    },
    cassette5: {
        //3-1
        name: "cassette5",
        imageUrl: cassetteUrl,
        description: "if you see this message it's a bug",
        fuelPoints: 0,
        hullPoints: 0,
        storyMessage:
            "Some of the materials down here are unlike anything I've seen before. These strange fleshy motes are chemically ideal as a source of biofuel. There's also a mineral containing stable isotopes of elements previously only observed very briefly under laboratory conditions. How could I not stay down here and continue to study these materials? This is important work, my partner will understand when I bring back these findings.",
    },
    cassette6: {
        //3-2
        name: "cassette6",
        imageUrl: cassetteUrl,
        description: "if you see this message it's a bug",
        fuelPoints: 0,
        hullPoints: 0,
        storyMessage:
            "Using the fleshy motes to form an alloy with the new mineral I've just created a material which should theoretically allow my hull to withstand infinite pressure! I must go deeper and discover more. There are secrets below and they call to me. If I do not find something truly amazing to bring back after a week down here how could my colleague forgive me?",
    },
    cassette7: {
        //4-1
        name: "cassette7",
        imageUrl: cassetteUrl,
        description: "if you see this message it's a bug",
        fuelPoints: 0,
        hullPoints: 0,
        storyMessage:
            "This meat alloy is exceeding any reasonable expectations. The hull holds steady under the immense water pressure. If my readings are correct then the previous calculations indicating this meat alloy's capability to withstand infinite pressure are completely true. With such a great opportunity for futher new discoveries it's completely justified for me to stay down here for a couple more weeks.",
    },
    cassette8: {
        //4-2
        name: "cassette8",
        imageUrl: cassetteUrl,
        description: "if you see this message it's a bug",
        fuelPoints: 0,
        hullPoints: 0,
        storyMessage:
            "The control panels of the Neo Human Interface Submarine are morphing slightly as the meat alloy is further integrated into the systems. With each change it makes to itself I'm finding it both easier and more efficient to operate this vessel. When I return to the surface in a couple of months my research partner will be head over heels for the upgrades the Neo Human Interface Submarine has made for itself.",
    },
    cassette9: {
        //4-3
        name: "cassette9",
        imageUrl: cassetteUrl,
        description: "if you see this message it's a bug",
        fuelPoints: 0,
        hullPoints: 0,
        storyMessage:
            "The meat alloy has fused with my flesh. I am the Neo Human Interface Submarine. It is unlikely that I'll ever be able to return to the surface. Much of my eager curiosity is now gone, only to be replaced by guilt and sorrow. It is unlikely I will ever see my beloved lab partner again. Down here is where I belong now. I'm sorry.",
    },
} as const satisfies { [name: string]: CollectableMetadata };

export type CollectableName = keyof typeof collectablesMetadata;
