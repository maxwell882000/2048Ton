import {$leaderboardChanged} from "./events";
import {leaderboardApp} from "./domain";
import {LeaderboardApi} from "../../services/api/leaderboardApi";
import Container from "../../containers/container";

const leaderboardApi: LeaderboardApi = Container.getLeaderboardApi();

export const getLeaderboardFx = leaderboardApp.createEffect(async () => {
    const leaderboard = await leaderboardApi.getLeaderBoard();
    $leaderboardChanged(
        leaderboard.map(l => ({
                name: l.un,
                photo: l.p,
                score: l.s
            }
        ))
    );
})