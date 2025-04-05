import { gameManager, Upgrade } from "#src/GameManager.tsx";
import { JSX } from "react";
import "./components.css";

export const DepthMeter = () => {
    const currentDepth = gameManager.getGameState("currentDepth");
    const maxDepth = gameManager.getUpgradedMaxValue("depthUpgradeLevel");
    return (
        <div>
            <div>{`CURRENT DEPTH: ${currentDepth}m`} </div>
            <div>{`MAX DEPTH: ${maxDepth}m`} </div>
        </div>
    );
};

export const HullIntegrity = () => {
    const hullPoints = gameManager.getGameState("hullPoints");
    const maxHullPoints = gameManager.getUpgradedMaxValue("hullUpgradeLevel");

    return <div>{`Hull Integrity: ${hullPoints}/${maxHullPoints}`}</div>;
};

export const Fuel = () => {
    const fuelPoints = gameManager.getGameState("fuelPoints");
    const maxFuelPoints = gameManager.getUpgradedMaxValue("fuelUpgradeLevel");

    return <div>{`Current Fuel: ${fuelPoints}/${maxFuelPoints}`}</div>;
};

export const LightSwitch = () => {
    const isLightOn = gameManager.getGameState("lightOn");
    const onChange = () => {
        gameManager.setGameState("lightOn", !isLightOn);
    };
    return (
        <div>
            Lights: <input checked={isLightOn} type="checkbox" onChange={onChange} />
        </div>
    );
};

export const Inventory = () => {
    const inventorySlots = gameManager.getGameState("inventory");
    const maxInventory = gameManager.getUpgradedMaxValue("inventoryUpgradeLevel") as number;
    const nodes: JSX.Element[] = [];
    for (let i = 0; i < maxInventory; i++) {
        nodes.push(
            <div key={i} className={"inventorySlot"}>
                {inventorySlots[i] ?? ""}
            </div>
        );
    }

    return <div className={"inventoryCtn"}>{nodes}</div>;
};

export const UpgradeGUI = () => {
    const upgrades = gameManager.getGameState("upgrades");
    return (
        <div>
            <UpgradePath category="Fuel" upgrades={upgrades.fuelUpgradeLevel} />
            <UpgradePath category="Hull" upgrades={upgrades.hullUpgradeLevel} />
            <UpgradePath category="Depth" upgrades={upgrades.depthUpgradeLevel} />
            <UpgradePath category="Inventory" upgrades={upgrades.inventoryUpgradeLevel} />
            <UpgradePath category="Grabber" upgrades={upgrades.grabberUpgradeLevel} />
            <UpgradePath category="Light" upgrades={upgrades.lightUpgradeLevel} />
            <UpgradePath category="Speed" upgrades={upgrades.speedUpgradeLevel} />
        </div>
    );
};

function UpgradePath(props: { category: string; upgrades: Upgrade[] }) {
    const { category, upgrades } = props;
    return (
        <div className={"UpgradeGroup"}>
            <div>{category}</div>
            <div className="UpgradeList">
                {upgrades.map((upgrade) => {
                    if (upgrade.isVisible) {
                        return (
                            <div className={"UpgradeItem"}>
                                <div>{upgrade.description}</div>
                                <UpgradeMaterials materials={upgrade.materials} />
                            </div>
                        );
                    } else {
                        return <div className={"UpgradeItem"}>?</div>;
                    }
                })}
            </div>
        </div>
    );
}

function UpgradeMaterials(props: { materials: { [materialType: string]: number } }) {
    const mats = Object.keys(props.materials);
    if (!mats.length) {
        return null;
    }
    return (
        <div className={"MaterialsList"}>
            <div>Materials:</div>
            {mats.map((matName) => {
                return (
                    <div>
                        <span>{matName}: </span>
                        <span>x</span>
                        <span>{props.materials[matName]}</span>
                    </div>
                );
            })}
        </div>
    );
}
