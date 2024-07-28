import {app} from "./domain";
import {$pageChanged} from "./events";
import {gameDomain} from "./game/domain";
import {$energy} from "./home/stores";
import {Pages} from "../constants/pages";
import {getEnergyFx, getScoreFx} from "./home/effects";
import {continueGameOnStartFx} from "./game/effects";

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
    console.log("startGameFx MADED ", energy)
    if (energy.energy >= -1000) {

        $pageChanged(Pages.GAME)
        // await reduceEnergyFx()
    } else {
        $pageChanged(Pages.OUTENERGY)
    }
});