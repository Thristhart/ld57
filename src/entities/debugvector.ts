import { gameManager } from "#src/GameManager.tsx";
import { Vector } from "#src/vector.ts";
import { Entity } from "./entity";

export class DebugVector extends Entity {
    private end: Vector;
    private ttl = 5000;
    private color = "red";
    constructor(start: Vector, end: Vector, color = "red") {
        super(start.x, start.y);
        this.end = end;
        this.color = color;
    }
    draw(context: CanvasRenderingContext2D): void {
        context.strokeStyle = this.color;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.end.x, this.end.y);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.arc(this.end.x, this.end.y, 10, 0, Math.PI * 2);
        context.closePath();
        context.stroke();
    }

    tick(dt: number): void {
        this.ttl -= dt;
        if (this.ttl <= 0) {
            gameManager.deleteEntity(this);
        }
    }
}
