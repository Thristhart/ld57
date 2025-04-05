import "./App.css";
import { DepthMeter, Fuel, HullIntegrity, Inventory, LightSwitch, UpgradeGUI } from "./ui/components";

function App() {
    return (
        <>
            <div className={"LeftUI"}>
                <DepthMeter />
                <HullIntegrity />
                <Fuel />
                <LightSwitch />
            </div>
            <div className={"Center"}>
                <canvas />
            </div>
            <div className={"RightUI"}>
                <Inventory />
                <UpgradeGUI />
            </div>
        </>
    );
}

export default App;
