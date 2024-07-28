import {Moment} from "moment";

export interface EnergyDto {
    energy: number;
    maxEnergy: number;
    resetDate: Moment;
}