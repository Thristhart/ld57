import { useGameStateValue, useUpgradedMaxValue } from "#src/GameManager.tsx";
import React from "react";
import styles from "./meters.module.scss";

import depthMarkerImageUrl from "#assets/ui_elements/DepthMarker.png";
import batteryImageUrl from "#assets/ui_elements/Battery.png";
import classNames from "classnames";

export const DepthMeter = React.memo(() => {
    const currentDepth = useGameStateValue("currentDepth");
    const maxDepth = useUpgradedMaxValue("depthUpgradeLevel");
    const arrowPosition = (currentDepth / maxDepth) * 95;
    return (
        <div className={styles.DepthMeter}>
            <div className={classNames(styles.MeterHeader, styles.VerticalHeader)}>{`CURRENT DEPTH`} </div>
            <div className={styles.MeterContent}>
                <div className={styles.MeterCurrent}>
                    <div>{`${currentDepth} m`}</div>
                </div>
                <img className={styles.MeterBGImage} src={depthMarkerImageUrl} />
                <MeterArrow
                    className={styles.MeterArrow}
                    style={{ top: `calc(${arrowPosition}% - 30px)`, color: arrowPosition > 80 ? "red" : "#217B9C" }}
                />
                <div className={styles.DepthMax}>
                    <div>{`${maxDepth} m`}</div>
                </div>
            </div>
            <div className={styles.MaxMeterHeader}>{`MAX DEPTH`} </div>
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
        <div className={styles.HullIntegrity}>
            <div className={classNames(styles.MeterHeader, styles.HorizontalHeader)}>{`HULL INTEGRITY`} </div>
            <div className={styles.MeterContent}>
                <div className={styles.MeterCurrent}>
                    <div>{`${Math.floor(hullPoints)}/${maxHullPoints}`}</div>
                </div>
                <div className={styles.MeterFillCtn}>
                    <div
                        className={styles.MeterFill}
                        style={{ height: `${percent}%`, backgroundColor: percent < 20 ? "red" : "#217B9C" }}
                    />
                </div>
                <img className={styles.MeterBGImage} src={depthMarkerImageUrl} />
            </div>
        </div>
    );
};

export const Fuel = React.memo(() => {
    const fuelPoints = useGameStateValue("fuelPoints");
    const maxFuelPoints = useUpgradedMaxValue("fuelUpgradeLevel");
    const percent = Math.floor((fuelPoints / maxFuelPoints) * 95);
    return (
        <div className={styles.Fuel}>
            <div className={styles.FuelHeader}>
                <div className={classNames(styles.MeterHeader, styles.HorizontalHeader)}>{`FUEL`} </div>
                <div className={styles.FuelCount}>{`${Math.floor(fuelPoints)}/${maxFuelPoints}`}</div>
            </div>
            <div className={styles.Battery}>
                <div className={styles.FuelCells}>
                    <div
                        className={styles.FuelCell}
                        style={{
                            backgroundColor:
                                percent < 1
                                    ? "#5f7597"
                                    : percent > 60
                                    ? "#4dbeae"
                                    : percent > 20
                                    ? "#dfcb82"
                                    : "#EE69A9",
                        }}
                    />
                    <div
                        className={styles.FuelCell}
                        style={{
                            backgroundColor:
                                percent < 10
                                    ? "#5f7597"
                                    : percent > 60
                                    ? "#4dbeae"
                                    : percent > 20
                                    ? "#dfcb82"
                                    : "#EE69A9",
                        }}
                    />
                    <div
                        className={styles.FuelCell}
                        style={{
                            backgroundColor:
                                percent < 20
                                    ? "#5f7597"
                                    : percent > 60
                                    ? "#4dbeae"
                                    : percent > 20
                                    ? "#dfcb82"
                                    : "#EE69A9",
                        }}
                    />
                    <div
                        className={styles.FuelCell}
                        style={{ backgroundColor: percent < 30 ? "#5f7597" : percent > 60 ? "#4dbeae" : "#dfcb82" }}
                    />
                    <div
                        className={styles.FuelCell}
                        style={{ backgroundColor: percent < 40 ? "#5f7597" : percent > 60 ? "#4dbeae" : "#dfcb82" }}
                    />
                    <div
                        className={styles.FuelCell}
                        style={{ backgroundColor: percent < 50 ? "#5f7597" : percent > 60 ? "#4dbeae" : "#dfcb82" }}
                    />
                    <div
                        className={styles.FuelCell}
                        style={{ backgroundColor: percent < 60 ? "#5f7597" : percent > 60 ? "#4dbeae" : "#dfcb82" }}
                    />
                    <div
                        className={styles.FuelCell}
                        style={{ backgroundColor: percent < 70 ? "#5f7597" : "#4dbeae" }}
                    />
                    <div
                        className={styles.FuelCell}
                        style={{ backgroundColor: percent < 80 ? "#5f7597" : "#4dbeae" }}
                    />
                    <div
                        className={styles.FuelCell}
                        style={{ backgroundColor: percent < 90 ? "#5f7597" : "#4dbeae" }}
                    />
                </div>
                <img className={styles.BatteryBG} src={batteryImageUrl} />
            </div>
        </div>
    );
});
