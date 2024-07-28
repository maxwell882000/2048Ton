import {MAX_ENERGY} from "../../constants/energy";
import {EnergyDto} from "../../dtos/home/energyDto";
import moment from "moment";

export class EnergyService {
    private energy: EnergyDto;

    constructor() {
        this.energy = {
            energy: 0,
            maxEnergy: MAX_ENERGY,
            resetDate: moment()
        };
    }

    increaseMaxEnergy(energy: number) {
        this.energy.maxEnergy = energy;
    }

    reduceEnergy() {
        if (this.energy.energy > 0)
            this.energy.energy -= 1;
    }

    resetEnergy() {
        this.energy.energy = this.energy.maxEnergy;
        this.energy.resetDate = moment().add(1, 'days');
    }

    checkEnergy(): boolean {
        return this.energy.energy > 0;
    }

    setEnergy(energy: EnergyDto) {
        this.energy = energy;
    }

    getEnergy(): EnergyDto {
        return {...this.energy};
    }
}