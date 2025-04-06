import { positionWallCollision, findClosestPoint } from "#src/collision.ts";
import { CollectableName } from "#src/startstate.ts";
import { add, addMut, copyMut, dot, length, normalizeVector, scale, scaleMut, subtract, Vector } from "#src/vector.ts";

export class Entity {
    public x: number;
    public y: number;
    public radius: number = 50;
    public frictionRate: number = -0.003;
    public bounceFactor: number = 1;
    public grabbable = false;

    public inventoryType: CollectableName | undefined;

    public get children(): Entity[] {
        return [];
    }

    public shouldCollideWithWall = false;

    collisions: Array<{ start: Vector; end: Vector; normal: Vector; color: string }> = [];

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
        const newPosition = add(this, this.velocity);

        if (this.shouldCollideWithWall && !localStorage.getItem("noclip")) {
            this.collisions = positionWallCollision(newPosition, this.radius);
            if (this.collisions.length === 0) {
                copyMut(this, newPosition);
            } else {
                for (const col of this.collisions) {
                    const closestPoint = findClosestPoint(col.start, col.end, this);
                    const vectorToClosestPoint = subtract(closestPoint, this);
                    const minimumDistanceVector = normalizeVector(vectorToClosestPoint);
                    scaleMut(minimumDistanceVector, -(this.radius + 1));
                    const newPosition = add(closestPoint, minimumDistanceVector);
                    copyMut(this, newPosition);

                    const bounceAmount = scale(col.normal, dot(this.velocity, col.normal) * 2);
                    this.velocity = subtract(this.velocity, bounceAmount);
                    if (length(this.velocity) < 0.3) {
                        this.velocity = { x: 0, y: 0 };
                    }
                    scaleMut(this.velocity, this.bounceFactor);
                }
            }
        } else {
            copyMut(this, newPosition);
        }
    }

    tick(dt: number) {
        this.kinematics(dt);
        addMut(this, this.velocity);
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = "cornflowerblue";
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    }
}
