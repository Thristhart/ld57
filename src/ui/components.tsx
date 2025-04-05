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
    return (
        <div>
            Lights: <input type="checkbox" />
        </div>
    );
};

export const UpgradeGUI = () => {
    return <div>Upgrade ur shit here</div>;
};
