import { BoidVector } from "./types";

export function normalize(vector: BoidVector) {
    const vectorLength = length(vector);
    if (vectorLength > 0) {
        return {
            x: vector.x / vectorLength,
            y: vector.y / vectorLength,
        };
    }
    return vector;
}

export function length(vector: BoidVector) {
    return Math.sqrt(vector.x ** 2 + vector.y ** 2);
}

export function checkHasLength({ x, y }: BoidVector) {
    return x || y;
}

// no need to calc root, because result used only for comparison
export function squareDistance(vectorA: BoidVector, vectorB: BoidVector) {
    return (vectorA.x - vectorB.x) ** 2 + (vectorA.y - vectorB.y) ** 2;
}

export function multiply(vector: BoidVector, scalar: number) {
    return {
        x: vector.x * scalar,
        y: vector.y * scalar,
    };
}

export function add(vectorA: BoidVector, vectorB: BoidVector) {
    return {
        x: vectorA.x + vectorB.x,
        y: vectorA.y + vectorB.y,
    };
}

export function subtract(vectorA: BoidVector, vectorB: BoidVector) {
    return {
        x: vectorA.x - vectorB.x,
        y: vectorA.y - vectorB.y,
    };
}
export function rotate(vectorA: BoidVector, angle: number) {
    return {
        x: vectorA.x * Math.cos(angle) - vectorA.y * Math.sin(angle),
        y: vectorA.x * Math.sin(angle) + vectorA.y * Math.cos(angle),
    };
}
