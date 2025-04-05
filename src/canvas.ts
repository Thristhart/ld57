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

    context.fillStyle = "darkblue";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";
    context.beginPath();
    context.arc(100, 100, 100, 0, Math.PI * 2);
    context.closePath();
    context.fill();

    context.fillStyle = "pink";
    context.beginPath();
    context.arc(width - 100, 100, 100, 0, Math.PI * 2);
    context.closePath();
    context.fill();
}
