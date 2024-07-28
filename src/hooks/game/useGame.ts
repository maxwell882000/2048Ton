import Container from "../../containers/container";
import {useUnit} from "effector-react";
import {$board, $isEndGame, $score} from "../../states/game/stores";
import {$gameStarted} from "../../states/events";

//  change game logic so new tile will be generated only if positionalBoard is changed
//  if it is not changed there is no reason to add new tiles
export const useGame = () => {
    const boardService = Container.getBoardService();
    const [board,
        score,
        isEndGame,
        gameReset,
    ] = useUnit([
        $board,
        $score,
        $isEndGame,
        $gameStarted,
    ])

    return {
        score: score,
        board: board,
        emptyBoard: boardService.fillBoard(-1),
        isEndGame: isEndGame,
        gameReset: gameReset,
    }
    // save board and position after every move --> moved_event
    // when game is finished add to total result tg and send to firedatabase --> finished_event
    // clean board for board and positional
}