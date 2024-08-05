import {gameDomain} from "./domain";
import Container from "../../containers/container";
import {$boardChanged, $isContinueGameChanged, $isGameEndChanged, $scoreChanged} from "./events";
import {boardApiFactory} from "../../factory/game/boardApiFactory";
import {tileDtoFactory} from "../../factory/game/tileDtoFactory";
import {$isEndGame} from "./stores";
import {$totalScoreChanged} from "../home/events";

const boardService = Container.getBoardService();
const testEndService = Container.getTestGameService();
const boardApi = Container.getBoardApi();
const scoreApi = Container.getScoreApi();
const musicService = Container.getMusicService();


export const continueGameOnStartFx = gameDomain.createEffect(async () => {
    const boards = await boardApi.getBoards();
    if (boards != null) {
        const board = boards.b.map(r => r.map(tileDtoFactory));
        const positionBoard = boards.p.map(t => t.map(tileDtoFactory));
        boardService.continueGame(board, positionBoard);
        $boardChanged(boardService.getCopyBoard());
        $scoreChanged(boardService.getScore());
        $isContinueGameChanged(true);
        return true;
    }
    return false;
});

export const setEndGameActionsFx = gameDomain.createEffect(async () => {
    console.log("setEndGameActionsFx how many times")
    try {
        $isContinueGameChanged(false);
        const [_, score] = await Promise.all([
            boardApi.removeBoards(),
            scoreApi.setTotalScore({
                score: boardService.getScore()
            })
        ]);
        $totalScoreChanged(score)
    } catch (e) {
        console.log("setEndGameActionsFx error", e)
    }

});

export const setBoardApiFx = gameDomain.createEffect(async () => {
    if (!$isEndGame.getState())
        await boardApi.setBoards(boardApiFactory(boardService))
});


export const generateTileFx = gameDomain.createEffect(() => {
    const newBoard = boardService.generateTile();
    $boardChanged(newBoard);
})

export const removeAnimationsFx = gameDomain.createEffect(() => {
    boardService.removeClasses();
    $boardChanged(boardService.getCopyBoard());
})

export const setBoardFx = gameDomain.createEffect(() => {
    const isEndGame = testEndService.testEndGame(boardService.getCopyPositionBoard())
    $isGameEndChanged(isEndGame);
    if (boardService.positionChangedOrMerged()) musicService.playMergeMusic();
    $scoreChanged(boardService.getScore())
    $boardChanged(boardService.getCopyBoard());
})


export const resetGameFx = gameDomain.createEffect(() => {
    $isGameEndChanged(false);
    const newBoard = boardService.generateBoard();
    $boardChanged(newBoard);
})

export const resetScoreFx = gameDomain.createEffect(() => {
    $scoreChanged(0)
})