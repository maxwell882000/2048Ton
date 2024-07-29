import {app} from "./domain";
import {$pageChanged} from "./events";
import {gameDomain} from "./game/domain";
import {$energy} from "./home/stores";
import {Pages} from "../constants/pages";
import {getEnergyFx, getScoreFx, reduceEnergyFx} from "./home/effects";
import {continueGameOnStartFx} from "./game/effects";

// make variable to test locally or in prod
// make it impossible to save total result more than once in the game
export const loadGameDataFx = app.createEffect(async () => {
    try {
        const [, _, isContinue] = await Promise.all([
                getScoreFx(),
                getEnergyFx(),
                continueGameOnStartFx()
            ]
        )
        $pageChanged(isContinue ? Pages.GAME : Pages.HOME)
    } catch (e) {
        console.log(`GOT THE ERROR !!!! ${e}`)
    }

})

export const startGameFx = gameDomain.createEffect(async () => {
    const energy = $energy.getState();
    if (energy.energy >= 1) {
        $pageChanged(Pages.GAME)
        await reduceEnergyFx();
        return true;
    } else {
        $pageChanged(Pages.OUTENERGY)
    }
    return false;
});