import "./App.css";
import { gameManager } from "./GameManager";
import { onMouseMove } from "./input";
import { Fuel, Grabber, HullIntegrity, Inventory, LightSwitch, Message, UpgradeGUI, DepthMeter } from "./ui/components";

function App({ loading }: { loading: boolean }) {
    return (
        <div className={"AppCtn"}>
            <div className={"LeftUI"}>
                <DepthMeter />
                <HullIntegrity />
                <Fuel />
                <Message />
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
