import {getValueCloudStorage, setValueCloudStorage} from "../../infrustructure/telegram/telegram_storage";
import {setValueFirestore} from "../../infrustructure/firebase/firestore";
import {getTelegramUser} from "../../infrustructure/telegram/telegram_user";

interface ScoreApiDto {
    score: number;
}

export class ScoreApi {
    TOTAL_SCORE = "total_score"

    async getTotalScore(): Promise<ScoreApiDto> {
        return (await getValueCloudStorage<ScoreApiDto>(this.TOTAL_SCORE)) ?? {
            score: 0
        };
    }

    async setTotalScore(scoreApi: ScoreApiDto) {
        const total_score = await this.getTotalScore();
        const updated_score = {score: total_score.score + scoreApi.score};
        await Promise.all([
            setValueCloudStorage<{
                score: number
            }>(this.TOTAL_SCORE, updated_score),
            setValueFirestore(
                getTelegramUser()?.id.toString() || '0',
                {s: updated_score.score}
            )
        ])
        return updated_score.score;
    }

}