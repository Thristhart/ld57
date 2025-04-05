import "./App.css";
import { DepthMeter, Fuel, HullIntegrity, Inventory, LightSwitch, UpgradeGUI } from "./ui/components";

function App() {
    return (
        <div id={"App"} className={"App"}>
            <div className={"LeftUI"}>
                <DepthMeter />
                <HullIntegrity />
                <Fuel />
                <LightSwitch />
            </div>
            <canvas className={"Center"}></canvas>
            <div className={"RightUI"}>
                <Inventory />
                <UpgradeGUI />
            </div>
        </div>
    );
}

export default App;
