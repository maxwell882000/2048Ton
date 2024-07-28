import {Container} from "../../../components/container/Container";
import {MoneyIcon} from "../../../components/icons/MoneyIcon";
import CountdownTimer from "./CountdownTimer";
import {LightingIcon} from "../../../components/icons/LightingIcon";
import {formatNumber} from "../../../utils/formatNumber";
import {useUnit} from "effector-react";
import {$energy, $totalScore} from "../../../states/home/stores";
import moment from "moment";

export const HomeContainer = () => {
    const [score, energy] = useUnit([$totalScore, $energy])
    return (
        <Container>
            <div className="flex flex-row justify-center items-center space-x-2">
                <div><MoneyIcon/></div>
                <div><span
                    className="text-[#7454FE] tracking-[0.1rem] text-[2.9rem]">{score ? formatNumber(score) : 0}</span>
                </div>

            </div>
            <div
                className="box-border h-[5.938rem] rounded-[1.938rem] flex flex-col justify-center items-center p-[0.875rem]  bg-[#D8FEFF]">
                <div className="flex flex-row justify-center items-center space-x-2 text-[#228AED]">
                    <LightingIcon></LightingIcon>
                    <span
                        className="text-[2.5rem]">{`${energy.energy.toString().padStart(2, '0')}/${energy.maxEnergy.toString().padStart(2, '0')}`}</span>
                </div>
                <CountdownTimer initialTime={energy.resetDate.diff(moment(), "seconds")}></CountdownTimer>
            </div>
        </Container>
    )
}