import * as vectorImmutable from "./vectorImmutable";
import * as vectorMutable from "./vectorMutable";
import { spawnPosition, spawnSpeed } from "./utils";
import { BoidVector, Factor, SpawnConfig, SpawnSpotPattern } from "./types";
import Flock from "./flock";
import { redRectImage } from "#src/images.ts";

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
        this.speed = spawnSpeed(this.position, config);
        this.swayAngle = Math.floor(Math.random() * 30) - 15;
        this.swayDirection = Math.random() > 0.5 ? SWAY_DIRECTION.CLOCKWISE : SWAY_DIRECTION.COUNTERCLOCKWISE;
    }

    sway() {
        this.swayAngle += (this.swayDirection * this.swayFlapAngle) / 2;
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
        context.translate(
            this.position.x * this.flock.settings.width + this.flock.x,
            this.position.y * this.flock.settings.height + this.flock.y
        );
        const directionAngleRad = (Math.PI / 2 - Math.acos(this.speed.x)) / 1.5;
        context.rotate(Math.PI / 2 - directionAngleRad + this.swayAngle * RAD);
        context.drawImage(redRectImage, -this.width / 2, -this.height / 2);
        context.restore();
    }
}
