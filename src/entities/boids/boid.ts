import * as vectorImmutable from "./vectorImmutable";
import * as vectorMutable from "./vectorMutable";
import { spawnPosition, spawnSpeed } from "./utils";
import { BoidVector, Factor, SpawnConfig, SpawnSpotPattern } from "./types";
import Flock from "./flock";
import { cuteFish1Image, redRectImage } from "#src/images.ts";
import { getDirectionAngle } from "#src/vector.ts";
import { Entity } from "../entity";

const RAD = Math.PI / 180;
const SWAY_DIRECTION = { CLOCKWISE: -1, COUNTERCLOCKWISE: 1 };

export default class Boid extends Entity {
    radius = 30;
    public swayFlapAngle = 0;

    public flock: Flock;
    public speed: BoidVector;
    public swayDirection: number;
    public swayAngle: number;

    constructor(config: SpawnConfig, flock: Flock) {
        super(0, 0);
        this.flock = flock;
        const position = spawnPosition(config, this.flock.instances.flockingBoids);
        this.x = position.x;
        this.y = position.y;
        vectorMutable.add(this, flock.settings.characteristics.roost.position);
        this.speed = spawnSpeed(this, config);
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
        context.translate(this.x, this.y);
        const directionAngleRad = getDirectionAngle(this.speed);
        let flip = false;
        if (directionAngleRad > Math.PI / 2 && directionAngleRad < Math.PI * 1.5) {
            flip = true;
        }
        context.rotate(directionAngleRad - Math.PI + this.swayAngle * RAD);
        if (flip) {
            context.scale(1, -1);
        }

        context.drawImage(cuteFish1Image, -this.radius, -this.radius, this.radius * 2, this.radius * 2);

        context.restore();
    }
}
