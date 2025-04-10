import { circleVsCircleCollision } from "#src/collision.ts";
import { gameManager } from "#src/GameManager.tsx";
import { collectablesMetadata } from "#src/startstate.ts";
import { addMut, copyMut, length, normalizeVector, scale, scaleMut, subtract } from "#src/vector.ts";
import { Entity } from "./entity";

export class Grabber extends Entity {
    public radius: number = 5;
    public shouldCollideWithWall = true;
    public bounceFactor = 0.1;
    public maxLength = 150;
    public retracting = false;
    public angle = 0;

    grabbedTarget: Entity | undefined = undefined;

    draw(context: CanvasRenderingContext2D): void {
        return;
    }
    tick(dt: number): void {
        super.tick(dt);

        if (this.retracting) {
            this.maxLength -= dt * 0.5;
        }

        const emitPoint = gameManager.player.grabberEmitPoint ?? gameManager.player;
        const playerDistanceVector = subtract(this, emitPoint);
        const distance = length(playerDistanceVector);
        if (distance > this.maxLength) {
            const newPosition = normalizeVector(playerDistanceVector);
            scaleMut(newPosition, this.maxLength);
            addMut(newPosition, emitPoint);
            copyMut(this, newPosition);
            this.velocity.x = 0;
            this.velocity.y = 0;
            gameManager.player.retractGrabber();
        }

        const pickupDistance = gameManager.player.radius / 2;
        if (this.maxLength <= pickupDistance || (this.velocity.x === 0 && distance < pickupDistance)) {
            // get collected
            gameManager.player.grabber = undefined;
            gameManager.deleteEntity(this);
            if (this.grabbedTarget?.inventoryType) {
                if (this.grabbedTarget.inventoryType.startsWith("cassette")) {
                    gameManager.deleteEntity(this.grabbedTarget);
                    const metadata = collectablesMetadata[this.grabbedTarget.inventoryType];
                    const seenMaterials = gameManager.getGameState("seenMaterials");
                    if (!seenMaterials.has(this.grabbedTarget.inventoryType)) {
                        seenMaterials.add(this.grabbedTarget.inventoryType);
                        gameManager.addGameStateMessage({ text: metadata.storyMessage, image: metadata.imageUrl });
                        gameManager.addGameStateSeenMaterial(this.grabbedTarget.inventoryType);
                    }
                } else {
                    const existingInventory = gameManager.getGameState("inventory");
                    const maxSize = gameManager.getUpgradedMaxValue("inventoryUpgradeLevel");
                    if (existingInventory.length >= maxSize) {
                        // do nothing
                    } else {
                        const newInventory = [...existingInventory];
                        newInventory.push(this.grabbedTarget.inventoryType);
                        gameManager.setGameState("inventory", newInventory);
                        gameManager.deleteEntity(this.grabbedTarget);
                    }
                    this.grabbedTarget = undefined;
                }
            }
        }
        if (this.grabbedTarget) {
            copyMut(this.grabbedTarget, this);
        } else {
            for (const ent of gameManager.getAllEntities()) {
                if (ent.children) {
                    for (const childEnt of ent.children) {
                        if (this.checkForGrab(childEnt)) {
                            return;
                        }
                    }
                }
                if (this.checkForGrab(ent)) {
                    return;
                }
            }
        }
    }
    checkForGrab(ent: Entity): boolean {
        if (!ent.grabbable) {
            return false;
        }
        if (circleVsCircleCollision(this, this.radius, ent, ent.radius)) {
            this.grabbedTarget = ent;
            return true;
        }
        return false;
    }
}
