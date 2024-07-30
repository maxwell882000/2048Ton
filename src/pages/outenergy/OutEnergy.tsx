import {Score} from "../game/components/Score";
import {HomeButton} from "../../components/button/HomeButton";
import React from "react";
import {EnergyOutIcon} from "../../components/icons/EnergyOutIcon";

export const OutEnergy = () => {
    return (<div className={`relative shadow-b-container bg-white w-[11.938rem] h-[17rem] flex flex-col
                 justify-evenly  items-center  rounded-[1.313rem] `}>
        <div className={`absolute top-[-5.8rem] left-[-1.563rem]`}>
            <EnergyOutIcon></EnergyOutIcon>
        </div>
        <div className="h-[10%]"></div>
        <div className="flex flex-col items-center justify-evenly h-full pb-4 text-center">
            <div className="flex  flex-col justify-center items-center">
                <Score style="lg"></Score>
            </div>
            <div className={'w-[9.563rem] text-[#228AED] text-[1rem] leading-[1rem]'}>
                Energy Depleted All energy will be restored in 24 hours.
            </div>
            <div className="flex space-x-2">
                <HomeButton width={"w-[9.563rem]"}> <span>menu</span></HomeButton>
            </div>
        </div>
    </div>)
}