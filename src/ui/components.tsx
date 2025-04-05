import { gameManager } from "#src/GameManager.tsx";

export const Inventory = () => {
    return <div>Inventory BOX</div>;
};

export const DepthMeter = () => {
    return (
        <div>
            <div>{`CURRENT DEPTH: ${100}m`} </div>
            <div>{`MAX DEPTH: ${100}m`} </div>
        </div>
    );
};

export const HullIntegrity = () => {
    return <div>Current HP: 100</div>;
};

export const Fuel = () => {
    return <div>Current Fuel: 100</div>;
};

export const LightSwitch = () => {
    const isLightOn = gameManager.getGameState("lightOn");
    const onClick = () => {
        gameManager.setGameState("lightOn", !isLightOn);
    };
    return (
        <div>
            Lights: <input checked={isLightOn} type="checkbox" onClick={onClick} />
        </div>
    );
};

export const UpgradeGUI = () => {
    return <div>Upgrade ur shit here</div>;
};
