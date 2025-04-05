import library from "js-svg-path";

const unloadedImages = new Set<HTMLImageElement>();

function loadImage(url: string) {
    const image = new Image();
    unloadedImages.add(image);
    image.addEventListener("load", () => {
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
    console.log(step1);
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

import playerImage1Url from "../assets/sub/level1.png";
export const playerImage1 = loadImage(playerImage1Url);

import redRectImageUrl from "../assets/collectable/red_rect.png";
export const redRectImage = loadImage(redRectImageUrl);

import backgroundImageUrl from "../assets/ocean_background.png";
export const backgroundImage = loadImage(backgroundImageUrl);

let resolveImageLoad: () => void;
export const imageLoadPromise = new Promise<void>((resolve) => {
    resolveImageLoad = resolve;
});
