import { bgmBiome2, switchBGM } from "#src/audio.ts";
import { findClosestPoint, positionWallCollision } from "#src/collision.ts";
import { gameManager, useUpgradedMaxValue } from "#src/GameManager.tsx";
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
    dot,
    scale,
    subtract,
    length,
} from "#src/vector.ts";
import { Entity } from "./entity";
import { Grabber } from "./grabber";

export class Player extends Entity {
    public radius = 50;
    public angle = 0;
    public rotationSpeed = 0.01;
    public shouldCollideWithWall = true;
    constructor(x: number, y: number) {
        super(x, y);
    }
    tick(dt: number): void {
        let acceleration: Vector = { x: 0, y: 0 };
        const fuel = gameManager.getGameState("fuelPoints");
        if (fuel > 0) {
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
        } else {
            const hp = gameManager.getGameState("hullPoints");
            gameManager.setGameState("hullPoints", hp - 0.002 * dt);
        }

        const depth = gameManager.getGameState("currentDepth");
        if (depth > gameManager.getUpgradedMaxValue("depthUpgradeLevel")) {
            const hp = gameManager.getGameState("hullPoints");
            gameManager.setGameState("hullPoints", hp - 0.02 * dt);
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
    }
    draw(context: CanvasRenderingContext2D) {
        let flip = false;
        if (this.angle > Math.PI / 2 && this.angle < Math.PI * 1.5) {
            flip = true;
        }
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        if (flip) {
            context.scale(1, -1);
        }
        context.drawImage(playerImage1.bitmap, -this.radius, -this.radius);

        context.restore();

        if (this.grabber) {
            this.calcGrabberEmitPoint();
            context.strokeStyle = "black";
            context.lineWidth = 6;

            context.beginPath();
            context.moveTo(this.grabberEmitPoint!.x, this.grabberEmitPoint!.y);
            context.lineTo(this.grabber.x, this.grabber.y);
            context.closePath();
            context.stroke();
        }
    }
    calcGrabberEmitPoint() {
        let flip = false;
        if (this.angle > Math.PI / 2 && this.angle < Math.PI * 1.5) {
            flip = true;
        }
        let emitPointAngleAdjustment = 0.35 * (flip ? -1 : 1);
        const emitPointDistance = this.radius - 1;
        this.grabberEmitPoint = {
            x: this.x + Math.cos(this.angle + emitPointAngleAdjustment) * emitPointDistance,
            y: this.y + Math.sin(this.angle + emitPointAngleAdjustment) * emitPointDistance,
        };
    }
    grabber: Grabber | undefined;
    grabberEmitPoint: Vector | undefined;
    emitGrabber() {
        this.calcGrabberEmitPoint();
        const emitVector = normalizeVector(subtract(mousePosition, this));
        this.grabber = gameManager.addEntity(new Grabber(this.grabberEmitPoint!.x, this.grabberEmitPoint!.y));
        this.grabber.velocity = scale(emitVector, 2);
        addMut(this.grabber.velocity, this.velocity);
    }
    retractGrabber() {
        if (this.grabber) {
            this.grabber.retracting = true;
        }
    }
}
