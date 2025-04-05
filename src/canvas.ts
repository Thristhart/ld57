let canvas: HTMLCanvasElement | null;
let context: CanvasRenderingContext2D | null;

export function drawFrame() {
    canvas ??= document.querySelector("canvas")!;
    if (!canvas) {
        return;
    }
    context ??= canvas?.getContext("2d");
    if (!context) {
        return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "black";
    context.arc(100, 100, 100, 0, Math.PI * 2);

    context.fill();
}
