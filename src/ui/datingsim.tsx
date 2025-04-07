import { datingSim, chuthuluText, answerText } from "#src/datingtext.ts";
import { useState } from "react";
import styles from "./datingsim.module.scss";
import { gameManager } from "#src/GameManager.tsx";
import classNames from "classnames";

import finalBossImage from "#assets/final_boss.png";
export function DatingSimOverlay() {
    const [currentPrompt, setPrompt] = useState<string>("chuWhoDares");
    const answers = datingSim[currentPrompt];
    const playerUpgrade = gameManager.player.upgradeLevel;
    const hasCheckpoint = gameManager.checkpoints.length > 0;

    if (currentPrompt === "neutral" || currentPrompt === "bad" || currentPrompt === "good") {
        return (
            <div className={classNames(styles.DatingSimEnding, styles[currentPrompt])}>
                <div
                    className={classNames(
                        styles.DatingPrompt
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
                <img className={styles.FinalBossImage} height={500} width={500} src={finalBossImage} />
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
