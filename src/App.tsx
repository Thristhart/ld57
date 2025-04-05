import "./App.css";
import { DepthMeter, Fuel, HullIntegrity, Inventory, LightSwitch, UpgradeGUI } from "./ui/components";

function App() {
    return (
        <div className={"App"}>
            <div className={"LeftUI"}>
                <DepthMeter />
                <HullIntegrity />
                <Fuel />
                <LightSwitch />
            </div>
            <div className={"Center"}>TOM YOU CAN HAVE THIS PART</div>
            <div className={"RightUI"}>
                <Inventory />
                <UpgradeGUI />
            </div>
        </div>
    );
}

export default App;
