import { Vector } from "./vector";

export function clamp(n: number, min: number, max: number) {
    if (n < min) {
        return min;
    }
    if (n > max) {
        return max;
    }
    return n;
}

export function isWithinBounds(point: Vector, topLeft: Vector, bottomRight: Vector) {
    return point.x > topLeft.x && point.x < bottomRight.x && point.y > topLeft.y && point.y < bottomRight.y;
}

export function lerp(t: number, a: number, b: number) {
    return (1 - t) * a + t * b;
}
