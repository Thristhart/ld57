const animations: AnimationDescription[] = [];

interface AnimationDescription {
    apply: (t: number) => void;
    duration: number;
    elapsed: number;
    resolve: () => void;
}
export async function animate(animationDescription: Omit<AnimationDescription, "elapsed" | "resolve">) {
    return new Promise<void>((resolve) => {
        animations.push({ ...animationDescription, elapsed: 0, resolve });
    });
}

export function tickAnimations(dt: number) {
    for (const anim of animations) {
        anim.elapsed += dt;
        if (anim.elapsed > anim.duration) {
            anim.elapsed = anim.duration;
        }
        anim.apply(anim.elapsed / anim.duration);
        if (anim.elapsed === anim.duration) {
            anim.resolve();
            animations.splice(animations.indexOf(anim));
        }
    }
}
