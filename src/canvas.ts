const canvas = document.querySelector("canvas")!;
const context = canvas.getContext("2d")!;

export function drawFrame() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "black";
    context.arc(100, 100, 100, 0, Math.PI * 2);

    context.fill();
}
