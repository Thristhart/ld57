import library from "js-svg-path";

const unloadedImages = new Set<HTMLImageElement>();

function loadImage(url: string) {
    const image = new Image() as HTMLImageElement & { bitmap: ImageBitmap };
    unloadedImages.add(image);
    image.addEventListener("load", async () => {
        image.bitmap = await createImageBitmap(image);
        unloadedImages.delete(image);
        if (unloadedImages.size === 0) {
            resolveImageLoad();
        }
    });
    image.addEventListener("error", () => {
        unloadedImages.delete(image);
    });
    image.src = url;
    return image;
}

function loadVectorPaths(vectorURL: string) {
    let paths = [];
    const step1 = vectorURL.split("path");
    step1.splice(0, 1);
    for (const string of step1) {
        paths.push(string.split('"')[1]);
    }
    let vectorPaths = [];
    for (const path of paths) {
        vectorPaths.push(library.parse(path));
    }
    return vectorPaths;
}

import wallsImageUrl from "../assets/walls.png";
export const wallsImage = loadImage(wallsImageUrl);

import wallsVectorUrl from "../assets/Walls - Spiky Stuff.svg?raw";
export const wallsVectors = loadVectorPaths(wallsVectorUrl);

import playerImage1Url from "../assets/sub/sub_level1.png";
export const playerImage1 = loadImage(playerImage1Url);

import playerImage2Url from "../assets/sub/sub_level2.png";
export const playerImage2 = loadImage(playerImage2Url);

import playerImage3Url from "../assets/sub/sub_level3.png";
export const playerImage3 = loadImage(playerImage3Url);

import redRectImageUrl from "../assets/collectable/red_rect.png";
export const redRectImage = loadImage(redRectImageUrl);

import backgroundImageUrl from "../assets/ocean_background.png";
export const backgroundImage = loadImage(backgroundImageUrl);

// minerals
import ironOreUrl from "../assets/ocean_objects/minerals/iron_ore.png";
export const ironOreImage = loadImage(ironOreUrl);

import fancyOreUrl from "../assets/ocean_objects/minerals/fancy_ore.png";
export const fancyOreImage = loadImage(fancyOreUrl);

import cobaltOreUrl from "../assets/ocean_objects/minerals/cobalt_ore.png";
export const cobaltOreImage = loadImage(cobaltOreUrl);

// fish
import cuteFish1ImageUrl from "../assets/ocean_objects/fish/cute_fish_1.png";
export const cuteFish1Image = loadImage(cuteFish1ImageUrl);

import creepyFish3Url from "../assets/ocean_objects/fish/creepy_fish_3.png";
export const creepyFish3Image = loadImage(creepyFish3Url);

import creepyFish4Url from "../assets/ocean_objects/fish/creepy_fish_4.png";
export const creepyFish4Image = loadImage(creepyFish4Url);

//eldritch
import eyeballUrl from "../assets/ocean_objects/eldritch/eyeball1.png";
export const eyeBallImage = loadImage(eyeballUrl);

import fleshMoteUrl from "../assets/ocean_objects/eldritch/flesh_mote1.png";
export const fleshMoteImage = loadImage(fleshMoteUrl);

let resolveImageLoad: () => void;
export const imageLoadPromise = new Promise<void>((resolve) => {
    resolveImageLoad = resolve;
});
