import { gameManager, useGameStateValue } from "#src/GameManager.tsx";
import "./components.css";
import messageBoxImageUrl from "#assets/ui_elements/MessageBlock.png";
import { useEffect, useRef } from "react";

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
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef && scrollRef.current) {
            scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
        }
    }, [messageList]);

    return (
        <div className="Message">
            <div ref={scrollRef} className="MessageContent">
                {messageList.map((message) => {
                    return (
                        <div className={"IndividualMessage"}>
                            {message.image && <img className={"MessageImage"} src={message.image} />}
                            <div className={"MessageText"}>{message.text}</div>
                        </div>
                    );
                })}
            </div>
            <img className={"MessageBG"} src={messageBoxImageUrl} />
        </div>
    );
};
