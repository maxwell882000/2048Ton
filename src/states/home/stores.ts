import {homeDomain} from "./domain";
import {$energyChanged, $totalScoreChanged} from "./events";
import {EnergyDto} from "../../dtos/home/energyDto";
import moment from "moment";
import {sample} from "effector";
import {delay} from "patronum";
import {getEnergyFx, resetEnergyFx} from "./effects";

export const $totalScore = homeDomain.createStore<number>(0)
    .on($totalScoreChanged, (_, result) => result);

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
);

