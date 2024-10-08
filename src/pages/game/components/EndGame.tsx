import {EndGameIcon} from "../../../components/icons/EndGameIcon";
import {Score} from "./Score";
import PlayAgainButton from "../../../components/button/PlayAgain";
import React from "react";
import {HomeButton} from "../../../components/button/HomeButton";
import {$resetGameStatesChanged} from "../../../states/game/events";
import {useUnit} from "effector-react";
import {$gameStarted} from "../../../states/events";

export const EndGame = () => {

    const [gameStarted, resetGameStatesChanged] = useUnit([$gameStarted, $resetGameStatesChanged])

    return (
        <>
            <div className=" relative shadow-b-container bg-white w-[11.938rem] h-[13.541rem] flex flex-col
                 justify-evenly  items-center  rounded-[1.313rem] ">
                <div className="absolute top-[-6.25rem] left-[-1.563rem]">
                    <EndGameIcon></EndGameIcon>
                </div>
                <div className="h-[50%]"></div>
                <div className="flex flex-col items-center justify-between h-full pb-4">
                    <div className="flex  flex-col justify-center items-center">
                        <Score style="lg"></Score>
                    </div>
                    <div className={`flex space-x-2 `}>
                        <HomeButton onClick={resetGameStatesChanged}></HomeButton>
                        <PlayAgainButton onClick={gameStarted}></PlayAgainButton>
                    </div>
                </div>
            </div>
        </>
    )
}