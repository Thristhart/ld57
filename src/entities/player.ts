import { InputState } from "#src/input.ts";
import { addMut, normalizeVector, scaleMut, Vector } from "#src/vector.ts";
import { Entity } from "./entity";

export class Player extends Entity {
    constructor(x: number, y: number) {
        super(x, y);
    }

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

        addMut(this, velocity);
    }
}
