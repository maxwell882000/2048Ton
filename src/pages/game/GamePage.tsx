import {useGame} from "../../hooks/game/useGame";
import React from "react";
import {Tile} from "./components/Tile";
import {Icon2048} from "../../components/icons/Icon2048";
import {Score} from "./components/Score";
import {EndGame} from "./components/EndGame";


const GamePage = () => {

    let {onTouchEnd, onTouchMove, onTouchStart, score, board, emptyBoard, isEndGame, setGame} = useGame();

    return (
        <>
            <div>
                <div
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    className={`absolute top-0 left-0 h-screen w-screen transition-opacity duration-1000 flex z-10 justify-center items-center  ${isEndGame ? 'opacity-100' : 'opacity-0'}`}>
                    <EndGame score={score} setGame={setGame}></EndGame>
                </div>
                <div
                    className={`absolute top-0 left-0 h-screen w-screen transition-opacity duration-1000 flex justify-center items-center  ${!isEndGame ? 'opacity-100' : 'opacity-0'}`}>

                    <div className="flex flex-col justify-center items-center space-y-4">

                        <Icon2048></Icon2048>
                        <div
                            className="shadow-b-container
                 rounded-[1.313rem]
                 bg-white w-[11.969rem] h-[4.5rem] flex flex-col
                 justify-center items-center">
                            <Score score={score} style="sm"></Score>
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