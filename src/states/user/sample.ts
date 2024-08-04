import {sample} from "effector";
import {$leaderboard} from "../leaderboard/store";
import {$totalScoreChanged} from "../home/events";
import {updateScoreFx} from "./effects";

sample(
    {
        clock: $totalScoreChanged,
        source: $leaderboard,
        fn: (leaderboard, score) => ({
            score,
            leaderboard
        }),
        target: updateScoreFx
    }
)