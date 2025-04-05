import { prepareWallData } from "./collision";
import { gameManager } from "./GameManager";
import { imageLoadPromise } from "./images";
import { tick } from "./tick";

gameManager.forceUpdate();

async function startGame() {
    await imageLoadPromise;
    prepareWallData();
    requestAnimationFrame(tick);
}

startGame();
