import Boid from "./boid";
import {
    BoidVector,
    DEFAULT_CIRCLE_RADIUS,
    SpawnSpeedPattern,
    SpawnSpotPattern,
    SpawnConfig,
    FlockSetting,
} from "./types";
import * as vectorMutable from "./vectorMutable";

export function spawnPosition(spawnConfig: SpawnConfig, boidInstances: Boid[]) {
    const { spotPattern = SpawnSpotPattern.RANDOM, spotVariance } = spawnConfig;

    let spotPosition: BoidVector;
    switch (spotPattern) {
        case SpawnSpotPattern.CENTER:
            spotPosition = {
                x: 0.5,
                y: 0.5,
            };
            break;
        case SpawnSpotPattern.CIRCLE:
            const { circleRadius = DEFAULT_CIRCLE_RADIUS } = spawnConfig;
            const x = 2 * circleRadius * (Math.random() - 0.5);
            const y = Math.sign(Math.random() - 0.5) * Math.sqrt(circleRadius ** 2 - x ** 2);
            spotPosition = {
                x: x + 0.5 + (Math.random() - 0.5) * 0.05,
                y: y + 0.5 + (Math.random() - 0.5) * 0.05,
            };
            break;
        case SpawnSpotPattern.EDGE:
            spotPosition = {
                x: Math.ceil(Math.random() - 0.5),
                y: Math.ceil(Math.random() - 0.5),
            };
            break;
        case SpawnSpotPattern.SIDE:
            spotPosition = sideSpotPosition();
            break;
        case SpawnSpotPattern.NEAR:
            const buddy = boidInstances[Math.floor(Math.random() * boidInstances.length)];
            spotPosition = buddy ? { x: buddy.x, y: buddy.y } : randomSpotPosition();
            break;
        case SpawnSpotPattern.RANDOM:
        default:
            spotPosition = randomSpotPosition();
    }
    if (spotVariance) {
        spotPosition.x += (Math.random() - 0.5) * spotVariance;
        spotPosition.y += (Math.random() - 0.5) * spotVariance;
    }
    spotPosition.x = Math.abs(spotPosition.x % 1);
    spotPosition.y = Math.abs(spotPosition.y % 1);
    return spotPosition;
}

export function spawnSpeed(position: BoidVector, spawnConfig: SpawnConfig) {
    const { speedPattern = SpawnSpeedPattern.RANDOM, speedRotation } = spawnConfig;
    let speed;
    switch (speedPattern) {
        case SpawnSpeedPattern.IDLE:
            return { x: 0, y: 0 };
        case SpawnSpeedPattern.STRAIGHT:
            speed = { x: 1, y: 0 };
            break;
        case SpawnSpeedPattern.TO_CENTER:
            speed = vectorMutable.normalize({
                x: 0.5 - position.x,
                y: 0.5 - position.y,
            });
            break;
        case SpawnSpeedPattern.FROM_CENTER:
            speed = vectorMutable.normalize({
                x: position.x - 0.5,
                y: position.y - 0.5,
            });
            break;
        case SpawnSpeedPattern.RANDOM:
        default:
            speed = vectorMutable.normalize({
                x: Math.random(),
                y: Math.random(),
            });
    }
    vectorMutable.normalize(speed);
    if (speedRotation) {
        vectorMutable.rotate(speed, (speedRotation / 180) * Math.PI);
    }
    return speed;
}

function sideSpotPosition(): BoidVector {
    const rnd = Math.random();
    switch (Math.floor(Math.random() * 4)) {
        case 1:
            return { x: rnd, y: 0 };
        case 2:
            return { x: rnd, y: 1 };
        case 3:
            return { x: 0, y: rnd };
        case 4:
        default:
            return { x: 1, y: rnd };
    }
}

function randomSpotPosition(): BoidVector {
    return {
        x: Math.random(),
        y: Math.random(),
    };
}

export function move(boids: Boid[], settings: FlockSetting, dt: number) {
    const speedRatio = settings.characteristics.flockingBoids.speedRatio * dt;
    for (let i = 0; i < boids.length; i += 1) {
        boids[i].x = boids[i].x + speedRatio * boids[i].speed.x;
        boids[i].y = boids[i].y + speedRatio * boids[i].speed.y;
        boids[i].sway();
    }
}

export function mutableFilter(array: any[], iteratee: (val: any, i: number, array: any[]) => any) {
    let i = 0,
        j = 0;

    while (i < array.length) {
        const val = array[i];
        if (iteratee(val, i, array)) array[j++] = val;
        i++;
    }

    array.length = j;
    return array;
}
