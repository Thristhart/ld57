import * as vectorImmutable from "./vectorImmutable";
import * as vectorMutable from "./vectorMutable";
import { spawnPosition, spawnSpeed } from "./utils";
import { BoidVector, Factor, SpawnConfig, SpawnSpotPattern } from "./types";
import Flock from "./flock";
import { redRectImage } from "#src/images.ts";
import { getDirectionAngle } from "#src/vector.ts";

const RAD = Math.PI / 180;
const SWAY_DIRECTION = { CLOCKWISE: -1, COUNTERCLOCKWISE: 1 };

export default class Boid {
    public width = 20;
    public height = 20;
    public color = "red";
    public swayFlapAngle = 0;

    public position: BoidVector = { x: 0, y: 0 };
    public flock: Flock;
    public speed: BoidVector;
    public swayDirection: number;
    public swayAngle: number;

    constructor(config: SpawnConfig, flock: Flock) {
        this.flock = flock;
        this.position = spawnPosition(config, this.flock.instances.flockingBoids);
        vectorMutable.add(this.position, flock.settings.characteristics.roost.position);
        this.speed = spawnSpeed(this.position, config);
        this.swayAngle = Math.floor(Math.random() * 30) - 15;
        this.swayDirection = Math.random() > 0.5 ? SWAY_DIRECTION.CLOCKWISE : SWAY_DIRECTION.COUNTERCLOCKWISE;
    }

    sway() {
        this.swayAngle += (this.swayDirection * this.swayFlapAngle) / 100;
        if (this.swayAngle > this.swayFlapAngle) {
            this.swayDirection = SWAY_DIRECTION.CLOCKWISE;
        } else if (this.swayAngle < -this.swayFlapAngle) {
            this.swayDirection = SWAY_DIRECTION.COUNTERCLOCKWISE;
        }
    }

    accelerate(factors: Factor[]) {
        this.speed = vectorMutable.normalize(
            factors.reduce((acc: BoidVector, factor: Factor) => {
                if (!factor) {
                    return acc;
                }
                const { force, strength } = factor;
                return vectorMutable.add(acc, vectorMutable.multiply(vectorImmutable.normalize(force), strength));
            }, this.speed)
        );
    }

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.translate(this.position.x, this.position.y);
        const directionAngleRad = getDirectionAngle(this.speed);
        context.rotate(directionAngleRad + Math.PI / 2 + this.swayAngle * RAD);
        const gradient = context.createLinearGradient(
            this.width / 2,
            -this.height / 2,
            this.width / 2,
            this.height / 2
        );
        gradient.addColorStop(0, "red");
        gradient.addColorStop(1, "black");
        context.fillStyle = gradient;
        context.beginPath();
        context.moveTo(this.width / 2, this.height / 2);
        context.lineTo(0, -this.height / 2);
        context.lineTo(-this.width / 2, this.height / 2);
        context.closePath();
        context.fill();
        context.restore();
    }
}
