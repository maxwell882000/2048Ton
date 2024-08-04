import {referralApp} from "./domain";
import {$referralsChanged} from "./events";
import Container from "../../containers/container";
import {ReferralApi} from "../../services/api/referralApi";
import {ReferralDto} from "../../dtos/referral/referralDto";
import {ScoreApi} from "../../services/api/scoreApi";
import {REFERRAL_REWARD} from "../../constants/game";
import {$totalScoreChanged} from "../home/events";


const referralApi: ReferralApi = Container.getReferralApi();

const scoreApi: ScoreApi = Container.getScoreApi();

export const getReferralFx = referralApp.createEffect(async () => {
    const referrals = await referralApi.getReferral();
    $referralsChanged(referrals.map<ReferralDto>(r => ({
        name: r?.un,
        photo: r?.p,
        referralId: r.r,
        accepted: r.ac ?? false,
    })))
})

export const referralRewardAcceptedFx = referralApp.createEffect(async (referral: ReferralDto) => {
    await referralApi.acceptReward(referral.referralId);
    const score = await scoreApi.setTotalScore({score: REFERRAL_REWARD});
    $totalScoreChanged(score);
})