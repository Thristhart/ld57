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

import collision1Url from "#assets/fakesound_workspace/light_collision_1_reverb.mp3";
const collisionSFX1 = new Howl({ src: collision1Url, volume: 0.5 });
import collision2Url from "#assets/fakesound_workspace/light_collision_1.mp3";
const collisionSFX2 = new Howl({ src: collision2Url });

const collisionSounds = [collisionSFX1, collisionSFX2];
export function playCollisionSound() {
    const sound = collisionSounds[Math.floor(Math.random() * collisionSounds.length)];
    sound.play();
}
