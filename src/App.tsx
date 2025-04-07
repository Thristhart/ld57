import { useRef } from "react";
import "./App.css";
import { gameManager } from "./GameManager";
import { TooltipRootProvider } from "./ui/Tooltip";
import { Inventory } from "./ui/inventory";
import { onMouseMove } from "./input";
import { Message, Grabber } from "./ui/components";
import { DepthMeter, HullIntegrity, Fuel } from "./ui/meters";
import { UpgradeGUI } from "./ui/upgrades";
import { introParagraph } from "./startstate";
import { MuteButton } from "./ui/mutebutton";
import { ScuttleButton } from "./ui/scuttlebutton";
import { DatingSimOverlay } from "./ui/datingsim";

function App({
    isIntro,
    loading,
    gameOver,
    hasCheckpoint,
    isDatingSim,
}: {
    isIntro: boolean;
    loading: boolean;
    gameOver: boolean;
    hasCheckpoint: boolean;
    isDatingSim: boolean;
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
            {isDatingSim && <DatingSimOverlay />}
        </div>
    );
}

function Intro() {
    return (
        <div className={"Intro Overlay"}>
            <div className={"IntroContent"}>
                <div className={"IntroText"}>
                    <div className={"IntroParagraph"}>
                        Your trusted collegue, a brilliant scientist, had taken your joint project, the state of the art
                        EvoAdaptive SymbioSub, on a solo, deep sea, exploration trip.
                    </div>
                    <div className={"IntroParagraph"}>
                        Back in college, you two were roommates, the two of you dreamed about creating such a vessel.
                        After graduation, the two of you worked together for years in order to make those dreams into
                        reality. However, their impulsive nature led them to take the first working prototype on a joy
                        ride. That was a year ago. Building another one by yourself was a monumental endeavor, fueled by
                        rage and betrayal. You have your own EvoAdaptive SymbioSub now.
                    </div>
                    <div className={"IntroParagraph"}>
                        It is time to discover the fate of your partner and your shared dream.
                    </div>
                </div>
                <button className={"PlayButton"} style={{ cursor: "pointer" }} onClick={gameManager.startGame}></button>
            </div>
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
            <div className="LeftButtons">
                <MuteButton />
                <ScuttleButton />
            </div>
            <Message />
        </div>
    );
}

function RightUI() {
    const rootRef = useRef<HTMLDivElement>(null);
    return (
        <TooltipRootProvider rootRef={rootRef}>
            <div ref={rootRef} className={"RightUI"}>
                <Grabber />
                <Inventory />
                <UpgradeGUI />
            </div>
        </TooltipRootProvider>
    );
}

export default App;
