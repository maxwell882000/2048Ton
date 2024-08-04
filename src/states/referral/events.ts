import {referralApp} from "./domain";
import {ReferralDto} from "../../dtos/referral/referralDto";


export const $referralsChanged = referralApp.createEvent<ReferralDto[]>();

export const $referralRewardAccepted = referralApp.createEvent<ReferralDto>();
