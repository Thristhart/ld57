import { FlockSetting, SpawnSpeedPattern, SpawnSpotPattern } from "./types";

export const exampleFlock = {
    forces: {
        alignment: {
            distance: 300,
            strength: 30,
        },
        avoidance: {
            distance: 250,
            strength: 9,
        },
        cohesion: {
            distance: 300,
            strength: 5,
        },
        predatorAvoidance: {
            distance: 300,
            strength: 2,
        },
        boundaryAvoidance: {
            distance: 2,
            strength: 10,
        },
        roosting: {
            distance: 20,
            strength: 0.01,
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
            count: 10,
            speedRatio: 1,
        },
    },
} as FlockSetting;
