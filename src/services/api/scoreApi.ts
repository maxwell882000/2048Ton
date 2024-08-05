import {getValueCloudStorage, setValueCloudStorage} from "../../infrastructure/telegram/telegram_storage";

interface ScoreApiDto {
    score: number;
}

const TOTAL_SCORE = "total_score";

export class ScoreApi {

    async getTotalScore(): Promise<ScoreApiDto> {
        return (await getValueCloudStorage<ScoreApiDto>(TOTAL_SCORE)) ?? {
            score: 0
        };
    }

    async setTotalScore(scoreApi: ScoreApiDto) {
        const total_score = await this.getTotalScore();
        const updated_score = {score: total_score.score + scoreApi.score};
        await Promise.all([
            setValueCloudStorage<{
                score: number
            }>(TOTAL_SCORE, updated_score)
        ])
        return updated_score.score;
    }

}