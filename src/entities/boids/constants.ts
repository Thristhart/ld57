import { SpawnSpeedPattern, SpawnSpotPattern } from "./types";

export const exampleFlock = {
    x: 2000,
    y: 200,
    height: 100,
    width: 100,
    forces: {
        alignment: {
            distance: 0.01,
            strength: 0.3,
        },
        avoidance: {
            distance: 0.0001,
            strength: 0.5,
        },
        cohesion: {
            distance: 0.02,
            strength: 0.15,
        },
        predatorAvoidance: {
            distance: 0.5,
            strength: 1,
        },
        boundaryAvoidance: {
            distance: 0.01,
            strength: 0.1,
        },
        roosting: {
            distance: 0.2,
            strength: 0.1,
        },
    },
    characteristics: {
        roost: {
            position: { x: 0.5, y: 0.5 },
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
            speedRatio: 0.004,
        },
    },
};
