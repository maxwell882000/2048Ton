import React from "react";
import {Button} from "./Button";
import {CopyIcon} from "../icons/CopyIcon";

interface CopyButtonProps {
    width?: string
    children?: React.ReactNode;
    onClick?: () => void;
}

export const CopyButton = ({children, width = "w-[3.188rem]", onClick}: CopyButtonProps) => {
    return <Button onClick={() => {
        if (onClick) {
            onClick();
        }
    }} width={width} height={"h-[3.188rem]"}
                   fontSize={"text-[1rem]"}
                   color={"#FFDB0A"}
                   shadow={"shadow-b-button-orange"}>
        <div className="flex flex-row justify-center uppercase items-center space-x-1">
            <CopyIcon></CopyIcon>
            {children}
        </div>
    </Button>

}