import { gameManager, useGameStateValue } from "#src/GameManager.tsx";
import { JSX, useEffect, useRef } from "react";
import "./components.css";
import { CollectableMetadata } from "#src/gametypes.ts";
import React from "react";
import { CollectableName, collectablesMetadata, upgrades } from "#src/startstate.ts";
import { ETooltipPosition, useTooltip } from "./Tooltip";
import styles from "./inventory.module.scss";

import leftClickImageUrl from "#assets/ui_elements/left_click.png";
import rightClickImageUrl from "#assets/ui_elements/right_click.png";

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
                nodes.push(<InventoryItem inventoryIndex={i} metadata={metaData} key={i} />);
                continue;
            }
        }

        nodes.push(
            <div
                key={i + "bg"}
                className={i < maxUpgradedInventory ? styles.unlockedInventory : styles.lockedInventory}></div>
        );
    }

    return (
        <div className={styles.InventorySection}>
            <div className={styles.InventoryHeader}>Inventory</div>
            <div className={styles.inventoryCtn}>{nodes}</div>
        </div>
    );
};

const InventoryItem = (props: { inventoryIndex: number; metadata: CollectableMetadata }) => {
    const { inventoryIndex, metadata } = props;
    const { imageUrl, storyMessage, fuelPoints, hullPoints, name } = metadata;

    // check if the user has seen this material before, if not push the story message
    useEffect(() => {
        const collectableName = name as CollectableName;
        const seenMaterials = gameManager.getGameState("seenMaterials");
        if (!seenMaterials.has(collectableName)) {
            seenMaterials.add(collectableName);
            gameManager.addGameStateMessage({ text: storyMessage, image: imageUrl });
            gameManager.addGameStateSeenMaterial(collectableName);
        }
    }, [name, storyMessage]);

    const ref = useRef<HTMLDivElement>(null);
    const tooltip = useTooltip(<InventoryTooltip metadata={metadata} />, ref, ETooltipPosition.bottom);

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
        <div className={styles.unlockedInventory}>
            <div
                onContextMenu={removeItem}
                onMouseEnter={fnShowTooltip}
                onClick={onClick}
                onMouseLeave={fnHideTooltip}
                ref={ref}
                className={styles.inventoryItem}>
                {tooltip.tooltipContent}
                <img src={imageUrl} height={75} width={75} />
            </div>
        </div>
    );
};

function InventoryTooltip(props: { metadata: CollectableMetadata }) {
    const { metadata } = props;
    const { description, fuelPoints, hullPoints } = metadata;
    return (
        <div className={styles.itemTooltip}>
            <div className={styles.itemDescription}>{description}</div>
            {!!fuelPoints && (
                <div className={styles.inventoryAction}>
                    <img height={20} width={16} src={leftClickImageUrl}></img>
                    <div className={styles.itemFuel}>{`Add Fuel (${fuelPoints}) `}</div>
                </div>
            )}
            {!!hullPoints && (
                <div className={styles.inventoryAction}>
                    <img height={20} width={16} src={leftClickImageUrl}></img>
                    <div className={styles.itemHull}>{`Repair Hull (${hullPoints})`}</div>
                </div>
            )}
            <div>
                <div className={styles.inventoryAction}>
                    <img height={20} width={16} src={rightClickImageUrl}></img>
                    <div>{`Delete`}</div>
                </div>
            </div>
        </div>
    );
}
