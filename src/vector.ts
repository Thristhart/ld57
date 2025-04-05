export interface Vector {
    x: number;
    y: number;
}
export function normalizeVector(vector: Vector): Vector {
    const l = length(vector);
    if (l === 0) {
        return { x: 0, y: 0 };
    }
    return {
        x: vector.x / l,
        y: vector.y / l,
    };
}

export function length(vector: Vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
}

export function scaleMut(vector: Vector, scalar: number) {
    vector.x *= scalar;
    vector.y *= scalar;
}

export function addMut(a: Vector, b: Vector) {
    a.x += b.x;
    a.y += b.y;
}

export function add(a: Vector, b: Vector) {
    return { x: a.x + b.x, y: a.y + b.y };
}

export function copyMut(a: Vector, b: Vector) {
    a.x = b.x;
    a.y = b.y;
}
