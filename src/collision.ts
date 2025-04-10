import { Outline } from "js-svg-path";
import { gameManager } from "./GameManager";
import {
    biome1WallsImage,
    biome1WallVectors,
    biome2WallsImage,
    biome2WallVectors,
    biome3WallsImage,
    biome3WallVectors,
    biome4WallVectors,
} from "./images";
import { clamp } from "./util";
import { add, dot, isEqual, length, lengthSquared, normalizeVector, roundMut, scale, subtract, Vector } from "./vector";

interface WallLine {
    start: Vector;
    end: Vector;
    normal: Vector;
    length: number;
    color: string;
}
export let wallLines: WallLine[] = [];

function randomColor() {
    return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(
        Math.random() * 255
    )})`;
}

function biomeWalls(outlines: Outline[], biomeOffset: number) {
    for (const vector of outlines) {
        let vectorLines: WallLine[] = [];
        for (const shape of vector.curveshapes) {
            let lastPoint = { main: { x: 0, y: 0 } };
            let firstLine;
            for (const point of shape?.points ?? []) {
                const segment = subtract(point.main, lastPoint.main);
                const normal = normalizeVector({ x: segment.y, y: -segment.x });
                const line = {
                    start: { x: point.main.x, y: point.main.y + biomeOffset },
                    end: { x: lastPoint.main.x, y: lastPoint.main.y + biomeOffset },
                    normal,
                    color: randomColor(),
                    length: length(segment),
                };
                firstLine ??= line;
                vectorLines.push(line);
                lastPoint = point;
            }
            if (firstLine) {
                firstLine.end = { x: lastPoint.main.x, y: lastPoint.main.y + biomeOffset };
            }
        }
        wallLines.push(...vectorLines);
    }
}

export function prepareWallData() {
    biomeWalls(biome1WallVectors, 0);
    biomeWalls(biome2WallVectors, biome1WallsImage.height);
    biomeWalls(biome3WallVectors, biome1WallsImage.height + biome2WallsImage.height);
    biomeWalls(biome4WallVectors, biome1WallsImage.height + biome2WallsImage.height + biome3WallsImage.height);
    wallLines.push({
        start: { x: 0, y: 0 },
        end: { x: gameManager.maxPixelWidth, y: 0 },
        normal: { x: 0, y: 1 },
        color: randomColor(),
        length: gameManager.maxPixelWidth,
    });
    wallLines.push({
        start: { x: 0, y: gameManager.maxPixelHeight },
        end: { x: gameManager.maxPixelWidth, y: gameManager.maxPixelHeight },
        normal: { x: 0, y: -1 },
        color: randomColor(),
        length: gameManager.maxPixelWidth,
    });
}

function pointIntersectsCircle(x: number, y: number, circleCenter: Vector, radius: number) {
    const dx = circleCenter.x - x;
    const dy = circleCenter.y - y;
    return Math.sqrt(dx * dx + dy * dy) < radius;
}

export function circleVsCircleCollision(a: Vector, aRadius: number, b: Vector, bRadius: number) {
    const distance = length(subtract(b, a));
    const totalRadius = aRadius + bRadius;
    return totalRadius > distance;
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
        if (lengthSquared(subtract(line.start, point)) > line.length * line.length) {
            continue;
        }
        if (isCircleCollidingWithOrOutsideLinesegment(pixel, radius, line.start, line.end)) {
            collisions.push(line);
        }
    }
    return collisions;
}
