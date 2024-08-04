import {leaderboardApp} from "./domain";
import {LeaderboardDto} from "../../dtos/leaderboard/leaderboardDto";


export const $leaderboardChanged = leaderboardApp.createEvent<LeaderboardDto[]>();