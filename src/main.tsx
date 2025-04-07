import { bgmBiome1Start, switchBGM } from "./audio";
import { prepareWallData } from "./collision";
import { gameManager } from "./GameManager";
import { imageLoadPromise, wallsImage } from "./images";
import { tick } from "./tick";

gameManager.forceUpdate();

async function startGame() {
    await imageLoadPromise;
    prepareWallData();
    gameManager.loading = false;
    gameManager.forceUpdate();
    gameManager.setMaxPixelHeight(wallsImage.height);
    switchBGM(bgmBiome1Start);
    requestAnimationFrame(tick);
}

startGame();
