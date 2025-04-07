import { gameManager, useGameStateValue } from "#src/GameManager.tsx";
import { Upgrade, UpgradeType } from "#src/gametypes.ts";
import { useMemo, useRef } from "react";
import styles from "./upgrades.module.scss";
import classNames from "classnames";
import { CollectableName, collectablesMetadata } from "#src/startstate.ts";

import ownedImageUrl from "#assets/ui_elements/skilltree_blocks/skilltree_block_owned.png";
import unlockableImageUrl from "#assets/ui_elements/skilltree_blocks/skilltree_block_available.png";
import needsMaterialsImageUrl from "#assets/ui_elements/skilltree_blocks/skilltree_block_needsitems.png";
import lockedImageUrl from "#assets/ui_elements/skilltree_blocks/skilltree_block_locked.png";
import leftClickImageUrl from "#assets/ui_elements/left_click.png";

import { ETooltipPosition, useTooltip } from "./Tooltip";

const upgradeSize = 80;

export const UpgradeGUI = () => {
    const upgrades = useGameStateValue("upgrades");
    return (
        <div className={styles.Upgrades}>
            <div className={styles.UpgradeHeader}>Subsumable Upgrades</div>
            <div className={styles.UpgradesCtn}>
                <UpgradePath category="Depth" upgrades={upgrades.depthUpgradeLevel} upgradeKey={"depthUpgradeLevel"} />
                <UpgradePath
                    category="Inventory"
                    upgrades={upgrades.inventoryUpgradeLevel}
                    upgradeKey={"inventoryUpgradeLevel"}
                />
                <UpgradePath category="Fuel" upgrades={upgrades.fuelUpgradeLevel} upgradeKey={"fuelUpgradeLevel"} />
                <UpgradePath category="Hull" upgrades={upgrades.hullUpgradeLevel} upgradeKey={"hullUpgradeLevel"} />
                {/* <UpgradePath category="Grabber" upgrades={upgrades.grabberUpgradeLevel} />
            <UpgradePath category="Light" upgrades={upgrades.lightUpgradeLevel} />
            <UpgradePath category="Speed" upgrades={upgrades.speedUpgradeLevel} /> */}
            </div>
        </div>
    );
};

function UpgradePath(props: { category: string; upgrades: Upgrade[]; upgradeKey: UpgradeType }) {
    const { category, upgrades, upgradeKey } = props;
    return (
        <div className={styles.UpgradeGroup}>
            <div className={styles.UpgradeSectionHeader}>{category}</div>
            <div className={styles.UpgradeList}>
                {upgrades.map((upgrade, index) => (
                    <UpgradeItem
                        upgrade={upgrade}
                        index={index}
                        isLastUpgrade={index === upgrades.length - 1}
                        upgradeKey={upgradeKey}
                    />
                ))}
            </div>
        </div>
    );
}

function UpgradeItem(props: { upgrade: Upgrade; upgradeKey: UpgradeType; index: number; isLastUpgrade: boolean }) {
    const { upgrade, upgradeKey, index, isLastUpgrade } = props;
    const currentUpgradeLevel = useGameStateValue(upgradeKey);
    const seenMaterials = useGameStateValue("seenMaterials");
    const hasSeenAllMaterials = useMemo(() => {
        for (const material in upgrade.materials) {
            if (!seenMaterials.has(material as CollectableName)) {
                return false;
            }
        }
        return true;
    }, [seenMaterials]);

    if (index <= currentUpgradeLevel) {
        return (
            <>
                <PurchasedUpgrade upgradeMetadata={upgrade} index={index} />
                {!isLastUpgrade && <div className={styles.UpgradePath} />}
            </>
        );
    } else if (hasSeenAllMaterials && index === currentUpgradeLevel + 1) {
        return (
            <>
                <UnlockedUpgrade upgradeMetadata={upgrade} index={index} upgradeKey={upgradeKey} />
                {!isLastUpgrade && <div className={styles.UpgradePath} />}
            </>
        );
    } else {
        return (
            <>
                <LockedUpgrade />
                {!isLastUpgrade && <div className={styles.UpgradePath} />}
            </>
        );
    }
}

function PurchasedUpgrade(props: { upgradeMetadata: Upgrade; index: number }) {
    const { upgradeMetadata, index } = props;
    const ref = useRef<HTMLDivElement>(null);
    const tooltip = useTooltip(<PurchasedTooltip upgradeMetadata={upgradeMetadata} />, ref, ETooltipPosition.top);
    const fnShowTooltip = () => {
        tooltip.setIsVisible(true);
    };
    const fnHideTooltip = () => {
        tooltip.setIsVisible(false);
    };
    return (
        <div onMouseEnter={fnShowTooltip} onMouseLeave={fnHideTooltip} ref={ref} className={styles.UpgradeItem}>
            {tooltip.tooltipContent}
            <div className={styles.UnlockedIcon}>{index + 1}</div>
            <img height={upgradeSize} width={upgradeSize} src={ownedImageUrl} />
        </div>
    );
}

function UnlockedUpgrade(props: { upgradeMetadata: Upgrade; index: number; upgradeKey: UpgradeType }) {
    const { upgradeMetadata, index, upgradeKey } = props;
    const ref = useRef<HTMLDivElement>(null);
    const inventory = useGameStateValue("inventory");
    const hasMaterials = useMemo(() => {
        const { materials } = upgradeMetadata;
        for (const material in materials) {
            const countRequired = materials[material];
            const filter = inventory.filter((item) => item === material);
            if (filter.length < countRequired) {
                return false;
            }
        }
        return true;
    }, [inventory]);

    const onClick = () => {
        if (!hasMaterials) return;
        const materialsCopy = {
            ...upgradeMetadata.materials,
        };
        const newInventory: string[] = [];
        inventory.forEach((item) => {
            if (!materialsCopy[item]) {
                newInventory.push(item);
            } else {
                materialsCopy[item] = materialsCopy[item] - 1;
            }
        });
        gameManager.setGameState("inventory", newInventory);
        gameManager.setGameState(upgradeKey, index);
    };

    const tooltip = useTooltip(
        <UpgradeTooltip upgradeMetadata={upgradeMetadata} hasMaterials={hasMaterials} />,
        ref,
        ETooltipPosition.top
    );
    const fnShowTooltip = () => {
        tooltip.setIsVisible(true);
    };
    const fnHideTooltip = () => {
        tooltip.setIsVisible(false);
    };
    return (
        <div
            onClick={onClick}
            onMouseEnter={fnShowTooltip}
            onMouseLeave={fnHideTooltip}
            ref={ref}
            className={styles.UpgradeItem}>
            {tooltip.tooltipContent}
            <div className={styles.UnlockedIcon}>{index + 1}</div>
            <img
                className={classNames(styles.UpgradeCanUnlock, hasMaterials && styles.UpgradeHasMaterials)}
                src={unlockableImageUrl}
            />
            <img
                className={styles.UpgradeNeedsMaterials}
                height={upgradeSize}
                width={upgradeSize}
                src={needsMaterialsImageUrl}
            />
        </div>
    );
}

function LockedUpgrade() {
    return (
        <div className={styles.LockedUpgradeItem}>
            <img height={upgradeSize} width={upgradeSize} src={lockedImageUrl} />
        </div>
    );
}

function PurchasedTooltip(props: { upgradeMetadata: Upgrade }) {
    const { upgradeMetadata } = props;
    return <div className={styles.PurchasedTooltip}>{upgradeMetadata.description}</div>;
}

function UpgradeTooltip(props: { upgradeMetadata: Upgrade; hasMaterials: boolean }) {
    const { upgradeMetadata, hasMaterials } = props;
    const { materials } = upgradeMetadata;
    const materialKeys = Object.keys(materials);
    return (
        <div className={styles.UpgradeTooltipCtn}>
            <div className={styles.UpgradeTooltipDesc}>{upgradeMetadata.description}</div>
            <div className={styles.UpgradeTooltipMats}>
                {materialKeys.map((key) => {
                    const materialMetadata = collectablesMetadata[key as CollectableName];
                    const materialImage = materialMetadata.imageUrl;
                    return (
                        <div className={styles.MaterialCount}>
                            <img className={styles.MaterialImage} src={materialImage} /> x {materials[key]}
                        </div>
                    );
                })}
            </div>
            <div className={classNames(styles.UpgradeAction, !hasMaterials && styles.Disabled)}>
                <img height={20} width={16} src={leftClickImageUrl}></img>
                <div className={styles.itemHull}>Upgrade</div>
            </div>
        </div>
    );
}
