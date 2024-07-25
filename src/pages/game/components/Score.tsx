import {formatNumber} from "../../../utils/formatNumber";
import React from "react";

interface ScoreProps {
    score: number;
    style: string;
}

export const Score = ({score, style}: ScoreProps) => {
    return (
        <>
            <div><span
                className={`
                ${style === "sm" && "text-[1rem]"} 
                ${style === "lg" && "text-[1.25rem]"}  
                text-[#60CFFF]`}>SCORE</span>
            </div>
            <div className={`
                ${style === "sm" && " w-[7.75rem] h-[1.813rem] "} 
                ${style === "lg" && " w-[9.313rem] h-[2.188rem] "} 
                 bg-[#C2FDFF] text-center rounded-[2rem]`}>
                <div
                    className={`
                           ${style === "sm" && " leading-[1.813rem] "} 
                            ${style === "lg" && " leading-[2.188rem] "} 
                    text-[1.438rem] text-[#228AED] `}>{score ? formatNumber(score) : 0}</div>
            </div>
        </>
    )
}