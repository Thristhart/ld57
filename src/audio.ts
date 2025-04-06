import { Howl } from "howler";

import bgmBiome1Url from "#assets/fakesound_workspace/bgm near surface maybe.mp3";
export const bgmBiome1 = new Howl({ src: bgmBiome1Url, loop: true });
import bgmBiome2Url from "#assets/fakesound_workspace/bgm corrupted maybe.mp3";
export const bgmBiome2 = new Howl({ src: bgmBiome2Url, loop: true });

export let currentBgm: Howl | undefined = undefined;

export function switchBGM(newBGM: Howl) {
    if (newBGM == currentBgm) {
        return;
    }
    currentBgm?.fade(1, 0, 5000);
    newBGM.fade(0, 1, 5000);
    const currentTimestamp = currentBgm?.seek();
    if (currentTimestamp !== undefined) {
        newBGM.seek(currentTimestamp);
    }
    newBGM.play();
    currentBgm = newBGM;
}

import pressureDamageSFX1Url from "#assets/fakesound_workspace/four_seconds_of_metallic_pain.mp3";
export const pressureDamageSFX1 = new Howl({ src: pressureDamageSFX1Url });

import pressureDamageSFX2Url from "#assets/fakesound_workspace/creaky_hull_2.mp3";
export const pressureDamageSFX2 = new Howl({ src: pressureDamageSFX2Url, volume: 0.2 });
