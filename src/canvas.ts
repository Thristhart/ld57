import { gameManager } from "./GameManager";
import { wallsImage } from "./images";

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D | null;

let width = 1080;
let height = 1920;

const camera = { x: 0, y: 0, scale: 1 };

function lockCameraBounds() {
    const visibleWidth = canvas.width / camera.scale;
    const visibleHeight = canvas.height / camera.scale;
    // left
    if (camera.x - visibleWidth / 2 < 0) {
        camera.x = visibleWidth / 2;
    }
    // right
    if (camera.x + visibleWidth / 2 > wallsImage.width) {
        camera.x = wallsImage.width - visibleWidth / 2;
    }
    // top
    if (camera.y - visibleHeight / 2 < 0) {
        camera.y = visibleHeight / 2;
    }
    // bottom
    if (camera.y + visibleHeight / 2 > wallsImage.height) {
        camera.y = wallsImage.height - visibleHeight / 2;
    }
}

export function drawFrame() {
    canvas ??= document.querySelector("canvas")!;
    if (!canvas) {
        return;
    }
    context ??= canvas?.getContext("2d");
    if (!context) {
        return;
    }

    canvas.width = width;
    canvas.height = height;

    // point camera at player
    camera.x = gameManager.player.x;
    camera.y = gameManager.player.y;

    lockCameraBounds();

    context.save();
    context.translate(
        Math.round(canvas.width / 2 - camera.x * camera.scale),
        Math.round(canvas.height / 2 - camera.y * camera.scale)
    );
    context.scale(camera.scale, camera.scale);

    const bgGradient = context.createLinearGradient(wallsImage.width / 2, 0, wallsImage.width / 2, wallsImage.height);
    bgGradient.addColorStop(0, "darkblue");
    bgGradient.addColorStop(1, "black");
    context.fillStyle = bgGradient;
    context.fillRect(0, 0, wallsImage.width, wallsImage.height);

    context.drawImage(wallsImage, 0, 0, wallsImage.width, wallsImage.height);

    for (const ent of gameManager.getAllEntities()) {
        if (ent === gameManager.player) {
            // skip so we can draw later with the flashlight
            continue;
        }
        ent.draw(context);
    }

    const flashlightGradient = context.createConicGradient(
        gameManager.player.angle,
        gameManager.player.x,
        gameManager.player.y
    );
    flashlightGradient.addColorStop(0, "transparent");
    flashlightGradient.addColorStop(0.05, "transparent");
    flashlightGradient.addColorStop(0.1, "black");
    flashlightGradient.addColorStop(0.9, "black");
    flashlightGradient.addColorStop(0.95, "transparent");
    flashlightGradient.addColorStop(1, "transparent");
    context.fillStyle = flashlightGradient;
    context.fillRect(0, 0, wallsImage.width, wallsImage.height);
    gameManager.player.draw(context);
    const flashlightPlayerGradient = context.createConicGradient(
        gameManager.player.angle,
        gameManager.player.x + (Math.cos(gameManager.player.angle) * gameManager.player.radius) / 2,
        gameManager.player.y + (Math.sin(gameManager.player.angle) * gameManager.player.radius) / 2
    );
    flashlightPlayerGradient.addColorStop(0, "transparent");
    flashlightPlayerGradient.addColorStop(0.3, "rgba(0, 0, 0, 0.7)");
    flashlightPlayerGradient.addColorStop(0.7, "rgba(0, 0, 0, 0.7)");
    flashlightPlayerGradient.addColorStop(1, "transparent");
    context.fillStyle = flashlightPlayerGradient;
    context.fillRect(
        gameManager.player.x - gameManager.player.radius,
        gameManager.player.y - gameManager.player.radius,
        gameManager.player.radius * 2,
        gameManager.player.radius * 2
    );

    context.restore();
}
