import { useGameStateValue, useUpgradedMaxValue } from "#src/GameManager.tsx";
import React from "react";
import styles from "./meters.module.scss";

import depthMarkerImageUrl from "#assets/ui_elements/depthmarkeroutline.png";
import batteryImageUrl from "#assets/ui_elements/Battery.png";
import hullImageUrl from "#assets/ui_elements/hull_outline.png";
import classNames from "classnames";

export const DepthMeter = React.memo(() => {
    const currentDepth = useGameStateValue("currentDepth");
    const maxDepth = useUpgradedMaxValue("depthUpgradeLevel");
    const arrowPosition = Math.min(1, currentDepth / maxDepth) * 100;
    return (
        <div className={styles.DepthMeter}>
            <div className={classNames(styles.MeterHeader, styles.VerticalHeader)}>{`CURRENT DEPTH`} </div>
            <div className={styles.MeterContent}>
                <img className={styles.MeterBGImage} src={depthMarkerImageUrl} />
                <div className={styles.MeterCurrent}>
                    <div>{`${currentDepth} m`}</div>
                </div>
                <div className={styles.MeterInner}>
                    <div className={styles.MeterInnerPlace}>
                        <MeterArrow
                            className={styles.DepthArrow}
                            style={{
                                top: `calc(${arrowPosition}% - 30px)`,
                                color: arrowPosition > 70 ? "#ee69a9" : arrowPosition > 30 ? "#dfcb82" : "#68F8F8",
                            }}
                        />
                        <div className={styles.DepthCells}>
                            <div className={styles.DepthCell1}></div>
                            <div className={styles.DepthCell1}></div>
                            <div className={styles.DepthCell1}></div>
                            <div className={styles.DepthCell2}></div>
                            <div className={styles.DepthCell2}></div>
                            <div className={styles.DepthCell2}></div>
                            <div className={styles.DepthCell2}></div>
                            <div className={styles.DepthCell3}></div>
                            <div className={styles.DepthCell3}></div>
                            <div className={styles.DepthCell3}></div>
                        </div>
                    </div>
                    <div className={styles.DepthMax} data-warning={arrowPosition >= 100}>
                        <div className={styles.MaxMeterHeader}>{`MAX DEPTH`} </div>
                        <div>{`${maxDepth} m`}</div>
                    </div>
                </div>
            </div>
        </div>
    );
});

const MeterArrow = (props: { style: React.CSSProperties; className: string }) => {
    return (
        <svg width="65" height="61" viewBox="0 0 65 61" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M65 30.5L0 0V61L65 30.5Z" fill="currentColor" fillOpacity="1" />
        </svg>
    );
};

export const HullIntegrity = () => {
    const hullPoints = useGameStateValue("hullPoints");
    const maxHullPoints = useUpgradedMaxValue("hullUpgradeLevel");
    const percent = Math.floor((hullPoints / maxHullPoints) * 100);
    return (
        <div className={styles.HullIntegrity}>
            <div className={styles.HullHeader}>
                <div className={classNames(styles.MeterHeader, styles.HorizontalHeader)}>{`HULL INTEGRITY`} </div>
                <div className={styles.HullCount}>{`${Math.floor(hullPoints)}/${maxHullPoints}`}</div>
            </div>
            <div className={styles.HullContent}>
                <img className={styles.HullBG} src={hullImageUrl} />
                <div className={styles.HullFill}>
                    <div className={styles.HullFillAnchor}>
                        <div
                            className={classNames(
                                styles.HullFillInner,
                                percent > 70
                                    ? styles.HullInnerFill1
                                    : percent > 30
                                    ? styles.HullInnerFill2
                                    : styles.HullInnerFill3
                            )}
                            style={{
                                width: `${percent}%`,
                            }}
                        />
                    </div>
                </div>
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
