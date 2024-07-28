import {gameDomain} from "./domain";
import {TileDto} from "../../dtos/game/tileDto";
import {$boardChanged, $isGameEndChanged, $moveMade, $scoreChanged} from "./events";
import {sample} from "effector";
import {GameGate} from "./gate";
import {
    generateTileFx,
    removeAnimationsFx,
    resetGameFx,
    resetScoreFx,
    setBoardApiFx,
    setBoardFx,
    setEndGameActionsFx
} from "./effects";
import {debounce, delay} from "patronum";
import {moveDuration} from "../../utils/moveDuration";
import {APPEAR_DURATION, RESET_GAME_DURATION, SYNC_GAME} from "../../constants/game";

export const $board = gameDomain.createStore<TileDto[][]>([])
    .on($boardChanged, (_, result) => result);

export const $score = gameDomain.createStore<number>(0)
    .on($scoreChanged, (_, result) => result);

export const $isEndGame = gameDomain.createStore<boolean>(false)
    .on($isGameEndChanged, (_, result) => result);


sample({
    source: GameGate.close,
    target: resetScoreFx
});

sample({
    clock: $moveMade,
    source: $isEndGame,
    filter: (isEndGame) => !isEndGame,
    target: setBoardFx
})

sample({
    source: delay(setBoardFx.doneData, moveDuration()),
    target: generateTileFx,
})

sample({
    source: delay(generateTileFx.doneData, APPEAR_DURATION),
    target: removeAnimationsFx,
})

sample({
    source: GameGate.close,
    target: resetScoreFx,
})

sample({
    source: delay(resetGameFx.doneData, RESET_GAME_DURATION),
    target: resetScoreFx,
})

sample({
    source: debounce($boardChanged, SYNC_GAME),
    target: setBoardApiFx
})

sample({
    source: $isGameEndChanged,
    filter: (result) => result,
    target: setEndGameActionsFx
})
//
// sample({
//     source: continueGameOnStartFx.doneData,
//     filter: (isContinued) => !isContinued,
//     target: resetGameFx
// })
