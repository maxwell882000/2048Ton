import {Container} from "../../../components/container/Container";
import {MoneyIcon} from "../../../components/icons/MoneyIcon";
import CountdownTimer from "./CountdownTimer";
import {LightingIcon} from "../../../components/icons/LightingIcon";
import numeral from "numeral";

export const HomeContainer = () => {
    return (
        <Container>
            <div className="flex flex-row justify-center items-center space-x-2">
                <div><MoneyIcon/></div>
                <div><span
                    className="text-[#7454FE] tracking-[0.1rem] text-[2.9rem]">{numeral(421412412421).format('0.[000]a').toUpperCase()}</span>
                </div>

            </div>
            <div
                className="box-border h-[5.938rem] rounded-[1.938rem] flex flex-col justify-center items-center p-[0.875rem]  bg-[#D8FEFF]">
                <div className="flex flex-row justify-center items-center space-x-2 text-[#228AED]">
                    <LightingIcon></LightingIcon>
                    <span className="text-[2.5rem]">23/24</span>
                </div>
                <CountdownTimer initialTime={3600 * 2}></CountdownTimer>
            </div>
        </Container>
    )
}