import {EndGameIcon} from "../../../components/icons/EndGameIcon";
import {Score} from "./Score";
import PlayAgainButton from "../../../components/button/PlayAgain";
import React from "react";
import {HomeButton} from "../../../components/button/HomeButton";

interface EndGameProps {
    score: number
    setGame: () => void
}

export const EndGame = ({score, setGame}: EndGameProps) => {
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
                        <Score score={score} style="lg"></Score>
                    </div>
                    <div className="flex space-x-2">
                        <PlayAgainButton onClick={setGame}></PlayAgainButton>
                        <HomeButton></HomeButton>
                    </div>
                </div>
            </div>
        </>
    )
}