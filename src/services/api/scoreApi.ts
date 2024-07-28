import {getValueCloudStorage, setValueCloudStorage} from "../../infrustructure/database/telegram_storage";
import {saveValueFirebase} from "../../infrustructure/database/firebase_db";

interface ScoreApiDto {
    score: number;
}

export class ScoreApi {
    async getTotalScore(): Promise<ScoreApiDto> {
        return (await getValueCloudStorage<ScoreApiDto>("total_score")) ?? {
            score: 0
        };
    }

    async setTotalScore(scoreApi: ScoreApiDto) {
        const total_score = await this.getTotalScore();
        const updated_score = {score: total_score.score + scoreApi.score};
        await Promise.all([
            setValueCloudStorage<{
                score: number
            }>("total_score", updated_score),
            saveValueFirebase(Telegram.WebApp.initDataUnsafe.user?.id + "/total_score", updated_score)
        ])
        return updated_score.score;
    }

}