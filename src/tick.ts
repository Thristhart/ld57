import { drawFrame } from "./canvas";
import { gameManager } from "./GameManager";

let last5FrameLength = [0, 0, 0, 0, 0];

let lastFrameTime = performance.now();
export function tick(timestamp: number) {
    const dt = timestamp - lastFrameTime;
    lastFrameTime = timestamp;
    last5FrameLength.push(dt);
    last5FrameLength.splice(0, 1);
    requestAnimationFrame(tick);

    gameManager.tick(dt);

    const avgFrameLength =
        last5FrameLength.reduce((last, curr) => {
            return last + curr;
        }, 0) / last5FrameLength.length;

    drawFrame(avgFrameLength);
}
