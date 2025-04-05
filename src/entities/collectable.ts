import { Entity } from "./entity";

export class Collectable extends Entity {
    public resource: string;
    public height: number;
    public width: number;
    public image: HTMLImageElement;

    constructor(resource: string, x: number, y: number, width: number, height: number, image: HTMLImageElement) {
        super(x, y);
        (this.width = width), (this.height = height);
        this.image = image;
        this.resource = resource;
    }

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.translate(this.x, this.y);
        context.drawImage(this.image, -this.width / 2, -this.height / 2);
        context.restore();
    }
}
