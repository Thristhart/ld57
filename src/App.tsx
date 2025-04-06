import "./App.css";
import { gameManager } from "./GameManager";
import { onMouseMove } from "./input";
import { Fuel, Grabber, HullIntegrity, Inventory, LightSwitch, Message, UpgradeGUI, DepthMeter } from "./ui/components";

function App({ loading }: { loading: boolean }) {
    const gameState = gameManager.getAllGameState();
    const { currentDepth, hullPoints, fuelPoints, lightOn, inventory, upgrades, messageList } = gameState;

    const maxDepth = upgrades["depthUpgradeLevel"][gameState["depthUpgradeLevel"]].upgradeValue;
    const maxHullPoints = upgrades["hullUpgradeLevel"][gameState["hullUpgradeLevel"]].upgradeValue;
    const maxFuelPoints = upgrades["fuelUpgradeLevel"][gameState["fuelUpgradeLevel"]].upgradeValue;

    return (
        <div className={"AppCtn"}>
            <div className={"LeftUI"}>
                <DepthMeter currentDepth={currentDepth} maxDepth={maxDepth as number} />
                <HullIntegrity hullPoints={hullPoints} maxHullPoints={maxHullPoints as number} />
                <Fuel fuelPoints={Math.floor(fuelPoints)} maxFuelPoints={maxFuelPoints as number} />
                <Message messageList={messageList} />
            </div>
            <canvas
                className={"Center"}
                width={1080}
                height={1920}
                onPointerMove={onMouseMove}
                onClick={() => gameManager.click()}
            />
            <div className={"RightUI"}>
                <LightSwitch />
                <Grabber />
                <Inventory />
                <UpgradeGUI />
            </div>
            {loading && <div className="LoadingSpinner">Loading...</div>}
        </div>
    );
}

export default App;
