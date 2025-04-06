/* eslint-disable */
import { findClosestPoint, wallLines } from "#src/collision.ts";
import { gameManager } from "#src/GameManager.tsx";
import { normalizeVector, scale, scaleMut, subtract } from "#src/vector.ts";
import Boid from "./boid";
import FlockingBoid from "./flockingboid";
import { BoidVector, Factor, FlockSetting } from "./types";
import * as vectorImmutable from "./vectorImmutable";

export function accelerateFlockingBoids(settings: FlockSetting, flockingBoids: FlockingBoid[], mouse: BoidVector) {
    FlockingBoid.calcFlockingForces(settings, flockingBoids, function applyForces(flockingBoid) {
        const forces = [
            ...flockingBoid.resolveFlockingForceFactors(settings),
            calcRoostForceFactor(flockingBoid),
            calcAvoidHumanForceFactor(flockingBoid, mouse),
            ...calcBoundaryForceFactor(flockingBoid),
        ].filter((x) => x !== null);

        flockingBoid.accelerate(forces);
    });
}

export function calcRoostForceFactor(flockingBoid: FlockingBoid) {
    const roostPosition = flockingBoid.flock.settings.characteristics.roost.position;
    const flockingBoidPosition = flockingBoid;

    const isOutOfRoost =
        vectorImmutable.squareDistance(flockingBoidPosition, roostPosition) >
        flockingBoid.flock.settings.forces.roosting.distance;

    if (!isOutOfRoost) {
        return null;
    }

    return {
        force: {
            x: roostPosition.x - flockingBoidPosition.x,
            y: roostPosition.y - flockingBoidPosition.y,
        },
        strength: flockingBoid.flock.settings.forces.roosting.strength,
    };
}

export function calcAvoidHumanForceFactor(flockingBoid: FlockingBoid, mouse: BoidVector) {
    const carelessnessRatio = flockingBoid.carelessnessRatio || 1;

    if (!mouse) {
        return null;
    }

    if (
        !mouse ||
        !checkIsCloseEnough(
            flockingBoid,
            mouse,
            flockingBoid.flock.settings.forces.predatorAvoidance.distance / carelessnessRatio ** 2
        )
    ) {
        return null;
    }

    return {
        force: vectorImmutable.subtract(flockingBoid, mouse),
        strength: flockingBoid.flock.settings.forces.predatorAvoidance.strength / carelessnessRatio,
    };
}

export function calcBoundaryForceFactor(flockingBoid: FlockingBoid) {
    const boundaryAvoidances: Factor[] = [];
    wallLines.forEach((wallLine) => {
        const boundary = findClosestPoint(wallLine.start, wallLine.end, flockingBoid);
        if (checkIsCloseEnough(flockingBoid, boundary, flockingBoid.flock.settings.forces.boundaryAvoidance.distance)) {
            gameManager.addDebugVector(flockingBoid, boundary, wallLine.color);
            const force = normalizeVector(subtract(flockingBoid, boundary));
            boundaryAvoidances.push({
                force,
                strength: flockingBoid.flock.settings.forces.boundaryAvoidance.strength,
            });
        }
    });
    return boundaryAvoidances;
}

function checkIsCloseEnough(pointA: BoidVector, pointB: BoidVector, distance: number) {
    return vectorImmutable.squareDistance(pointA, pointB) < distance * distance;
}
