import {TileService} from "./tileService";
import {TileDto} from "../../dtos/game/tileDto";

export class TestGameService {
    private tileService: TileService;

    constructor(tileService: TileService) {
        this.tileService = tileService;
    }

    hasEmptyTile(board: TileDto[][]) {
        return board.some(row => row.some(cell => cell.value === 0));
    };

    testEndGame(currentBoard: TileDto[][]) {
        let noMovesForDirection = 0;
        let testBoard = this.tileService.slideLeft(currentBoard);
        if (!this.hasEmptyTile(testBoard)) {
            noMovesForDirection += 1;
        }
        testBoard = this.tileService.slideRight(currentBoard)
        if (!this.hasEmptyTile(testBoard)) {
            noMovesForDirection += 1;
        }
        testBoard = this.tileService.slideUp(currentBoard)
        if (!this.hasEmptyTile(testBoard)) {
            noMovesForDirection += 1;
        }
        testBoard = this.tileService.slideDown(currentBoard)
        if (!this.hasEmptyTile(testBoard)) {
            noMovesForDirection += 1;
        }
        return noMovesForDirection === 4;
    }
}