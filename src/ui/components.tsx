import { gameManager, useGameStateValue } from "#src/GameManager.tsx";
import "./components.css";
import messageBoxImageUrl from "#assets/ui_elements/MessageBlock.png";

export const LightSwitch = () => {
    const isLightOn = useGameStateValue("lightOn");
    const onChange = () => {
        gameManager.setGameState("lightOn", !isLightOn);
    };
    return (
        <div className="Light">
            Lights: <input checked={isLightOn} type="checkbox" onChange={onChange} />
        </div>
    );
};

export const Grabber = () => {
    return <div className="Grabber"></div>;
};

export const Message = () => {
    const messageList = useGameStateValue("messageList");
    return (
        <div className="Message">
            <div className="MessageContent">
                {messageList.map((message) => {
                    return <div className={"IndividualMessage"}>{message}</div>;
                })}
            </div>
            <img className={"MessageBG"} src={messageBoxImageUrl} />
        </div>
    );
};
