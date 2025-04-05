import "./App.css";
import { DepthMeter, Fuel, HullIntegrity, Inventory, LightSwitch, UpgradeGUI } from "./ui/components";

function App({ loading }: { loading: boolean }) {
    return (
        <>
            <div className={"LeftUI"}>
                <DepthMeter />
                <HullIntegrity />
                <Fuel />
                <LightSwitch />
            </div>
            <canvas className={"Center"} width={1080} height={1920} />
            <div className={"RightUI"}>
                <Inventory />
                <UpgradeGUI />
            </div>
            {loading && <div className="LoadingSpinner">Loading...</div>}
        </>
    );
}

export default App;
