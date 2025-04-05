export class Entity {
    public x: number;
    public y: number;
    public radius: number = 50;

    public id!: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    tick(dt: number) {}

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = "cornflowerblue";
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    }
}
