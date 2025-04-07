import { gameManager } from "#src/GameManager.tsx";
import { Entity } from "./entity";

export class MessageEntity extends Entity {
    private duration = 5000;
    private color = "green";
    private text: string = "";
    constructor(x: number, y: number, text: string, color = "green", duration = 5000) {
        super(x, y);
        this.color = color;
        this.text = text;
        this.duration = duration;
    }
    draw(context: CanvasRenderingContext2D): void {
        const textMiddle = context.measureText(this.text).width / 2;

        context.strokeStyle = this.color;
        context.font = `bold 36pt "Jersey 25"`;
        context.fillStyle = this.color;
        context.fillText(this.text, this.x - textMiddle, this.y);
    }

    tick(dt: number): void {
        this.duration -= dt;
        if (this.duration <= 0) {
            gameManager.deleteEntity(this);
        }
    }
}
