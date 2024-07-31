import Container from "../../containers/container";
import {homeDomain} from "./domain";
import {$energyChanged, $totalScoreChanged} from "./events";
import {EnergyDto} from "../../dtos/home/energyDto";
import moment from "moment";

//  end game
//  add to total score a game score
//  in the start of the game reduce energy
export const scoreApi = Container.getScoreApi();
export const energyApi = Container.getEnergyApi();
export const energyService = Container.getEnergyService();

export const resetEnergyFx = homeDomain.createEffect(async () => {
    energyService.resetEnergy();
    const energy = energyService.getEnergy();
    $energyChanged(energy);
    await energyApi.setEnergy({...energy, resetDate: energy.resetDate.toDate()});
})

export const getEnergyFx = homeDomain.createEffect(async (): Promise<EnergyDto> => {
    const energyApiDto = await energyApi.getEnergy();
    const energy = {...energyApiDto, resetDate: moment(energyApiDto.resetDate)} as EnergyDto;
    energyService.setEnergy(energy);
    console.log("getEnergyFx", energy);
    $energyChanged(energyService.getEnergy());
    return energy;
})

export const getScoreFx = homeDomain.createEffect(async () => {
    const score = await scoreApi.getTotalScore();
    $totalScoreChanged(score?.score);
});


export const reduceEnergyFx = homeDomain.createEffect(async () => {
    energyService.reduceEnergy();
    const energy = energyService.getEnergy();
    $energyChanged(energyService.getEnergy());
    await energyApi.setEnergy({...energy, resetDate: energy.resetDate.toDate()});
})