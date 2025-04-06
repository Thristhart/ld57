import { Howl } from "howler";

import bgmBiome1Url from "#assets/fakesound_workspace/bgm near surface maybe.mp3";
export const bgmBiome1 = new Howl({ src: bgmBiome1Url, loop: true });
import bgmBiome2Url from "#assets/fakesound_workspace/bgm corrupted maybe.mp3";
export const bgmBiome2 = new Howl({ src: bgmBiome2Url, loop: true });

export let currentBgm: Howl | undefined = undefined;

export function switchBGM(newBGM: Howl) {
    currentBgm?.fade(1, 0, 500);
    newBGM.fade(0, 1, 500);
    const currentTimestamp = currentBgm?.seek();
    if (currentTimestamp !== undefined) {
        newBGM.seek(currentTimestamp);
    }
    newBGM.play();
}
