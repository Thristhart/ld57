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

import wallsImageUrl from "../assets/walls.png";
export const wallsImage = loadImage(wallsImageUrl);

import playerImage1Url from "../assets/sub/level1.png";
export const playerImage1 = loadImage(playerImage1Url);

let resolveImageLoad: () => void;
export const imageLoadPromise = new Promise<void>((resolve) => {
    resolveImageLoad = resolve;
});
