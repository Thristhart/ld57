import { gameManager } from "./GameManager";
import { tick } from "./tick";

gameManager.forceUpdate();

function startGame() {
    tick();
}

startGame();
