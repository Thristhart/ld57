import { gameManager } from "./GameManager";
import { tick } from "./tick";

gameManager.forceUpdate();

function startGame() {
    requestAnimationFrame(tick);
}

startGame();
