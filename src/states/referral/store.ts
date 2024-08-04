import {referralApp} from "./domain";
import {ReferralDto} from "../../dtos/referral/referralDto";
import {$referralRewardAccepted, $referralsChanged} from "./events";
import {sample} from "effector";
import {referralRewardAcceptedFx} from "./effects";

export const $referrals = referralApp.createStore<ReferralDto[]>([])
    .on($referralsChanged, (_, result) => {
        return result;
    })
    .on($referralRewardAccepted, (state, result) => {
        state.filter(s => s.referralId === result.referralId).forEach(r => {
            r.accepted = true;
        });
        return [...state];
    })


sample({
    source: $referralRewardAccepted,
    target: referralRewardAcceptedFx
})