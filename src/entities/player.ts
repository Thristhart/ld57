import { positionWallCollision } from "#src/collision.ts";
import { playerImage1 } from "#src/images.ts";
import { InputState, mousePosition } from "#src/input.ts";
import {
    add,
    addMut,
    angleBetweenPoints,
    angleDistance,
    copyMut,
    getDirectionAngle,
    normalizeVector,
    scaleMut,
    Vector,
} from "#src/vector.ts";
import { Entity } from "./entity";

export class Player extends Entity {
    public radius = 50;
    public angle = 0;
    public rotationSpeed = 0.01;
    public currentPokeLength = 0;
    public maxPokeLength = 150;
    constructor(x: number, y: number) {
        super(x, y);
    }

    collisions: Array<Vector> = [];
    tick(dt: number): void {
        let acceleration: Vector = { x: 0, y: 0 };
        if (InputState.get("w")) {
            acceleration.y += -1;
        }
        if (InputState.get("s")) {
            acceleration.y += 1;
        }
        if (InputState.get("a")) {
            acceleration.x -= 1;
        }
        if (InputState.get("d")) {
            acceleration.x += 1;
        }
        acceleration = normalizeVector(acceleration);
        scaleMut(acceleration, dt * 0.001);
        copyMut(this.acceleration, acceleration);

        this.kinematics(dt);

        let targetAngle = angleBetweenPoints(mousePosition, this);
        let adjustment = -0.2;
        if (targetAngle > Math.PI / 2 && targetAngle < Math.PI * 1.5) {
            adjustment = 0.2;
        }
        targetAngle += adjustment;
        let angleDiff = angleDistance(this.angle, targetAngle);

        const angleTick = this.rotationSpeed * dt;
        if (Math.abs(angleDiff) < angleTick) {
            this.angle = targetAngle;
        } else if (angleDiff > 0) {
            this.angle += angleTick;
        } else {
            this.angle -= angleTick;
        }

        const newPosition = add(this, this.velocity);
        const collisions = positionWallCollision(newPosition, this.radius);
        if (collisions.length === 0) {
            copyMut(this, newPosition);
        }
    }
    draw(context: CanvasRenderingContext2D) {
        let drawAngle = this.angle;
        let flip = false;
        if (drawAngle > Math.PI / 2 && drawAngle < Math.PI * 1.5) {
            flip = true;
        }
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        if (flip) {
            context.scale(1, -1);
        }
        context.drawImage(playerImage1, -this.radius, -this.radius);

        if (this.currentPokeLength) {
            context.rotate(0.2);
            context.fillStyle = "black";
            context.fillRect(this.radius, 0, this.currentPokeLength, 10);
        }
        context.restore();
    }
}
