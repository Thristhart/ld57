import { useRef } from "react";
import "./App.css";
import { gameManager } from "./GameManager";
import { TooltipRootProvider } from "./ui/Tooltip";
import { Inventory } from "./ui/inventory";
import { onMouseMove } from "./input";
import { Message, LightSwitch, Grabber } from "./ui/components";
import { DepthMeter, HullIntegrity, Fuel } from "./ui/meters";
import { UpgradeGUI } from "./ui/upgrades";
import { introParagraph } from "./startstate";
import { MuteButton } from "./ui/mutebutton";

function App({
    isIntro,
    loading,
    gameOver,
    hasCheckpoint,
}: {
    isIntro: boolean;
    loading: boolean;
    gameOver: boolean;
    hasCheckpoint: boolean;
}) {
    return (
        <div className={"AppCtn"}>
            <LeftUI />
            <canvas
                className={"Center"}
                width={1080}
                height={1920}
                onPointerMove={onMouseMove}
                onClick={() => gameManager.click()}
            />
            <RightUI />
            {isIntro && <Intro />}
            {loading && <div className="LoadingSpinner Overlay">Loading...</div>}
            {gameOver && <GameOver hasCheckpoint={hasCheckpoint} />}
        </div>
    );
}

function Intro() {
    return (
        <div className={"Intro Overlay"}>
            <div className={"IntroTitle"}>SUBSUME</div>
            <div className={"IntroParagraph"}>{introParagraph}</div>
            <button className={"PlayButton"} style={{ cursor: "pointer" }} onClick={gameManager.startGame}>
                Play
            </button>
        </div>
    );
}
function GameOver(props: { hasCheckpoint: boolean }) {
    return (
        <div className="GameOver Overlay">
            GAME OVER
            {props.hasCheckpoint && (
                <button style={{ cursor: "pointer" }} onClick={() => gameManager.loadCheckpoint()}>
                    Load Checkpoint
                </button>
            )}
            <button style={{ cursor: "pointer" }} onClick={() => (location.href = location.href)}>
                Restart
            </button>
        </div>
    );
}

function LeftUI() {
    return (
        <div className={"LeftUI"}>
            <DepthMeter />
            <HullIntegrity />
            <Fuel />
            <MuteButton />
            <Message />
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
