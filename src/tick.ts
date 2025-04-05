import { drawFrame } from "./canvas";

export function tick() {
    requestAnimationFrame(tick);

    drawFrame();
}
