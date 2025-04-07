import { cuteFish1Image, creepyFish3Image, creepyFish4Image } from "#src/images.ts";
import { FlockSetting, SpawnSpeedPattern, SpawnSpotPattern } from "./types";

export const baseFlock = {
    image: cuteFish1Image,
    flockType: "cuteFish",
    forces: {
        alignment: {
            distance: 300,
            strength: 20,
        },
        avoidance: {
            distance: 250,
            strength: 2,
        },
        cohesion: {
            distance: 300,
            strength: 4,
        },
        predatorAvoidance: {
            distance: 500,
            strength: 2,
        },
        boundaryAvoidance: {
            distance: 30,
            strength: 100,
        },
        roosting: {
            distance: 100,
            strength: 0.005,
        },
    },
    characteristics: {
        roost: {
            position: { x: 2000, y: 300 },
        },
        flockingBoids: {
            spawnPattern: {
                spotPattern: SpawnSpotPattern.NEAR,
                spotVariance: 0.1,
                speedPattern: SpawnSpeedPattern.RANDOM,
                speedRotation: 45,
                maxShrinkPerTick: 5,
                maxGrowthPerTick: Infinity,
            },
            count: 16,
            speedRatio: 0.25,
        },
    },
} as const as FlockSetting;

export const cuteFishFlock = {
    image: cuteFish1Image,
    flockType: "cuteFish",
    forces: {
        alignment: {
            distance: 300,
            strength: 20,
        },
        avoidance: {
            distance: 250,
            strength: 2,
        },
        cohesion: {
            distance: 300,
            strength: 4,
        },
        predatorAvoidance: {
            distance: 500,
            strength: 2,
        },
        boundaryAvoidance: {
            distance: 30,
            strength: 100,
        },
        roosting: {
            distance: 100,
            strength: 0.005,
        },
    },
    characteristics: {
        roost: {
            position: { x: 2000, y: 300 },
        },
        flockingBoids: {
            spawnPattern: {
                spotPattern: SpawnSpotPattern.NEAR,
                spotVariance: 0.1,
                speedPattern: SpawnSpeedPattern.RANDOM,
                speedRotation: 45,
                maxShrinkPerTick: 5,
                maxGrowthPerTick: Infinity,
            },
            count: 5,
            speedRatio: 0.2,
        },
    },
} as const as FlockSetting;

export const cuteFish2Flock = {
    image: cuteFish1Image, // Change this
    flockType: "cuteFish2",
    forces: {
        alignment: {
            distance: 300,
            strength: 20,
        },
        avoidance: {
            distance: 400,
            strength: 2,
        },
        cohesion: {
            distance: 300,
            strength: 4,
        },
        predatorAvoidance: {
            distance: 700,
            strength: 4,
        },
        boundaryAvoidance: {
            distance: 30,
            strength: 100,
        },
        roosting: {
            distance: 100,
            strength: 0.005,
        },
    },
    characteristics: {
        roost: {
            position: { x: 2000, y: 300 },
        },
        flockingBoids: {
            spawnPattern: {
                spotPattern: SpawnSpotPattern.NEAR,
                spotVariance: 0.1,
                speedPattern: SpawnSpeedPattern.RANDOM,
                speedRotation: 45,
                maxShrinkPerTick: 5,
                maxGrowthPerTick: Infinity,
            },
            count: 5,
            speedRatio: 0.4,
        },
    },
} as const as FlockSetting;

export const creepyFish3Flock = {
    image: creepyFish3Image, // Change this
    flockType: "creepyFish3",
    forces: {
        alignment: {
            distance: 300,
            strength: 20,
        },
        avoidance: {
            distance: 400,
            strength: 2,
        },
        cohesion: {
            distance: 300,
            strength: 4,
        },
        predatorAvoidance: {
            distance: 1000,
            strength: 3,
        },
        boundaryAvoidance: {
            distance: 30,
            strength: 100,
        },
        roosting: {
            distance: 100,
            strength: 0.005,
        },
    },
    characteristics: {
        roost: {
            position: { x: 2000, y: 300 },
        },
        flockingBoids: {
            spawnPattern: {
                spotPattern: SpawnSpotPattern.NEAR,
                spotVariance: 0.1,
                speedPattern: SpawnSpeedPattern.RANDOM,
                speedRotation: 45,
                maxShrinkPerTick: 5,
                maxGrowthPerTick: Infinity,
            },
            count: 3,
            speedRatio: 0.5,
        },
    },
} as const as FlockSetting;

export const creepyFish4Flock = {
    image: creepyFish4Image, // Change this
    flockType: "creepyFish4",
    forces: {
        alignment: {
            distance: 300,
            strength: 20,
        },
        avoidance: {
            distance: 400,
            strength: 2,
        },
        cohesion: {
            distance: 300,
            strength: 4,
        },
        predatorAvoidance: {
            distance: 1200,
            strength: 2,
        },
        boundaryAvoidance: {
            distance: 30,
            strength: 100,
        },
        roosting: {
            distance: 100,
            strength: 0.005,
        },
    },
    characteristics: {
        roost: {
            position: { x: 2000, y: 300 },
        },
        flockingBoids: {
            spawnPattern: {
                spotPattern: SpawnSpotPattern.NEAR,
                spotVariance: 0.1,
                speedPattern: SpawnSpeedPattern.RANDOM,
                speedRotation: 45,
                maxShrinkPerTick: 5,
                maxGrowthPerTick: Infinity,
            },
            count: 2,
            speedRatio: 0.7,
        },
    },
} as const as FlockSetting;
