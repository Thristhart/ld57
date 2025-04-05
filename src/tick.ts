import { drawFrame } from "./canvas";
import { gameManager } from "./GameManager";

let lastFrameTime = performance.now();
export function tick(timestamp: number) {
    const dt = timestamp - lastFrameTime;
    lastFrameTime = timestamp;
    requestAnimationFrame(tick);

    gameManager.tick(dt);

    drawFrame();
}
