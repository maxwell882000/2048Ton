import {homeDomain} from "./domain";
import {$energyChanged, $totalScoreChanged, $totalScoreIncreased} from "./events";
import {EnergyDto} from "../../dtos/home/energyDto";
import moment from "moment";
import {sample} from "effector";
import {delay} from "patronum";
import {getEnergyFx, resetEnergyFx} from "./effects";
import {$isGameEndChanged, $scoreChanged} from "../game/events";

export const $totalScore = homeDomain.createStore<number>(0)
    .on($totalScoreChanged, (_, result) => result)
    .on($totalScoreIncreased, (state, result) => state + result);

export const $energy = homeDomain.createStore<EnergyDto>({
    energy: 0,
    maxEnergy: 0,
    resetDate: moment().add(1, "day")
})
    .on($energyChanged, (_, result) => result);


sample(
    {
        source: delay(getEnergyFx.doneData, (result) =>
            result.resetDate.diff(moment(), 'milliseconds') < 0 ? 0 :
                result.resetDate.diff(moment(), 'milliseconds')),
        target: resetEnergyFx
    }
)

sample({
    clock: $isGameEndChanged,
    source: $scoreChanged,
    filter: (score, isEndGame) => isEndGame,
    fn: (score) => score,
    target: $totalScoreIncreased
})


