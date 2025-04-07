import { CollectableConfig } from "#src/gametypes.ts";
import { CollectableName } from "#src/startstate.ts";
import { Entity } from "./entity";

export class Collectable extends Entity {
    public resource: string;
    public height: number;
    public width: number;
    public image: HTMLImageElement;
    public grabbable = true;

    constructor(collectable: CollectableConfig) {
        const { x, y, width, height, image, resource } = collectable;
        super(x, y);
        this.width = width;
        this.height = height;
        this.image = image;
        this.resource = resource;
        this.inventoryType = resource as CollectableName;
    }

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.translate(this.x, this.y);
        context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        context.restore();
    }
}
