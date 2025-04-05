import { tick } from "./tick";
import { GameManager } from "./GameManager";

export const gameManager = new GameManager();
//gameManager.forceUpdate();

function startGame() {
    tick();
}

startGame();
