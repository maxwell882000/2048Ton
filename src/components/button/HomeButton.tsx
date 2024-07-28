import React from "react";
import {Button} from "./Button";
import {HomeIcon} from "../icons/HomeIcon";
import {useUnit} from "effector-react";
import {$pageChanged} from "../../states/events";
import {Pages} from "../../constants/pages";


export const HomeButton = () => {
    const [pageChanged] = useUnit([$pageChanged]);
    return <Button onClick={() => pageChanged(Pages.HOME)} width={"w-[2.5em]"} height={"h-[2.5em]"}
                   fontSize={"text-[1rem]"}
                   color={"#FFDB0A"}
                   shadow={"shadow-b-button-orange"}>
        <div className="flex flex-row justify-center items-center"><HomeIcon></HomeIcon></div>
    </Button>

}