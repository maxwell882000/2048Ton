import React from "react";
import {Button} from "./Button";
import {HomeIcon} from "../icons/HomeIcon";
import {useUnit} from "effector-react";
import {$pageChanged} from "../../states/events";
import {Pages} from "../../constants/pages";

interface HomeButtonProps {
    width?: string
    children?: React.ReactNode;
    onClick?: () => void;
}

export const HomeButton = ({children, width = "w-[2.5em]", onClick}: HomeButtonProps) => {
    const [pageChanged] = useUnit([$pageChanged]);
    return <Button onClick={() => {
        if (onClick) {
            onClick();
        }
        pageChanged({
            page: Pages.HOME
        })
    }} width={width} height={"h-[2.5em]"}
                   fontSize={"text-[1rem]"}
                   color={"#FFDB0A"}
                   shadow={"shadow-b-button-orange"}>
        <div className="flex flex-row justify-center uppercase items-center space-x-1">
            <HomeIcon></HomeIcon>
            {children}
        </div>
    </Button>

}