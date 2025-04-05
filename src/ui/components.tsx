import { gameManager } from "#src/GameManager.tsx";
import { JSX } from "react";
import "./components.css";

export const DepthMeter = () => {
    const currentDepth = gameManager.getGameState("currentDepth");
    const maxDepth = gameManager.getGameState("maxDepth");
    return (
        <div>
            <div>{`CURRENT DEPTH: ${currentDepth}m`} </div>
            <div>{`MAX DEPTH: ${maxDepth}m`} </div>
        </div>
    );
};

export const HullIntegrity = () => {
    const hullPoints = gameManager.getGameState("hullPoints");
    const maxHullPoints = gameManager.getGameState("maxHullPoints");

    return <div>{`Hull Integrity: ${hullPoints}/${maxHullPoints}`}</div>;
};

export const Fuel = () => {
    const fuelPoints = gameManager.getGameState("fuelPoints");
    const maxFuelPoints = gameManager.getGameState("maxFuelPoints");

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
    const maxInventory = gameManager.getGameState("maxInventorySlots");
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
    return <div>Upgrade ur shit here</div>;
};
