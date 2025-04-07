import { gameManager } from "#src/GameManager.tsx";
import { length } from "#src/vector.ts";
import { Entity } from "./entity";

export class Bubble extends Entity {
    public radius: number = 5;
    public shouldCollideWithWall = true;
    public bounceFactor = 0.1;
    public ttl = 10000;

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = "cornflowerblue";
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    }
    tick(dt: number): void {
        this.acceleration.y = -0.001;
        super.tick(dt);
        this.ttl -= dt;
        if (this.ttl <= 0) {
            gameManager.deleteEntity(this);
        }
        if (length(this.velocity) < 0.01) {
            gameManager.deleteEntity(this);
        }
    }
}
