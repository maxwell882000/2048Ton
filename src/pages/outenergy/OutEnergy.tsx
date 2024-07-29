import {Score} from "../game/components/Score";
import {HomeButton} from "../../components/button/HomeButton";
import PlayAgainButton from "../../components/button/PlayAgain";
import React from "react";
import {EnergyOutIcon} from "../../components/icons/EnergyOutIcon";

export const OutEnergy = () => {
    const h = 13.541;
    const height = `h-[${h}/rem]`;
    const top = `top-[-${h / 2}rem]`;
    return <>
        <div className={`relative shadow-b-container bg-white w-[11.938rem] h-out  flex flex-col
                 justify-evenly  items-center  rounded-[1.313rem] `}>
            <div className={`absolute top-out  left-[-1.563rem]`}>
                <EnergyOutIcon></EnergyOutIcon>
            </div>
            <div className="h-[50%]"></div>
            <div className="flex flex-col items-center justify-between h-full pb-4">
                <div className="flex  flex-col justify-center items-center">
                    <Score style="lg"></Score>
                </div>
                <div className="flex space-x-2">
                    <HomeButton></HomeButton>
                    <PlayAgainButton></PlayAgainButton>
                </div>
            </div>
        </div>
    </>
}