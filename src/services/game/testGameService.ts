import {TileDto} from "../../dtos/game/tileDto";
import {BoardService} from "./boardService";
import {TurnDto} from "../../dtos/game/turnDto";
import {TileService} from "./tileService";

export class TestGameService {
    private tileService: TileService;
    private boardService: BoardService;

    constructor() {
        this.tileService = new TileService();
        this.boardService = new BoardService();
    }

    testEndGame(currentBoard: TileDto[][]) {
        let noMovesForDirection = 0;
        let testBoard = currentBoard;
        // testBoard = this.tileService.slideTo(TurnDto.LEFT, currentBoard);
        // if (!this.boardService.hasEmptyTile(testBoard)) {
        //     noMovesForDirection += 1;
        // }
        // testBoard = this.tileService.slideTo(TurnDto.RIGHT, currentBoard)
        // if (!this.boardService.hasEmptyTile(testBoard)) {
        //     noMovesForDirection += 1;
        // }
        // testBoard = this.tileService.slideTo(TurnDto.UP, currentBoard)
        // if (!this.boardService.hasEmptyTile(testBoard)) {
        //     noMovesForDirection += 1;
        // }
        // testBoard = this.tileService.slideTo(TurnDto.DOWN, currentBoard)
        // if (!this.boardService.hasEmptyTile(testBoard)) {
        //     noMovesForDirection += 1;
        // }
        // if (noMovesForDirection === 4) {
        //     console.log("GAME IS FINISHED !!!!!!")
        // }
    }
}