import { useEffect, useState } from "react";
import { Howler } from "howler";
import styles from "./mutebutton.module.scss";

import muteButtonImageUrl from "#assets/ui_elements/buttons/Mute button - click to mute.png";
import unmuteButtonImageUrl from "#assets/ui_elements/buttons/Mute button - click to unmute.png";

export function MuteButton() {
    const [muted, setMuted] = useState(false);
    useEffect(() => {
        Howler.mute(muted);
    }, [muted]);
    return (
        <button className={styles.MuteButton} onClick={() => setMuted((m) => !m)}>
            <img src={muted ? unmuteButtonImageUrl : muteButtonImageUrl} />
        </button>
    );
}
