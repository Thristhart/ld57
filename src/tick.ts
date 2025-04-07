import { drawFrame } from "./canvas";
import { gameManager } from "./GameManager";

let last5FrameLength = [0, 0, 0, 0, 0];

let lastFrameTime = performance.now();
let timeSinceLastFrame = 100;
const millisecondsPerFrame = 1000 / 60;
export function tick(timestamp: number) {
    const dt = timestamp - lastFrameTime;
    lastFrameTime = timestamp;
    last5FrameLength.push(dt);
    last5FrameLength.splice(0, 1);
    requestAnimationFrame(tick);

    if (dt > 600) {
        // too long since last frame, just drop frames and get back on schedule
        return;
    }
    timeSinceLastFrame += dt;

    while (timeSinceLastFrame >= millisecondsPerFrame) {
        gameManager.tick(millisecondsPerFrame);
        timeSinceLastFrame -= millisecondsPerFrame;
    }

    const avgFrameLength =
        last5FrameLength.reduce((last, curr) => {
            return last + curr;
        }, 0) / last5FrameLength.length;

    drawFrame(avgFrameLength);
}
