import { wallsImage } from "./images";
import { Vector } from "./vector";

const wallPoints: boolean[][] = [];
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
