import {BoardService} from "../services/game/boardService";
import {TileService} from "../services/game/tileService";
import {TestGameService} from "../services/game/testGameService";

// container.ts
class Container {
    private static instance: Container;
    private readonly boardService: BoardService;
    private readonly tileService: TileService;
    private testGame: TestGameService;

    private constructor() {
        this.boardService = new BoardService();
        this.tileService = new TileService(this.boardService);
        this.testGame = new TestGameService(this.tileService);
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
        return this.testGame;
    }
}

export default Container.getInstance();
