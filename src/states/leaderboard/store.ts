import {leaderboardApp} from "./domain";
import {LeaderboardDto} from "../../dtos/leaderboard/leaderboardDto";
import {$leaderboardChanged} from "./events";

export const $leaderboard = leaderboardApp
    .createStore<LeaderboardDto[]>([])
    .on($leaderboardChanged, (_, result) => {
        return result;
    })


