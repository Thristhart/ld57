import { useEffect, useState } from "react";
import styles from "./scuttlebutton.module.scss";
import { gameManager } from "#src/GameManager.tsx";

export function ScuttleButton() {
    const [lastClickTime, setLastClickTime] = useState<number | undefined>(undefined);
    useEffect(() => {
        if (lastClickTime) {
            const timeout = setTimeout(() => {
                setLastClickTime(undefined);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [lastClickTime]);
    return (
        <button
            className={styles.ScuttleButton}
            onClick={() => {
                if (lastClickTime) {
                    gameManager.setGameState("hullPoints", 0);
                }
                setLastClickTime(performance.now());
            }}>
            {lastClickTime ? "sure? click again to scuttle" : "scuttle"}
        </button>
    );
}
