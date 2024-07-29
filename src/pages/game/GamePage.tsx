import {useMove} from "../../hooks/game/useMove";
import React from "react";
import {Tile} from "./components/Tile";
import {Icon2048} from "../../components/icons/Icon2048";
import {Score} from "./components/Score";
import {EndGame} from "./components/EndGame";
import {useGame} from "../../hooks/game/useGame";
import {GameGate} from "../../states/game/gate";


const GamePage = () => {
    let {onTouchEnd, onTouchMove, onTouchStart} = useMove();
    let {score, board, emptyBoard, isEndGame, gameReset} = useGame();
    return (
        <>
            <GameGate></GameGate>
            <div>
                <div
                    className={`absolute top-0 left-0 h-screen w-screen flex  justify-center items-center  transition-opacity duration-1000  ${isEndGame ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                    <EndGame gameReset={gameReset}></EndGame>
                </div>
                <div
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    className={`absolute top-0 left-0 h-screen w-screen transition-opacity duration-1000 flex justify-center items-center  ${!isEndGame ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                    <div className="flex flex-col justify-center items-center space-y-4">

                        <Icon2048></Icon2048>
                        <div
                            className="shadow-b-container
                                     rounded-[1.313rem]
                                     bg-white w-[11.969rem] h-[4.5rem] flex flex-col
                                     justify-center items-center">
                            <Score style="sm"></Score>
                        </div>
                        <div className="
                                    shadow-b-container
                                    bg-white
                                    rounded-[1.313rem] p-[0.75rem]
                                    w-[18.75rem] h-[18.75rem]"
                             style={{}}>
                            <div className="relative">
                                {emptyBoard.flatMap(r => r).map((row, r) => (
                                    <Tile key={row.uniqueId} tile={row}></Tile>
                                ))}
                                {board.flatMap(r => r).map((row, r) => (
                                    <Tile key={row.uniqueId} tile={row}></Tile>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default GamePage;