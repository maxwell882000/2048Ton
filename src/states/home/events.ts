import {EnergyDto} from "../../dtos/home/energyDto";
import {homeDomain} from "./domain";

export const $totalScoreChanged = homeDomain.createEvent<number>();

export const $totalScoreIncreased = homeDomain.createEvent<number>();;

export const $energyChanged = homeDomain.createEvent<EnergyDto>();

