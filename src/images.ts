import library, { Outline } from "js-svg-path";

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

function loadVectorPaths(svgContents: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContents, "image/svg+xml");
    const vectorPaths: Outline[] = [];
    doc.querySelectorAll("path").forEach((path) => {
        vectorPaths.push(library.parse(path.getAttribute("d")!));
    });
    return vectorPaths;
}

import biome1WallsImageUrl from "../assets/Biome 1 - Curvy Walls.svg";
export const biome1WallsImage = loadImage(biome1WallsImageUrl);

import biome1WallVectorsUrl from "../assets/Biome 1 - Straight Hit Walls.svg?raw";
export const biome1WallVectors = loadVectorPaths(biome1WallVectorsUrl);

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
