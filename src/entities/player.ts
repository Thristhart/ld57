import { propulsionSFX } from "#src/audio.ts";
import { gameManager } from "#src/GameManager.tsx";
import { playerImage1, playerImage2, playerImage3 } from "#src/images.ts";
import { InputState, mousePosition } from "#src/input.ts";
import {
    addMut,
    angleBetweenPoints,
    angleDistance,
    copyMut,
    normalizeVector,
    scale,
    scaleMut,
    subtract,
    Vector,
} from "#src/vector.ts";
import { Bubble } from "./bubble";
import { Entity } from "./entity";
import { Grabber } from "./grabber";

export const subConfigs = {
    1: {
        image: playerImage1,
        emitterAngle: 0.28,
        emitterDistanceMod: -2,
        radiusMod: 18,
    },
    2: {
        image: playerImage2,
        emitterAngle: 0.28,
        emitterDistanceMod: -2,
        radiusMod: 18,
    },
    3: {
        image: playerImage3,
        emitterAngle: 0.28,
        emitterDistanceMod: -2,
        radiusMod: 18,
    },
} as const;

export class Player extends Entity {
    public radius = 50;
    public angle = 0;
    public rotationSpeed = 0.01;
    public shouldCollideWithWall = true;
    public upgradeLevel: keyof typeof subConfigs = 1;

    constructor(x: number, y: number) {
        super(x, y);
    }
    tick(dt: number): void {
        this.timeSincePropulsionSound += dt;
        let acceleration: Vector = { x: 0, y: 0 };
        const fuel = gameManager.getGameState("fuelPoints");
        if (fuel > 0 || localStorage.getItem("noclip")) {
            if (InputState.get("w")) {
                acceleration.y += -1;
                this.propulseEffects();
            }
            if (InputState.get("s")) {
                acceleration.y += 1;
                this.propulseEffects();
            }
            if (InputState.get("a")) {
                acceleration.x -= 1;
                this.propulseEffects();
            }
            if (InputState.get("d")) {
                acceleration.x += 1;
                this.propulseEffects();
            }
        } else {
            acceleration.y += 0.2;
        }
        acceleration = normalizeVector(acceleration);
        scaleMut(acceleration, dt * 0.001);
        if (localStorage.getItem("noclip")) {
            scaleMut(acceleration, 4);
        }
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
    public timeSincePropulsionSound = 0;
    public timePerPropulsionSound = 100;
    propulseEffects() {
        if (this.timeSincePropulsionSound > this.timePerPropulsionSound) {
            propulsionSFX.play();
            this.timeSincePropulsionSound = 0;
            this.emitBubble();
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
        const radius = this.radius + subConfigs[this.upgradeLevel].radiusMod;
        context.drawImage(subConfigs[this.upgradeLevel].image.bitmap, -radius, -radius, radius * 2, radius * 2);

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
        let emitPointAngleAdjustment = subConfigs[this.upgradeLevel].emitterAngle * (flip ? -1 : 1);
        const emitPointDistance = this.radius - subConfigs[this.upgradeLevel].emitterDistanceMod;
        this.grabberEmitPoint = {
            x: this.x + Math.cos(this.angle + emitPointAngleAdjustment) * emitPointDistance,
            y: this.y + Math.sin(this.angle + emitPointAngleAdjustment) * emitPointDistance,
        };
    }
    grabber: Grabber | undefined;
    grabberEmitPoint: Vector | undefined;
    emitGrabber() {
        this.calcGrabberEmitPoint();
        const emitVector = normalizeVector(subtract(mousePosition, this.grabberEmitPoint!));
        this.grabber = gameManager.addEntity(new Grabber(this.grabberEmitPoint!.x, this.grabberEmitPoint!.y));
        this.grabber.velocity = scale(emitVector, 8);
        addMut(this.grabber.velocity, this.velocity);
    }
    retractGrabber() {
        if (this.grabber) {
            this.grabber.retracting = true;
        }
    }
    emitBubble() {
        const bubble = gameManager.addEntity(new Bubble(this.x, this.y));
        bubble.velocity = scale(this.velocity, -0.5);
    }
}
