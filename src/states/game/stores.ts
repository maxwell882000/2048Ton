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

// Finish out of energy page
// Rewards Page
// Reward For Subscribe to TG, X
// Button to connect to the wallet
// List available products that can be bought
// Redirect page when
// 1. More energy 2. Start with 8 3.
// Telegram ads


//
// Use Firestore
// Reads for checking referrals every hour, and then upload to repo
// Parse html to get referrals
// Reads for checking leaderboards every hour, and then upload to repo
// Parse html to get leaderboards
// calculate thoughrolly

export const $board = gameDomain.createStore<TileDto[][]>([])
    .on($boardChanged, (_, result) => result)
    .reset(GameGate.close);

export const $score = gameDomain.createStore<number>(0)
    .on($scoreChanged, (_, result) => result)
    .reset(GameGate.close);

export const $isEndGame = gameDomain.createStore<boolean>(false)
    .on($isGameEndChanged, (_, result) => result)
    .reset(GameGate.close);


sample({
    clock: $moveMade,
    source: $isEndGame,
    filter: (isEndGame) => !isEndGame,
    target: setBoardFx
})

sample({
    clock: delay(setBoardFx.doneData, moveDuration()),
    source: $isEndGame,
    filter: (isEndGame) => !isEndGame,
    target: generateTileFx,
})

sample({
    source: delay(generateTileFx.doneData, APPEAR_DURATION),
    target: removeAnimationsFx,
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
