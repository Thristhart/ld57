import { wallsImage, wallsVectors } from "./images";
import { Vector } from "./vector";

const wallPoints: boolean[][] = [];
export const wallLines: { x1: number; x2: number; y1: number; y2: number }[] = [];

export function prepareWallData() {
    const wallDataCanvas = document.createElement("canvas");
    const wallDataContext = wallDataCanvas.getContext("2d")!;
    wallDataCanvas.width = wallsImage.width;
    wallDataCanvas.height = wallsImage.height;
    wallDataContext.drawImage(wallsImage, 0, 0, wallsImage.width, wallsImage.height);
    const imageData = wallDataContext.getImageData(0, 0, wallDataCanvas.width, wallDataCanvas.height);
    for (let x = 0; x < imageData.width; x++) {
        wallPoints[x] = [];
        for (let y = 0; y < imageData.height; y++) {
            wallPoints[x][y] = imageData.data[(y * imageData.width + x) * 4 + 3] > 0;
        }
    }
    for (const vector of wallsVectors) {
        let vectorLines = [];
        let lastPoint = { main: { x: 0, y: 0 } };
        for (const point of vector.curveshapes[0].points) {
            vectorLines.push({ x1: point.main.x, x2: lastPoint.main.x, y1: point.main.y, y2: lastPoint.main.y });
            lastPoint = point;
        }
        vectorLines[0].x2 = lastPoint.main.x;
        vectorLines[0].y2 = lastPoint.main.y;
        wallLines.push(...vectorLines);
    }
}

function isPointWall(x: number, y: number) {
    return wallPoints[x]?.[y] ?? true;
}

function pointIntersectsCircle(x: number, y: number, circleCenter: Vector, radius: number) {
    const dx = circleCenter.x - x;
    const dy = circleCenter.y - y;
    return Math.sqrt(dx * dx + dy * dy) < radius;
}

export function positionWallCollision(point: Vector, radius: number) {
    const collisions = [];
    const pixel = { x: Math.round(point.x), y: Math.round(point.y) };
    for (let x = pixel.x - radius; x < pixel.x + radius; x++) {
        for (let y = pixel.y - radius; y < pixel.y + radius; y++) {
            if (isPointWall(x, y) && pointIntersectsCircle(x, y, pixel, radius)) {
                collisions.push({ x, y });
            }
        }
    }
    return collisions;
}
