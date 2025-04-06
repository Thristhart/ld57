import { gameManager } from "#src/GameManager.tsx";
import { JSX } from "react";
import "./components.css";
import { Upgrade } from "#src/gametypes.ts";

export const DepthMeter = () => {
    const currentDepth = gameManager.getGameState("currentDepth");
    const maxDepth = gameManager.getUpgradedMaxValue("depthUpgradeLevel") as number;
    const arrowPosition = (currentDepth / maxDepth) * 95;
    return (
        <div className="DepthMeter">
            <div className="DepthHeader">{`CURRENT DEPTH`} </div>
            <div className="DepthContent">
                <div className="DepthCurrent">
                    <div>{`${currentDepth} m`}</div>
                </div>
                <img className={"DepthMeterBG"} src={"./assets/ui_elements/DepthMarker.png"} />
                <DepthArrow
                    className={"DepthArrow"}
                    style={{ top: `calc(${arrowPosition}% - 30px)`, color: arrowPosition > 80 ? "darkred" : "green" }}
                />
            </div>
        </div>
    );
};

export const DepthArrow = (props: { style: React.CSSProperties; className: string }) => {
    return (
        <svg width="65" height="61" viewBox="0 0 65 61" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M65 30.5L0 0V61L65 30.5Z" fill="currentColor" fill-opacity="0.7" />
        </svg>
    );
};

export const HullIntegrity = () => {
    const hullPoints = gameManager.getGameState("hullPoints");
    const maxHullPoints = gameManager.getUpgradedMaxValue("hullUpgradeLevel");

    return <div className="HullIntegrity">{`Hull Integrity: ${hullPoints}/${maxHullPoints}`}</div>;
};

export const Fuel = () => {
    const fuelPoints = gameManager.getGameState("fuelPoints");
    const maxFuelPoints = gameManager.getUpgradedMaxValue("fuelUpgradeLevel");

    return <div className="Fuel">{`Current Fuel: ${fuelPoints}/${maxFuelPoints}`}</div>;
};

export const LightSwitch = () => {
    const isLightOn = gameManager.getGameState("lightOn");
    const onChange = () => {
        gameManager.setGameState("lightOn", !isLightOn);
    };
    return (
        <div className="Light">
            Lights: <input checked={isLightOn} type="checkbox" onChange={onChange} />
        </div>
    );
};

export const Grabber = () => {
    return <div className="Grabber"></div>;
};

export const Message = () => {
    return <div className="Message"></div>;
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
