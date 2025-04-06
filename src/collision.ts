import { gameManager } from "./GameManager";
import { wallsImage, wallsVectors } from "./images";
import { add, dot, isEqual, length, lengthSquared, normalizeVector, roundMut, scale, subtract, Vector } from "./vector";

interface WallLine {
    start: Vector;
    end: Vector;
    normal: Vector;
    length: number;
    color: string;
}
export const wallLines: WallLine[] = [];

function randomColor() {
    return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(
        Math.random() * 255
    )})`;
}

export function prepareWallData() {
    for (const vector of wallsVectors) {
        let vectorLines: WallLine[] = [];
        let lastPoint = { main: { x: 0, y: 0 } };
        for (const point of vector.curveshapes[0].points) {
            const segment = subtract(point.main, lastPoint.main);
            const normal = normalizeVector({ x: segment.y, y: -segment.x });
            vectorLines.push({
                start: point.main,
                end: lastPoint.main,
                normal,
                color: randomColor(),
                length: length(segment),
            });
            lastPoint = point;
        }
        vectorLines[0].end = lastPoint.main;
        wallLines.push(...vectorLines);
    }
    wallLines.push({
        start: { x: 0, y: 0 },
        end: { x: wallsImage.width, y: 0 },
        normal: { x: 0, y: 1 },
        color: randomColor(),
        length: wallsImage.width,
    });
    wallLines.push({
        start: { x: 0, y: wallsImage.height },
        end: { x: wallsImage.width, y: wallsImage.height },
        normal: { x: 0, y: -1 },
        color: randomColor(),
        length: wallsImage.width,
    });
}

function pointIntersectsCircle(x: number, y: number, circleCenter: Vector, radius: number) {
    const dx = circleCenter.x - x;
    const dy = circleCenter.y - y;
    return Math.sqrt(dx * dx + dy * dy) < radius;
}

function clamp(n: number, min: number, max: number) {
    if (n < min) {
        return min;
    }
    if (n > max) {
        return max;
    }
    return n;
}

export function findClosestPoint(a: Vector, b: Vector, p: Vector) {
    //A->B
    const AtB: Vector = subtract(b, a);
    //A->P
    const AtP: Vector = subtract(p, a);

    const magAtBSq: number = lengthSquared(subtract(a, b));

    const dotAtBwAtP = clamp(dot(AtP, AtB), 0, magAtBSq);

    const distanceAtoCP = dotAtBwAtP / magAtBSq;

    return add(a, scale(AtB, distanceAtoCP));
}

function isCircleCollidingWithOrOutsideLinesegment(position: Vector, radius: number, a: Vector, b: Vector) {
    const CP = findClosestPoint(a, b, position);

    const smallerX = Math.min(a.x, b.x);
    const biggerX = Math.max(a.x, b.x);
    const smallerY = Math.min(a.y, b.y);
    const biggerY = Math.max(a.y, b.y);

    const closestDistance = length(subtract(CP, position));

    if (CP.x >= smallerX && CP.x <= biggerX && CP.y >= smallerY && CP.y <= biggerY && closestDistance < radius) {
        return CP;
    }
    return undefined;
}

export function positionWallCollision(point: Vector, radius: number) {
    const collisions = [];
    const pixel = { x: Math.round(point.x), y: Math.round(point.y) };

    for (const line of wallLines) {
        if (isCircleCollidingWithOrOutsideLinesegment(pixel, radius, line.start, line.end)) {
            collisions.push(line);
        }
    }
    return collisions;
}
