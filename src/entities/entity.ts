import { addMut, scale, scaleMut, Vector } from "#src/vector.ts";

export class Entity {
    public x: number;
    public y: number;
    public radius: number = 50;
    public frictionRate: number = -0.003;

    public id!: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // pixels per second squared
    public acceleration: Vector = { x: 0, y: 0 };
    // pixels per second
    public velocity: Vector = { x: 0, y: 0 };

    kinematics(dt: number) {
        const velocityGain = scale(this.acceleration, dt);
        addMut(this.velocity, velocityGain);

        scaleMut(this.velocity, Math.pow(2, this.frictionRate * dt));

        if (Math.abs(this.velocity.x) < 0.001) {
            this.velocity.x = 0;
        }
        if (Math.abs(this.velocity.y) < 0.001) {
            this.velocity.y = 0;
        }
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
