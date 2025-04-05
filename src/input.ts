import { mapMousePosition } from "./canvas";
import { copyMut, Vector } from "./vector";

const inputs = ["w", "a", "s", "d"] as const;

function isSupportedInput(input: string): input is Input {
    return inputs.includes(input as Input);
}

export type Input = (typeof inputs)[number];

export const InputState = new Map<Input, boolean>();

export const mousePosition: Vector = { x: 0, y: 0 };

function onKeyDown(event: KeyboardEvent) {
    if (isSupportedInput(event.key)) {
        InputState.set(event.key, true);
    }
}
function onKeyUp(event: KeyboardEvent) {
    if (isSupportedInput(event.key)) {
        InputState.delete(event.key);
    }
}

function onMouseMove(event: MouseEvent) {
    let x = event.clientX;
    let y = event.clientY;

    copyMut(mousePosition, mapMousePosition(x, y));
}

document.body.addEventListener("keydown", onKeyDown);
document.body.addEventListener("keyup", onKeyUp);
document.body.addEventListener("mousemove", onMouseMove);
