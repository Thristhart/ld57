/* eslint-disable no-param-reassign */
import { BoidVector } from "./types";
import { length, squareDistance, checkHasLength } from "./vectorImmutable";

export { length, squareDistance, checkHasLength };

export function normalize(vector: BoidVector) {
    const vectorLength = length(vector);
    if (vectorLength > 0) {
        vector.x /= vectorLength;
        vector.y /= vectorLength;
    }
    return vector;
}

export function multiply(vector: BoidVector, scalar: number) {
    vector.x *= scalar;
    vector.y *= scalar;
    return vector;
}

export function add(vectorA: BoidVector, vectorB: BoidVector) {
    vectorA.x += vectorB.x;
    vectorA.y += vectorB.y;
    return vectorA;
}

export function subtract(vectorA: BoidVector, vectorB: BoidVector) {
    vectorA.x -= vectorB.x;
    vectorA.y -= vectorB.y;
    return vectorA;
}

export function rotate(vectorA: BoidVector, angle: number) {
    const x = vectorA.x * Math.cos(angle) - vectorA.y * Math.sin(angle);
    vectorA.y = vectorA.x * Math.sin(angle) + vectorA.y * Math.cos(angle);
    vectorA.x = x;
    return vectorA;
}
