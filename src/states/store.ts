import {app} from "./domain";
import {Nav, Pages} from "../constants/pages";
import {$gameStarted, $pageChanged} from "./events";
import {sample} from "effector";
import {AppStartGate} from "./gate";
import {loadGameDataFx, startGameFx} from "./effects";
import {resetGameFx} from "./game/effects";

export const $navigation = app.createStore<Nav>({
    page: Pages.START,
    params: null
})
    .on($pageChanged, (_, result) => {
        return result;
    })
sample({
    source: AppStartGate.open,
    target: [loadGameDataFx]
});


sample({
    source: $gameStarted,
    target: [startGameFx]
});

sample({
    source: startGameFx.doneData,
    filter: (isNewGame) => isNewGame,
    target: [resetGameFx]
})