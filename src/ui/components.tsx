import { gameManager, useGameStateValue, useUpgradedMaxValue } from "#src/GameManager.tsx";
import { JSX, useRef } from "react";
import "./components.css";
import { CollectableMetadata, Upgrade } from "#src/gametypes.ts";
import React from "react";
import { CollectableName, collectablesMetadata, upgrades } from "#src/startstate.ts";
import { ETooltipPosition, useTooltip } from "./Tooltip";

export const DepthMeter = React.memo(() => {
    const currentDepth = useGameStateValue("currentDepth");
    const maxDepth = useUpgradedMaxValue("depthUpgradeLevel");
    const arrowPosition = (currentDepth / maxDepth) * 95;
    return (
        <div className="DepthMeter">
            <div className="MeterHeader">{`CURRENT DEPTH`} </div>
            <div className="MeterContent">
                <div className="MeterCurrent">
                    <div>{`${currentDepth} m`}</div>
                </div>
                <img className={"MeterBGImage"} src={"./assets/ui_elements/DepthMarker.png"} />
                <MeterArrow
                    className={"MeterArrow"}
                    style={{ top: `calc(${arrowPosition}% - 30px)`, color: arrowPosition > 80 ? "red" : "#217B9C" }}
                />
                <div className="DepthMax">
                    <div>{`${maxDepth} m`}</div>
                </div>
            </div>
            <div className="MaxMeterHeader">{`MAX DEPTH`} </div>
        </div>
    );
});

const MeterArrow = (props: { style: React.CSSProperties; className: string }) => {
    return (
        <svg width="65" height="61" viewBox="0 0 65 61" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M65 30.5L0 0V61L65 30.5Z" fill="currentColor" fill-opacity="0.7" />
        </svg>
    );
};

export const HullIntegrity = () => {
    const hullPoints = useGameStateValue("hullPoints");
    const maxHullPoints = useUpgradedMaxValue("hullUpgradeLevel");
    const percent = Math.floor((hullPoints / maxHullPoints) * 95);
    return (
        <div className="HullIntegrity">
            <div className="MeterHeader">{`HULL INTEGRITY`} </div>
            <div className="MeterContent">
                <div className="MeterCurrent">
                    <div>{`${Math.floor(hullPoints)}/${maxHullPoints}`}</div>
                </div>
                <div className={"MeterFillCtn"}>
                    <div
                        className={"MeterFill"}
                        style={{ height: `${percent}%`, backgroundColor: percent < 20 ? "red" : "#217B9C" }}
                    />
                </div>
                <img className={"MeterBGImage"} src={"./assets/ui_elements/DepthMarker.png"} />
            </div>
        </div>
    );
};

export const Fuel = React.memo(() => {
    const fuelPoints = useGameStateValue("fuelPoints");
    const maxFuelPoints = useUpgradedMaxValue("fuelUpgradeLevel");
    const percent = Math.floor((fuelPoints / maxFuelPoints) * 95);
    return (
        <div className="Fuel">
            <div className="MeterHeader">{`FUEL`} </div>
            <div className="MeterContent">
                <div className="MeterCurrent">
                    <div>{`${Math.floor(fuelPoints)}/${maxFuelPoints}`}</div>
                </div>
                <div className={"MeterFillCtn"}>
                    <div
                        className={"MeterFill"}
                        style={{ height: `${percent}%`, backgroundColor: percent < 20 ? "red" : "#217B9C" }}
                    />
                </div>
                <img className={"MeterBGImage"} src={"./assets/ui_elements/DepthMarker.png"} />
            </div>
        </div>
    );
});

export const LightSwitch = () => {
    const isLightOn = useGameStateValue("lightOn");
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
    const messageList = useGameStateValue("messageList");
    return (
        <div className="Message">
            <div className="MessageContent">
                {messageList.map((message) => {
                    return <div className={"IndividualMessage"}>{message}</div>;
                })}
            </div>
            <img className={"MessageBG"} src={"./assets/ui_elements/MessageBlock.png"} />
        </div>
    );
};

const maxInventoryAmount = upgrades.inventoryUpgradeLevel[upgrades.inventoryUpgradeLevel.length - 1].upgradeValue;
export const Inventory = () => {
    const filledInventorySlot = useGameStateValue("inventory");
    const maxUpgradedInventory = gameManager.getUpgradedMaxValue("inventoryUpgradeLevel") as number;
    const nodes: JSX.Element[] = [];

    for (let i = 0; i < maxInventoryAmount; i++) {
        const inventoryItemName = filledInventorySlot[i] as CollectableName;
        if (inventoryItemName) {
            const metaData = collectablesMetadata[inventoryItemName];
            if (metaData) {
                nodes.push(<InventoryItem inventoryIndex={i} metadata={metaData} />);
                continue;
            }
        }

        nodes.push(<div className={i < maxUpgradedInventory ? "unlockedInventory" : "lockedInventory"}></div>);
    }

    return <div className={"inventoryCtn"}>{nodes}</div>;
};

const InventoryItem = (props: { inventoryIndex: number; metadata: CollectableMetadata }) => {
    const { inventoryIndex, metadata } = props;
    const { imageUrl, storyMessage, description, fuelPoints, hullPoints } = metadata;
    const ref = useRef<HTMLDivElement>(null);
    const tooltip = useTooltip(
        <div className={"itemTooltip"}>
            <div className={"itemDescription"}>{description}</div>
            {!!fuelPoints && (
                <div className={"inventoryAction"}>
                    <img height={20} width={16} src={"./assets/ui_elements/left_click.png"}></img>
                    <div className={"itemFuel"}>{`Add Fuel (${fuelPoints}) `}</div>
                </div>
            )}
            {!!hullPoints && (
                <div className={"inventoryAction"}>
                    <img height={20} width={16} src={"./assets/ui_elements/left_click.png"}></img>
                    <div className={"itemHull"}>{`Repair Hull (${hullPoints})`}</div>
                </div>
            )}
            <div>
                <div className={"inventoryAction"}>
                    <img height={20} width={16} src={"./assets/ui_elements/right_click.png"}></img>
                    <div>{`Delete`}</div>
                </div>
            </div>
        </div>,
        ref,
        ETooltipPosition.bottom
    );

    const fnShowTooltip = () => {
        tooltip.setIsVisible(true);
    };
    const fnHideTooltip = () => {
        tooltip.setIsVisible(false);
    };

    const removeItem = (ev: React.MouseEvent) => {
        const inventory = gameManager.getGameState("inventory");
        inventory.splice(inventoryIndex, 1);
        gameManager.setGameState("inventory", [...inventory]);
        ev.preventDefault();
    };

    const onClick = (ev: React.MouseEvent) => {
        if (hullPoints) {
            const currentHullPoints = gameManager.getGameState("hullPoints");
            const maxHullPoints = gameManager.getUpgradedMaxValue("hullUpgradeLevel");
            gameManager.setGameState("hullPoints", Math.min(currentHullPoints + hullPoints, maxHullPoints));
            removeItem(ev);
        } else if (fuelPoints) {
            const currentFuelPoints = gameManager.getGameState("fuelPoints");
            const maxFuelPoints = gameManager.getUpgradedMaxValue("fuelUpgradeLevel");
            gameManager.setGameState("fuelPoints", Math.min(currentFuelPoints + fuelPoints, maxFuelPoints));
            removeItem(ev);
        }
    };
    return (
        <div className={"unlockedInventory"}>
            <div
                onContextMenu={removeItem}
                onMouseEnter={fnShowTooltip}
                onClick={onClick}
                onMouseLeave={fnHideTooltip}
                ref={ref}
                className={"inventoryItem"}>
                {tooltip.tooltipContent}
                <img src={imageUrl} height={75} width={75} />
            </div>
        </div>
    );
};

export const UpgradeGUI = () => {
    const upgrades = useGameStateValue("upgrades");
    return (
        <div className={"UpgradesCtn"}>
            {/* <UpgradePath category="Fuel" upgrades={upgrades.fuelUpgradeLevel} />
            <UpgradePath category="Hull" upgrades={upgrades.hullUpgradeLevel} /> */}
            <UpgradePath category="Depth" upgrades={upgrades.depthUpgradeLevel} />
            <UpgradePath category="Inventory" upgrades={upgrades.inventoryUpgradeLevel} />
            {/* <UpgradePath category="Grabber" upgrades={upgrades.grabberUpgradeLevel} />
            <UpgradePath category="Light" upgrades={upgrades.lightUpgradeLevel} />
            <UpgradePath category="Speed" upgrades={upgrades.speedUpgradeLevel} /> */}
        </div>
    );
};

function UpgradePath(props: { category: string; upgrades: Upgrade[] }) {
    const { category, upgrades } = props;
    return (
        <div className={"UpgradeGroup"}>
            <div className={"UpgradeHeader"}>{category}</div>
            <div className="UpgradeList">
                {upgrades.map((upgrade, index) => {
                    if (upgrade.isVisible) {
                        return (
                            <div className={"UpgradeItem"}>
                                <div>{upgrade.description}</div>
                                <UpgradeMaterials materials={upgrade.materials} />
                            </div>
                        );
                    } else {
                        return (
                            <>
                                <LockedUpgrade />
                                {index !== upgrades.length - 1 && <div className={"UpgradePath"} />}
                            </>
                        );
                    }
                })}
            </div>
        </div>
    );
}

function LockedUpgrade() {
    return (
        <div className={"UpgradeItem"}>
            <img height={100} width={100} src={"./assets/ui_elements/skilltree_blocks/skilltree_block_locked.png"} />
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
