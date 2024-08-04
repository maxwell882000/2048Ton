import {userApp} from "./domain";
import Container from "../../containers/container";
import {LeaderboardDto} from "../../dtos/leaderboard/leaderboardDto";

const userApi = Container.getUserApi();
export const updateScoreFx = userApp.createEffect(async ({score, leaderboard}: {
    score: number;
    leaderboard: LeaderboardDto[];
}) => {
    if (leaderboard.some(l => l.score < score))
        await userApi.updateScore(score);
})