import { positionWallCollision } from "#src/collision.ts";
import { InputState } from "#src/input.ts";
import { add, addMut, copyMut, normalizeVector, scaleMut, Vector } from "#src/vector.ts";
import { Entity } from "./entity";

export class Player extends Entity {
    constructor(x: number, y: number) {
        super(x, y);
    }

    collisions: Array<Vector> = [];
    tick(dt: number): void {
        let velocity: Vector = { x: 0, y: 0 };
        if (InputState.get("w")) {
            velocity.y += -1;
        }
        if (InputState.get("s")) {
            velocity.y += 1;
        }
        if (InputState.get("a")) {
            velocity.x -= 1;
        }
        if (InputState.get("d")) {
            velocity.x += 1;
        }
        velocity = normalizeVector(velocity);
        scaleMut(velocity, dt);

        const newPosition = add(this, velocity);
        const collisions = positionWallCollision(newPosition, this.radius);
        if (collisions.length === 0) {
            copyMut(this, newPosition);
        }
    }
    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = "cornflowerblue";
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    }
}
