let canvas: HTMLCanvasElement | null;
let context: CanvasRenderingContext2D | null;
let parent: HTMLElement;

let width = 0;
let height = 0;

function onResize() {
    const parentRect = parent?.getBoundingClientRect();
    if (!parentRect) {
        return;
    }
    width = parentRect.width;
    height = parentRect.height;
}

window.addEventListener("resize", onResize);

export function drawFrame() {
    canvas ??= document.querySelector("canvas")!;
    if (!canvas) {
        return;
    }
    context ??= canvas?.getContext("2d");
    if (!context) {
        return;
    }
    const hadParent = !!parent;
    parent ??= canvas?.parentElement!;
    if (parent && !hadParent) {
        onResize();
    }

    canvas.width = width;
    canvas.height = height;

    context.fillStyle = "black";
    context.arc(100, 100, 100, 0, Math.PI * 2);

    context.fill();
}
