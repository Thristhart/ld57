import { datingSim, chuthuluText, answerText } from "#src/datingtext.ts";
import { useState } from "react";
import styles from "./datingsim.module.scss";
import { gameManager } from "#src/GameManager.tsx";

export function DatingSimOverlay() {
    const [currentPrompt, setPrompt] = useState<string>("chuWhoDares");
    const answers = datingSim[currentPrompt];
    const playerUpgrade = gameManager.player.upgradeLevel;

    if (currentPrompt === "neutral" || currentPrompt === "bad" || currentPrompt === "good") {
        return (
            <div className={styles.DatingSimEnding}>
                <div className={styles.DatingPrompt}>{`The Creature: ${chuthuluText[currentPrompt].text}`}</div>
                <button
                    className={styles.ReplayButton}
                    onClick={() => {
                        location.href = location.href;
                    }}>
                    Replay
                </button>
            </div>
        );
    }
    return (
        <div className={styles.DatingSimOverlay}>
            <div className={styles.DatingPrompt}>{`The Creature: ${chuthuluText[currentPrompt].text}`}</div>
            {answers && <div className={styles.DatingAnswerInstructions}>{`Choose an answer:`}</div>}
            <div>
                {answers &&
                    answers.map((ans) => {
                        if (ans.subReq !== undefined && playerUpgrade !== ans.subReq) {
                            return null;
                        }
                        const answer = answerText[ans.answerKey];

                        return (
                            <div className={styles.DatingAnswer} onClick={() => setPrompt(ans.continues)}>
                                {answer.text}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
