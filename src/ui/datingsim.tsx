import { datingSim, chuthuluText, answerText } from "#src/datingtext.ts";
import { useState } from "react";
import styles from "./datingsim.module.scss";
import { gameManager } from "#src/GameManager.tsx";
import classNames from "classnames";

export function DatingSimOverlay() {
    const [currentPrompt, setPrompt] = useState<string>("chuWhoDares");
    const answers = datingSim[currentPrompt];
    const playerUpgrade = gameManager.player.upgradeLevel;
    const hasCheckpoint = gameManager.checkpoints.length > 0;

    if (currentPrompt === "neutral" || currentPrompt === "bad" || currentPrompt === "good") {
        return (
            <div className={classNames(styles.DatingSimEnding, styles[currentPrompt])}>
                <div className={classNames(styles.EndingTitle, styles[`${currentPrompt}ending`])}>
                    {currentPrompt === "bad"
                        ? "BAD ENDING"
                        : currentPrompt === "neutral"
                        ? "NEUTRAL ENDING"
                        : "GOOD ENDING"}
                </div>
                <div
                    className={classNames(
                        styles.DatingPromptEnding
                    )}>{`The Creature: ${chuthuluText[currentPrompt].text}`}</div>
                {hasCheckpoint && (
                    <button className={styles.ReplayButton} onClick={() => gameManager.loadCheckpoint()}>
                        Load Checkpoint
                    </button>
                )}
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
        <div className={styles.DatingSimCtn}>
            <div className={styles.DatingSimOverlay}>
                <div className={styles.TextContainer}>
                    <div className={styles.DatingPromptCtn}>
                        <div className={styles.DatingPrompt}>{`The Creature: ${chuthuluText[currentPrompt].text}`}</div>
                    </div>
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
            </div>
        </div>
    );
}
