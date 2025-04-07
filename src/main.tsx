import { bgmBiome1Start, switchBGM } from "./audio";
import { prepareWallData } from "./collision";
import { gameManager } from "./GameManager";
import { imageLoadPromise } from "./images";
import { tick } from "./tick";

gameManager.forceUpdate();

async function startGame() {
    await imageLoadPromise;
    prepareWallData();
    gameManager.loading = false;
    gameManager.forceUpdate();
    switchBGM(bgmBiome1Start);
    requestAnimationFrame(tick);
}

startGame();
