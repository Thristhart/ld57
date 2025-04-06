import { useRef } from "react";
import "./App.css";
import { gameManager } from "./GameManager";
import { onMouseMove } from "./input";
import { Fuel, Grabber, HullIntegrity, Inventory, LightSwitch, Message, UpgradeGUI, DepthMeter } from "./ui/components";
import { TooltipRootProvider } from "./ui/Tooltip";

function App({ loading, gameOver }: { loading: boolean; gameOver: boolean }) {
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
            <RightUI />
            {loading && <div className="LoadingSpinner Overlay">Loading...</div>}
            {gameOver && (
                <div className="LoadingSpinner Overlay">
                    GAME OVER
                    <button onClick={() => (location.href = location.href)}>Retry</button>
                </div>
            )}
        </div>
    );
}

function RightUI() {
    const rootRef = useRef<HTMLDivElement>(null);
    return (
        <TooltipRootProvider rootRef={rootRef}>
            <div ref={rootRef} className={"RightUI"}>
                <LightSwitch />
                <Grabber />
                <Inventory />
                <UpgradeGUI />
            </div>
        </TooltipRootProvider>
    );
}

export default App;
