import { findClosestPoint, wallLines } from "#src/collision.ts";
import { gameManager } from "#src/GameManager.tsx";
import { CollectableConfig } from "#src/gametypes.ts";
import { CollectableName } from "#src/startstate.ts";
import { addMut, copyMut, getDirectionAngle, length, normalizeVector, scaleMut, subtract } from "#src/vector.ts";
import { Entity } from "./entity";

export class Collectable extends Entity {
    public resource: string;
    public height: number;
    public width: number;
    public image: HTMLImageElement;
    public grabbable = true;
    public angle = 0;

    constructor(collectable: CollectableConfig) {
        const { x, y, width, height, image, resource } = collectable;
        super(x, y);
        this.width = width;
        this.height = height;
        this.image = image;
        this.resource = resource;
        this.inventoryType = resource as CollectableName;
    }

    checkedLines = false;
    tick(dt: number): void {
        super.tick(dt);
        if (!this.checkedLines) {
            this.checkedLines = true;
            for (const wallLine of wallLines) {
                const boundary = findClosestPoint(wallLine.start, wallLine.end, this);
                const diff = subtract(boundary, this);
                const distance = length(diff);
                if (distance < 30) {
                    this.angle = getDirectionAngle(diff) - Math.PI / 2;
                    addMut(boundary, scaleMut(normalizeVector(diff), -this.radius / 2));
                    copyMut(this, boundary);
                    break;
                }
            }
        }
    }

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        context.restore();
    }
}
