import {getValueCloudStorage, setValueCloudStorage} from "../../infrustructure/database/telegram_storage";
import {MAX_ENERGY} from "../../constants/energy";


interface EnergyApiDto {
    energy: number;
    maxEnergy: number;
    resetDate: Date;
}


export class EnergyApi {

    async getEnergy(): Promise<EnergyApiDto> {
        const result = (await getValueCloudStorage("energy")) as EnergyApiDto;
        return {
            energy: 0 ?? MAX_ENERGY,
            maxEnergy: result?.maxEnergy ?? MAX_ENERGY,
            resetDate: result?.resetDate ?? new Date(),
        } as EnergyApiDto
    }

    async setEnergy(energy: EnergyApiDto): Promise<void> {
        await setValueCloudStorage("energy", energy);
    }

}