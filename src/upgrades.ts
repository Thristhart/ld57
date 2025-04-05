export interface Upgrade {
    upgradeType: string;
    upgradeValue: number | string;
    materials: { [matType: string]: number };
}

const upgrades: { [type: string]: Upgrade[] } = {
    fuel: [{ upgradeType: "fuel", upgradeValue: 200, materials: { copper: 2, sand: 1 } }],
    speed: [],
    hull: [],
    inventory: [],
    light: [],
    grabber: [],
};
