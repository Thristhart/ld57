import { CollectableName } from "#src/startstate.ts";
import Boid from "./boid";
import FlockingBoid from "./flockingboid";
import Predator from "./predator";

export interface BoidVector {
    x: number;
    y: number;
}

export enum SpawnSpotPattern {
    RANDOM = "RANDOM",
    CENTER = "CENTER",
    CIRCLE = "CIRCLE",
    EDGE = "EDGE",
    SIDE = "SIDE",
    NEAR = "NEAR",
}

export enum SpawnSpeedPattern {
    RANDOM = "RANDOM",
    IDLE = "IDLE",
    TO_CENTER = "TO_CENTER",
    FROM_CENTER = "FROM_CENTER",
    STRAIGHT = "STRAIGHT",
}

export const DEFAULT_CIRCLE_RADIUS = 0.4;
export interface SpawnConfig {
    spotPattern?: SpawnSpotPattern;
    speedPattern?: SpawnSpeedPattern;
    spotVariance?: number;
    circleRadius?: number;
    speedRotation?: number;
    maxShrinkPerTick?: number;
    maxGrowthPerTick?: number;
}

export interface Factor {
    force: BoidVector;
    strength: number;
}

export interface FlockingForce {
    avoidance: BoidVector;
    alignment: BoidVector;
    cohesion: BoidVector;
}

export interface FlockInstances {
    flockingBoids: FlockingBoid[];
}

export interface FlockSetting {
    flockType: CollectableName;
    forces: {
        alignment: {
            distance: number;
            strength: number;
        };
        avoidance: {
            distance: number;
            strength: number;
        };
        cohesion: {
            distance: number;
            strength: number;
        };
        predatorAvoidance: {
            distance: number;
            strength: number;
        };
        boundaryAvoidance: {
            distance: number;
            strength: number;
        };
        roosting: {
            distance: number;
            strength: number;
        };
    };
    characteristics: {
        roost: {
            position: BoidVector;
        };
        flockingBoids: {
            spawnPattern: {
                spotPattern: SpawnSpotPattern;
                spotVariance: number;
                speedPattern: SpawnSpeedPattern;
                speedRotation: number;
                maxShrinkPerTick: number;
                maxGrowthPerTick: number;
            };
            count: number;
            speedRatio: number;
        };
    };
}
