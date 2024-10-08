import {BoardService} from "../services/game/boardService";
import {TileService} from "../services/game/tileService";
import {TestGameService} from "../services/game/testGameService";
import {BoardApi} from "../services/api/boardApi";
import {ScoreApi} from "../services/api/scoreApi";
import {EnergyApi} from "../services/api/energyApi";
import {EnergyService} from "../services/game/energyService";
import {UserApi} from "../services/api/userApi";
import {LeaderboardApi} from "../services/api/leaderboardApi";
import {ReferralApi} from "../services/api/referralApi";
import {MusicService} from "../services/game/musicService";
import {MusicInfra} from "../infrastructure/audio/musicInfra";

class Container {
    private static instance: Container;
    private readonly boardService: BoardService;
    private readonly tileService: TileService;
    private readonly testGameService: TestGameService;
    private readonly boardApi: BoardApi;
    private readonly scoreApi: ScoreApi;
    private readonly energyApi: EnergyApi;
    private readonly energyService: EnergyService;
    private readonly userApi: UserApi;
    private readonly leaderboardApi: LeaderboardApi;
    private readonly referralApi: ReferralApi;
    private readonly musicService: MusicService

    private constructor() {
        this.boardService = new BoardService();
        this.tileService = new TileService(this.boardService);
        this.testGameService = new TestGameService(this.tileService);
        this.boardApi = new BoardApi();
        this.scoreApi = new ScoreApi();
        this.energyApi = new EnergyApi();
        this.energyService = new EnergyService();
        this.userApi = new UserApi();
        this.leaderboardApi = new LeaderboardApi();
        this.referralApi = new ReferralApi();
        this.musicService = new MusicService(new MusicInfra());
    }

    public static getInstance(): Container {
        if (!Container.instance) {
            Container.instance = new Container();
        }
        return Container.instance;
    }

    public getBoardService(): BoardService {
        return this.boardService;
    }

    public getTileService(): TileService {
        return this.tileService;
    }

    public getTestGameService(): TestGameService {
        return this.testGameService;
    }

    public getEnergyApi(): EnergyApi {
        return this.energyApi;
    }

    public getScoreApi(): ScoreApi {
        return this.scoreApi;
    }

    public getBoardApi(): BoardApi {
        return this.boardApi;
    }

    public getEnergyService(): EnergyService {
        return this.energyService;
    }

    public getUserApi(): UserApi {
        return this.userApi;
    }

    public getReferralApi(): ReferralApi {
        return this.referralApi;
    }

    public getLeaderboardApi(): LeaderboardApi {
        return this.leaderboardApi;
    }

    public getMusicService(): MusicService {
        return this.musicService;
    }

}

export default Container.getInstance();
