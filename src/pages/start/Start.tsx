import {Icon2048} from "../../components/icons/Icon2048";
import React from "react";
import {AppStartGate} from "../../states/gate";

export const Start = () => {
    return <>
        <AppStartGate></AppStartGate>
        <div className="flex flex-col justify-between items-center h-screen">
            <div className="w-full"></div>
            <div className="text-lg">
                <Icon2048 className="w-[12.813rem] h-[6.938rem]"></Icon2048>
            </div>

            <span className="text-white">Loading...</span>
        </div>
    </>
}