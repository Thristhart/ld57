import { gameManager } from "./GameManager";
import {
    backgroundImage,
    backgroundImageBoss,
    backgroundImageLoop1,
    backgroundImageLoop2,
    biome1WallsImage,
    biome2WallsImage,
    biome3WallsImage,
    biome4WallsImage,
    bossImage,
} from "./images";
import { mousePosition, mousePositionGlobal } from "./input";
import { wallLines } from "./collision";
import { add, copyMut, length, normalizeVector, scale, subtract, Vector } from "./vector";
import { clamp } from "./util";
import { MessageEntity } from "./entities/messageentity";
import { tickAnimations } from "./animation";

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D | null;

export const camera = { x: 0, y: 0, scale: parseFloat(localStorage.getItem("scale") ?? "1") };

function lockCameraBounds() {
    const visibleWidth = canvas.width / camera.scale;
    const visibleHeight = canvas.height / camera.scale;
    // right
    if (camera.x + visibleWidth / 2 > gameManager.maxPixelWidth) {
        camera.x = gameManager.maxPixelWidth - visibleWidth / 2;
    }
    // left
    if (camera.x - visibleWidth / 2 < 0) {
        camera.x = visibleWidth / 2;
    }
    // top
    if (camera.y - visibleHeight / 2 < 0) {
        camera.y = visibleHeight / 2;
    }
    // bottom
    if (camera.y + visibleHeight / 2 > gameManager.maxPixelHeight) {
        camera.y = gameManager.maxPixelHeight - visibleHeight / 2;
    }
}

export function isPointOnScreen(point: Vector) {
    if (!canvas) {
        return false;
    }
    const halfVisibleWidth = (canvas.width / camera.scale) * 0.75;
    const halfVisibleHeight = (canvas.height / camera.scale) * 0.75;
    return (
        camera.x - halfVisibleWidth < point.x &&
        camera.x + halfVisibleWidth > point.x &&
        camera.y - halfVisibleHeight < point.y &&
        camera.y + halfVisibleHeight > point.y
    );
}

export function mapMousePosition() {
    const visibleWidth = canvas.width / camera.scale;
    const visibleHeight = canvas.height / camera.scale;

    const rect = canvas.getBoundingClientRect();
    mousePosition.x = ((mousePositionGlobal.x - rect.left) / rect.width) * visibleWidth + camera.x - visibleWidth / 2;
    mousePosition.y = ((mousePositionGlobal.y - rect.top) / rect.height) * visibleHeight + camera.y - visibleHeight / 2;
}

// @ts-ignore
window.DEV_camera = camera;

export function drawFrame(avgFrameLength: number) {
    canvas ??= document.querySelector("canvas")!;
    if (!canvas) {
        return;
    }
    context ??= canvas?.getContext("2d");
    if (!context) {
        return;
    }

    if (!gameManager.isDatingSim && !gameManager.isAnimatingDatingSim) {
        // point camera at player
        camera.x = gameManager.player.x;
        camera.y = gameManager.player.y;

        if (gameManager.player.y > 27000) {
            camera.scale = 1 + (1 - clamp((34800 - gameManager.player.y) / 8000, 0, 1)) * 0.4;
        } else {
            camera.scale = parseFloat(localStorage.getItem("scale") ?? "1");
        }
    }

    lockCameraBounds();

    mapMousePosition();

    context.save();
    context.translate(
        Math.round(canvas.width / 2 - camera.x * camera.scale),
        Math.round(canvas.height / 2 - camera.y * camera.scale)
    );
    context.scale(camera.scale, camera.scale);

    const bgGradient = context.createLinearGradient(
        gameManager.maxPixelWidth / 2,
        0,
        gameManager.maxPixelWidth / 2,
        gameManager.maxPixelHeight * 2
    );
    bgGradient.addColorStop(0, "darkblue");
    bgGradient.addColorStop(1, "black");
    context.fillStyle = bgGradient;
    const topBgAspectRatio = backgroundImage.height / backgroundImage.width;
    const topBgHeight = topBgAspectRatio * gameManager.maxPixelWidth;
    context.drawImage(backgroundImage.bitmap, 0, 0, gameManager.maxPixelWidth, topBgHeight);
    const loopBgAspectRatio = backgroundImageLoop1.height / backgroundImageLoop1.width;
    const loopBgHeight = gameManager.maxPixelWidth * loopBgAspectRatio;
    context.drawImage(backgroundImageLoop1.bitmap, 0, topBgHeight, gameManager.maxPixelWidth, loopBgHeight);
    context.drawImage(
        backgroundImageLoop2.bitmap,
        0,
        topBgHeight + loopBgHeight,
        gameManager.maxPixelWidth,
        loopBgHeight
    );
    context.drawImage(
        backgroundImageLoop2.bitmap,
        0,
        topBgHeight + loopBgHeight * 2,
        gameManager.maxPixelWidth,
        loopBgHeight
    );
    context.drawImage(
        backgroundImageBoss.bitmap,
        0,
        topBgHeight + loopBgHeight * 3,
        gameManager.maxPixelWidth,
        (gameManager.maxPixelWidth * backgroundImageBoss.height) / backgroundImageBoss.width
    );

    if (localStorage.getItem("debug")) {
        context.lineWidth = 20;
        for (const line of wallLines) {
            context.strokeStyle = line.color;
            context.beginPath();
            context.moveTo(line.start.x, line.start.y);
            context.lineTo(line.end.x, line.end.y);
            context.closePath();
            context.stroke();

            context.strokeStyle = "pink";
            context.beginPath();
            const diff = subtract(line.end, line.start);
            const center = add(line.start, scale(normalizeVector(diff), length(diff) / 2));
            const normalDisplay = scale(line.normal, 50);
            context.moveTo(center.x, center.y);
            context.lineTo(center.x + normalDisplay.x, center.y + normalDisplay.y);
            context.closePath();
            context.stroke();
        }
    }

    const drawOnTop = [];
    for (const ent of gameManager.getAllEntities()) {
        if (ent === gameManager.player) {
            // skip so we can draw later with the flashlight
            continue;
        }
        if (ent instanceof MessageEntity) {
            drawOnTop.push(ent);
            continue;
        }
        if (isPointOnScreen(ent)) {
            ent.draw(context);
        }
    }

    let maskOpacity = localStorage.getItem("fullbright")
        ? 0
        : Math.min(1, gameManager.player.y / (gameManager.maxPixelHeight / 2));

    let flashlightSize = 0.1;
    if (gameManager.gameOverTimestamp) {
        flashlightSize *= 1 - clamp((performance.now() - gameManager.gameOverTimestamp) / 400, 0, 1);
        maskOpacity = clamp((performance.now() - gameManager.gameOverTimestamp) / 400, maskOpacity, 1);
    }

    const darknessMaskColor = `rgba(0,0,0,${maskOpacity})`;
    const playerMaskColor = `rgba(0,0,0,${Math.min(maskOpacity - 0.5, 0.7)})`;
    const flashlightGradient = context.createConicGradient(
        gameManager.player.angle,
        gameManager.player.x,
        gameManager.player.y
    );
    if (gameManager.getGameState("lightOn") && flashlightSize) {
        flashlightGradient.addColorStop(0, "transparent");
        flashlightGradient.addColorStop(flashlightSize / 2, "transparent");
        flashlightGradient.addColorStop(1 - flashlightSize / 2, "transparent");
        flashlightGradient.addColorStop(1, "transparent");
    }

    flashlightGradient.addColorStop(flashlightSize, darknessMaskColor);
    flashlightGradient.addColorStop(1 - flashlightSize, darknessMaskColor);

    context.fillStyle = flashlightGradient;
    context.fillRect(0, 0, gameManager.maxPixelWidth, gameManager.maxPixelHeight);
    if (!gameManager.gameOverTimestamp) {
        gameManager.player.draw(context);
    }
    const flashlightPlayerGradient = context.createConicGradient(
        gameManager.player.angle,
        gameManager.player.x + (Math.cos(gameManager.player.angle) * gameManager.player.radius) / 2,
        gameManager.player.y + (Math.sin(gameManager.player.angle) * gameManager.player.radius) / 2
    );
    flashlightPlayerGradient.addColorStop(0, "transparent");
    flashlightPlayerGradient.addColorStop(0.3, playerMaskColor);
    flashlightPlayerGradient.addColorStop(0.7, playerMaskColor);
    flashlightPlayerGradient.addColorStop(1, "transparent");
    context.fillStyle = flashlightPlayerGradient;
    context.beginPath();
    context.arc(gameManager.player.x, gameManager.player.y, gameManager.player.radius, 0, Math.PI * 2);
    context.closePath();
    context.fill();

    let alert = gameManager.getGameState("alert");
    if (alert) {
        let x = gameManager.player.x;
        let y = gameManager.player.y - gameManager.player.radius - 10;

        context.strokeStyle = alert.type === "error" ? "red" : "green";
        context.font = `bold 36pt "Jersey 25"`;

        x -= context.measureText(alert.text).width / 2;

        context.fillStyle = alert.type === "error" ? "red" : "green";
        context.fillText(alert.text, x, y);
    }

    context.drawImage(biome1WallsImage.bitmap, 0, 0);
    context.drawImage(biome2WallsImage.bitmap, 0, biome1WallsImage.height);
    context.drawImage(biome3WallsImage.bitmap, 0, biome1WallsImage.height + biome2WallsImage.height);
    context.drawImage(
        biome4WallsImage.bitmap,
        0,
        biome1WallsImage.height + biome2WallsImage.height + biome3WallsImage.height
    );

    for (const ent of drawOnTop) {
        ent.draw(context);
    }
    context.drawImage(bossImage, bossPos.x, bossPos.y, bossPos.width, bossPos.height);

    context.restore();

    if (localStorage.getItem("debug")) {
        context.fillStyle = "white";
        context.font = "24px arial";
        context.fillText(`FPS: ${Math.floor(1 / (avgFrameLength / 1000))}`, 100, 100);

        context.fillStyle = "pink";

        context.fillText(`${Math.floor(mousePosition.x)}, ${Math.floor(mousePosition.y)}`, 100, 300);
    }
}

const bossPos = { x: 2687, y: 33013, width: 1200, height: 1200 };
//@ts-ignore
window.bossPos = bossPos;
