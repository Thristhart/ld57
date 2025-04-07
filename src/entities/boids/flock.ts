import { gameManager } from "#src/GameManager.tsx";
import { isPointOnScreen } from "#src/canvas.ts";
import { Entity } from "../entity";
import { accelerateFlockingBoids } from "./accelerate";
import FlockingBoid from "./flockingboid";
import { FlockInstances, FlockSetting, SpawnConfig } from "./types";
import { move, mutableFilter } from "./utils";

export const BOID_TYPES = {
    FLOCKING_BOIDS: "flockingBoids",
    PREDATORS: "predators",
};

export default class Flock extends Entity {
    public instances: FlockInstances;
    public settings: FlockSetting;

    get children() {
        return this.instances.flockingBoids;
    }

    constructor(settings: FlockSetting) {
        super(settings.characteristics.roost.position.x, settings.characteristics.roost.position.y);
        this.instances = {
            flockingBoids: [],
        };
        this.settings = settings;
    }

    tick() {
        const flockingBoids = this.instances.flockingBoids;

        this.populateFlock();
        accelerateFlockingBoids(this.settings, flockingBoids, gameManager.player);
        move(flockingBoids, this.settings);
    }

    populateFlock() {
        const instances = this.instances["flockingBoids"];
        const characteristic = this.settings.characteristics["flockingBoids"];
        const diff = characteristic.count - instances.length;
        if (!diff) {
            return;
        }

        if (isPointOnScreen(this)) {
            return;
        }

        const spawnConfig = characteristic.spawnPattern as SpawnConfig;
        const maxGrowthPerTick = spawnConfig.maxGrowthPerTick || Infinity;
        const maxShrinkPerTick = spawnConfig.maxShrinkPerTick || Infinity;
        const effect = Math.max(-maxShrinkPerTick, Math.min(diff, maxGrowthPerTick));

        if (effect > 0) {
            for (let i = 0; i < effect; i += 1) {
                instances.push(new FlockingBoid(spawnConfig, this));
            }
        } else {
            const reduceEachOf = -Math.floor(instances.length / effect);
            mutableFilter(instances, (_: any, i: number) => (i + 1) % reduceEachOf);
        }
    }

    draw(virtualContext: CanvasRenderingContext2D) {
        const { flockingBoids } = this.instances;
        for (let i = 0; i < flockingBoids.length; i += 1) {
            flockingBoids[i].draw(virtualContext, this.settings.image);
        }
    }
}
