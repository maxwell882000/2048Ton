import {Button} from "./Button";
import React, {ReactNode} from "react";

interface LabelButtonProps {
    children: ReactNode;
    label: string;
    onClick?: () => void;
}

export const LabelButton = ({onClick, children, label}: LabelButtonProps) => {
    const textShadow = {
        textShadow: '0px 2px 0 rgba(0, 0, 0, 0.1)'
    }
    return <div className={"flex flex-col items-center"}>
        <Button
            onClick={onClick}
            width={"w-[7.375rem]"}
            color={"linear-gradient(-130deg, #C286FF  50%, #CC9AFE 50%)"}
            shadow={"shadow-b-button-label"}
        >
            {children}
        </Button>
        <span className={`text-white uppercase text-[1rem]`}
              style={textShadow}>
                      {label}
          </span>
    </div>
}