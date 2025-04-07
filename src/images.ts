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

import biome2WallsImageUrl from "../assets/level walls/Biome 2 - Curvy Walls.svg";
export const biome2WallsImage = loadImage(biome2WallsImageUrl);

import biome2WallVectorsUrl from "../assets/level walls/Biome 2 - Straight Hit Walls.svg?raw";
export const biome2WallVectors = loadVectorPaths(biome2WallVectorsUrl);

import biome3WallsImageUrl from "../assets/level walls/Biome 3 - Curvy Walls.svg";
export const biome3WallsImage = loadImage(biome3WallsImageUrl);

import biome3WallVectorsUrl from "../assets/level walls/Biome 3 - Straight Hit Walls.svg?raw";
export const biome3WallVectors = loadVectorPaths(biome3WallVectorsUrl);

import biome4WallsImageUrl from "../assets/level walls/Biome 4 - Straight Hit Walls.svg";
export const biome4WallsImage = loadImage(biome4WallsImageUrl);

import biome4WallVectorsUrl from "../assets/level walls/Biome 4 - Straight Hit Walls.svg?raw";
export const biome4WallVectors = loadVectorPaths(biome4WallVectorsUrl);

import playerImage1Url from "../assets/sub/sub_level1.png";
export const playerImage1 = loadImage(playerImage1Url);

import playerImage2Url from "../assets/sub/sub_level2.png";
export const playerImage2 = loadImage(playerImage2Url);

import playerImage3Url from "../assets/sub/sub_level3.png";
export const playerImage3 = loadImage(playerImage3Url);

import redRectImageUrl from "../assets/collectable/red_rect.png";
export const redRectImage = loadImage(redRectImageUrl);

import backgroundImageUrl from "../assets/ocean_backgrounds/oceanbg_top1.png";
export const backgroundImage = loadImage(backgroundImageUrl);

import backgroundImageLoop1Url from "../assets/ocean_backgrounds/oceanbg_loop1.png";
export const backgroundImageLoop1 = loadImage(backgroundImageLoop1Url);

import backgroundImageLoop2Url from "../assets/ocean_backgrounds/oceanbg_loop2.png";
export const backgroundImageLoop2 = loadImage(backgroundImageLoop2Url);

import backgroundImageBossUrl from "../assets/ocean_backgrounds/oceanbg_bottombossbase.png";
export const backgroundImageBoss = loadImage(backgroundImageBossUrl);

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
import eyeballUrl from "../assets/ocean_objects/eldritch/eyeball.png";
export const eyeBallImage = loadImage(eyeballUrl);

import fleshMoteUrl from "../assets/ocean_objects/eldritch/flesh_mote.png";
export const fleshMoteImage = loadImage(fleshMoteUrl);

import tentacleUrl from "../assets/ocean_objects/eldritch/alienbiome_tentacle_plant.png";
export const tentacleImage = loadImage(tentacleUrl);

import cassetteUrl from "../assets/ocean_objects/story/cassette_1.png";
export const cassetteImage = loadImage(cassetteUrl);

import claw1Url from "../assets/sub/sub_claw_level1.png";
export const claw1Image = loadImage(claw1Url);
import claw2Url from "../assets/sub/sub_claw_level2.png";
export const claw2Image = loadImage(claw2Url);
import claw3Url from "../assets/sub/sub_claw_level3.png";
export const claw3Image = loadImage(claw3Url);

let resolveImageLoad: () => void;
export const imageLoadPromise = new Promise<void>((resolve) => {
    resolveImageLoad = resolve;
});
