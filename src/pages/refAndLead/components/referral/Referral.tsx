import React from "react";
import {ContainerItem} from "../ContainerItem";
import {ReferralDto} from "../../../../dtos/referral/referralDto";
import {REFERRAL_REWARD} from "../../../../constants/game";

interface ReferralProps {
    referral: ReferralDto
}

export const Referral = ({referral}: ReferralProps) => {
    return <ContainerItem>
        <div className="flex flex-col ">
            <span className="text-[1rem] font-[Hop] text-[#228AED] leading-[1rem] ">{referral.name}</span>
        </div>
        <div>
            <span className="text-[1.5rem] text-[#FFB213]">{REFERRAL_REWARD}</span>
        </div>
    </ContainerItem>
}