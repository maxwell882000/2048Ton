import {LeaderboardApiCloudStorageDto, LeaderboardApiDto} from "../../dtos/api/leaderboardApiDto";
import {fetchMethods} from "../../infrastructure/fetch/fetchMethods";
import {getValueCloudStorage, setValueCloudStorage} from "../../infrastructure/telegram/telegram_storage";
import moment from "moment";

const leaderboardMethod = "leaderboards"


export class LeaderboardApi {

    async getLeaderBoard(): Promise<LeaderboardApiDto[]> {
        try {
            const leaderboard = await this.getLeaderboardCloudStorage();
            if (leaderboard.expiry <= new Date()) {
                console.log("UPDATE LEADERBOARD")
                const data = await fetchMethods<{ [key: number]: LeaderboardApiDto }>(leaderboardMethod);
                leaderboard.leaderboard = Object.values(data);
                leaderboard.expiry = moment().add('4', 'hours').toDate();
                await setValueCloudStorage(leaderboardMethod, leaderboard);
            }
            console.log("LEADERBOARD RESULT", leaderboard);
            return leaderboard.leaderboard.sort((a, b) => b.s - a.s);
        } catch (e) {
            console.error(e);
            throw e;
        }

    }

    private async getLeaderboardCloudStorage(): Promise<LeaderboardApiCloudStorageDto> {
        const result = await getValueCloudStorage<LeaderboardApiCloudStorageDto>(leaderboardMethod);
        return {
            leaderboard: result?.leaderboard ?? [],
            expiry: new Date(result?.expiry ?? (new Date(0, 0, 0)).toString()),
        }
    }
}