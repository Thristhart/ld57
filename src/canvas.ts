import { gameManager } from "./GameManager";
import { wallsImage } from "./images";

let canvas: HTMLCanvasElement | null;
let context: CanvasRenderingContext2D | null;

let width = 1080;
let height = 1920;

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

    const bgGradient = context.createLinearGradient(width / 2, 0, width / 2, height);
    bgGradient.addColorStop(0, "darkblue");
    bgGradient.addColorStop(1, "black");
    context.fillStyle = bgGradient;
    context.fillRect(0, 0, width, height);

    context.drawImage(wallsImage, 0, 0, wallsImage.width, wallsImage.height);

    for (const ent of gameManager.getAllEntities()) {
        ent.draw(context);
    }
}
