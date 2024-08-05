import React from "react";
import {ContainerItem} from "../ContainerItem";
import {ReferralDto} from "../../../../dtos/referral/referralDto";
import {REFERRAL_REWARD} from "../../../../constants/game";
import OrangeButton from "../../../../components/button/OrangeButton";
import {formatNumber} from "../../../../utils/formatNumber";
import {$referralRewardAccepted} from "../../../../states/referral/events";
import {useUnit} from "effector-react";

interface ReferralProps {
    referral: ReferralDto
}

export const Referral = ({referral}: ReferralProps) => {
    const [referralRewardAccepted] = useUnit([$referralRewardAccepted])
    return <ContainerItem>
        <div className="flex flex-col ">
            <span className="text-[1rem] font-[Hop] text-[#228AED] leading-[1rem] ">{referral.name}</span>
        </div>
        <div>
            {referral.accepted ?
                <span className="text-[1.5rem] text-[#FFB213]">{formatNumber(REFERRAL_REWARD, '0,0')}</span> :
                <OrangeButton
                    height={"h-[2.5rem]"}
                    width={"w-[6.25rem]"}
                    onClick={() => referralRewardAccepted(referral)}>
                    <span className={"text-[1.188rem]"}>
                           + {formatNumber(REFERRAL_REWARD, '0,0')}
                    </span>
                </OrangeButton>}


        </div>
    </ContainerItem>
}