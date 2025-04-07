import { Howl } from "howler";

import bgmBiome1StartUrl from "#assets/bgm/Stage 1 BGM Start.mp3";
export const bgmBiome1Start = new Howl({ src: bgmBiome1StartUrl, loop: true });

import bgmBiome1Url from "#assets/bgm/Stage 1 BGM Loop.mp3";
export const bgmBiome1 = new Howl({ src: bgmBiome1Url, loop: true });
import bgmBiome2Url from "#assets/bgm/Stage 2 BGM Loop.mp3";
export const bgmBiome2 = new Howl({ src: bgmBiome2Url, loop: true });
import bgmBiome3Url from "#assets/bgm/Stage 3 BGM Loop.mp3";
export const bgmBiome3 = new Howl({ src: bgmBiome3Url, loop: true });
import bgmBiome4Url from "#assets/bgm/Stage 4 BGM Loop.mp3";
export const bgmBiome4 = new Howl({ src: bgmBiome4Url, loop: true });

export let currentBgm: Howl | undefined = undefined;

let currentBgmId: number | undefined;
export function switchBGM(newBGM: Howl) {
    if (newBGM == currentBgm) {
        return;
    }
    currentBgm?.fade(1, 0, 3000, currentBgmId);
    const currentTimestamp = currentBgm?.seek(currentBgmId);
    currentBgmId = newBGM.play();
    if (currentTimestamp !== undefined) {
        newBGM.seek(currentTimestamp, currentBgmId);
    }
    newBGM.fade(0, 1, 3000, currentBgmId);
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

import youDiedUrl from "#assets/fakesound_workspace/you_died.mp3";
export const youDied = new Howl({ src: youDiedUrl });

import propulsionUrl from "#assets/fakesound_workspace/propulsion.mp3";
export const propulsionSFX = new Howl({ src: propulsionUrl, volume: 0.3 });
