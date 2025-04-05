import { Vector } from "./vector";

const inputs = ["w", "a", "s", "d"] as const;

function isSupportedInput(input: string): input is Input {
    return inputs.includes(input as Input);
}

export type Input = (typeof inputs)[number];

export const InputState = new Map<Input, boolean>();

export const mousePositionGlobal: Vector = { x: 0, y: 0 };
export const mousePosition: Vector = { x: 0, y: 0 };
// @ts-ignore
window.DEV_mousePosition = mousePosition;

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

export function onMouseMove(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    mousePositionGlobal.x = event.clientX;
    mousePositionGlobal.y = event.clientY;
}

document.body.addEventListener("keydown", onKeyDown);
document.body.addEventListener("keyup", onKeyUp);
