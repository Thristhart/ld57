/* eslint-disable */
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
    const flockingBoidPosition = flockingBoid.position;

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

    const mouseNormalized = getNormalizedMousePosition(mouse, flockingBoid.flock.settings);

    if (
        !mouseNormalized ||
        !checkIsCloseEnough(
            flockingBoid.position,
            mouseNormalized,
            flockingBoid.flock.settings.forces.predatorAvoidance.distance / carelessnessRatio ** 2
        )
    ) {
        return null;
    }

    return {
        force: vectorImmutable.subtract(flockingBoid.position, mouseNormalized),
        strength: flockingBoid.flock.settings.forces.predatorAvoidance.strength / carelessnessRatio,
    };
}

export function calcBoundaryForceFactor(flockingBoid: FlockingBoid) {
    const boundaries = [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
    ];
    const boundaryAvoidances: Factor[] = [];
    boundaries.forEach((boundary) => {
        if (
            checkIsCloseEnough(
                flockingBoid.position,
                boundary,
                flockingBoid.flock.settings.forces.boundaryAvoidance.distance
            )
        ) {
            boundaryAvoidances.push({
                force: boundary,
                strength: flockingBoid.flock.settings.forces.boundaryAvoidance.strength,
            });
        }
    });
    return boundaryAvoidances;
}

function checkIsCloseEnough(pointA: BoidVector, pointB: BoidVector, distance: number) {
    return vectorImmutable.squareDistance(pointA, pointB) < distance;
}

function getNormalizedMousePosition(mouse: BoidVector, settings: FlockSetting) {
    if (mouse.x < settings.x || mouse.x > settings.x + settings.width) return null;
    if (mouse.y < settings.y || mouse.y > settings.y + settings.height) return null;

    const mouseX = (mouse.x - settings.x) / settings.width;
    const mouseY = (mouse.y - settings.y) / settings.height;
    return { x: mouseX, y: mouseY };
}
