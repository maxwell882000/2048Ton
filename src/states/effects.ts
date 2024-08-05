import {app} from "./domain";
import {$pageChanged} from "./events";
import {gameDomain} from "./game/domain";
import {$energy} from "./home/stores";
import {Pages} from "../constants/pages";
import {getEnergyFx, getScoreFx, reduceEnergyFx} from "./home/effects";
import {continueGameOnStartFx} from "./game/effects";
import Container from "../containers/container";
import {$totalScoreChanged} from "./home/events";
import {getLeaderboardFx} from "./leaderboard/effects";
import "./user/sample";
import {getReferralFx} from "./referral/effects";

// new columns created_at (ct)
// new referral_type (rt)
// new referrer_id (ri)

// referral process
// -- generate link user id will be in this link
// -- get userid from link when referral open the app
// -- instantly give him coins
// -- save that he is referral with referrer id

// firestore
// -- add indexes on "referral_type" (type  ('NO', 'REFERRAL', 'ACTIVATED_REFERRAL'))  column
//    save created_account date to filter referrals
//    so if referrer will not enter the game during x days
//    his referrals will be lost after x days


// referrals job use github actions
// -- get from firestore data about referrals
// -- rewrite file index.json
// -- push data to specified repo
// -- loader should be in .gitignore
// -- fetching operation works: get all referral_type (REFERRAL) and created_at by x days


//
// referrer process
// get generated file
// check if referrals with him exists
// remove referrals existing in cloud storage
// add to cloud storage this referral
// remove from firestore
//
// to decrease load on github for checking

// referrals page
// see all referrals from cloud storage
// add coins from referrals , make then referral unclickable

// ===========================================================


// leaderboard
// see the top 100 people who gained more score
//
const initApi = Container.getUserApi();
const scoreApi = Container.getScoreApi();
const musicService = Container.getMusicService();
export const initGameFx = app.createEffect(async () => {
    const user = await initApi.sync();
    if (user) {
        $totalScoreChanged(user.s ?? 0);
        await scoreApi.setTotalScore({score: user.s ?? 0});
    } else {
        await getScoreFx();
    }
})

// make variable to test locally or in prod
// make it impossible to save total result more than once in the game
export const loadGameDataFx = app.createEffect(async () => {
    try {
        await Promise.all([
                musicService.loadMergeMusic(),
                getReferralFx(),
                getLeaderboardFx(),
                initGameFx(),
                getEnergyFx(),
                continueGameOnStartFx()
            ]
        )
        $pageChanged({
            page: Pages.HOME
        })
    } catch (e) {
        console.log(`GOT THE ERROR !!!! ${e}`)
    }

})

export const startGameFx = gameDomain.createEffect(async () => {
    const energy = $energy.getState();
    if (energy.energy >= 1) {
        $pageChanged({
            page: Pages.GAME
        })
        await reduceEnergyFx();
        return true;
    } else {
        $pageChanged({
            page: Pages.OUTENERGY
        })
    }
    return false;
});