import { cuteFish1Image } from "#src/images.ts";
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
