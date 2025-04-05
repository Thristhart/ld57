const inputs = ["w", "a", "s", "d"] as const;

function isSupportedInput(input: string): input is Input {
    return inputs.includes(input as Input);
}

export type Input = (typeof inputs)[number];

export const InputState = new Map<Input, boolean>();
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
document.body.addEventListener("keydown", onKeyDown);
document.body.addEventListener("keyup", onKeyUp);
