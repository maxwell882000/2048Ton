import React from "react";
import {MoneyIcon} from "../../../../components/icons/MoneyIcon";
import {LeaderboardDto} from "../../../../dtos/leaderboard/leaderboardDto";
import {ContainerItem} from "../ContainerItem";
import {formatNumber} from "../../../../utils/formatNumber";

interface LeaderProps {
    leader: LeaderboardDto,
    place: number
}

export const Leader = ({leader, place}: LeaderProps) => {
    return <ContainerItem>
        <div className="flex flex-col ">
            <span className="text-[1rem] font-[Hop] text-[#228AED] leading-[1rem] ">{leader.name}</span>
            <div className="flex flex-row items-center  space-x-1">
                <div>
                    <MoneyIcon width={15.6} height={17}></MoneyIcon>

                </div>
                <span className="text-[1.25rem] text-[#60CFFF]">
                                                    {formatNumber(leader.score, '0,0')}
                                                </span>
            </div>
        </div>
        <div>
            <span className="text-[1.5rem] text-[#228AED]">{place}</span>
        </div>
    </ContainerItem>
}