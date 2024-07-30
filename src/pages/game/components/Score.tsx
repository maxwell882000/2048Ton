import {formatNumber} from "../../../utils/formatNumber";
import React from "react";
import {useUnit} from "effector-react";
import {$score} from "../../../states/game/stores";

interface ScoreProps {
    style: string;
}

export const Score = ({style}: ScoreProps) => {
    const [score] = useUnit([$score]);

    return (
        <>
            <div><span
                className={`
                ${style === "sm" && "text-[1rem]"} 
                ${style === "lg" && "text-[1.25rem]"}  
                text-[#60CFFF] uppercase`}>score</span>
            </div>
            <div className={`
                ${style === "sm" && " w-[7.75rem] h-[1.813rem] "} 
                ${style === "lg" && " w-[9.313rem] h-[2.188rem] "} 
                 bg-[#C2FDFF] text-center rounded-[2rem]`}>
                <div
                    className={`
                           ${style === "sm" && " leading-[1.813rem] "} 
                            ${style === "lg" && " leading-[2.188rem] "} 
                   text-[2rem] text-[#228AED] `}>{score ? formatNumber(score) : 0}</div>
            </div>
        </>
    )
}