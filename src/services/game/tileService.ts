import {TileDto} from "../../dtos/game/tileDto";
import {COLUMN, ROW} from "../../constants/game";
import {v4 as uuidv4} from "uuid";
import {TurnDto} from "../../dtos/game/turnDto";
import {BoardService} from "./boardService";

export class TileService {
    private boardService: BoardService;

    constructor(boardService: BoardService) {
        this.boardService = boardService;
    }

    _fillBoard() {
        return Array.from({length: ROW}, () =>
            Array.from({length: COLUMN}, () => ({
                value: 0,
                isNew: false,
                cumulated: 0,
                isMerged: false,
                uniqueId: uuidv4()
            } as TileDto))
        );
    }

    slide(row: TileDto[]) {
        let newRow = row.filter(cell => cell.value !== 0);
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i].value === newRow[i + 1].value) {
                newRow[i] = {
                    ...newRow[i],
                    value: newRow[i].value * 2,
                    isNew: false,
                    isMerged: true,
                    cumulated: (newRow[i].cumulated ?? 0) + (newRow[i + 1].cumulated ?? 0) + newRow[i].value * 2
                };
                newRow[i + 1] = {...newRow[i + 1], value: 0, isNew: false, cumulated: 0};
            } else {
                newRow[i].isMerged = false;
            }
        }
        let newZeros = newRow.filter(cell => cell.value === 0);

        newRow = newRow.filter(cell => cell.value !== 0);
        newRow.push(...row.filter(cell => cell.value === 0))
        newRow.push(...newZeros)
        return newRow
    }


    slideLeft(currentBoard: TileDto[][]) {
        return currentBoard.map(row => this.slide(row));
    };

    slideRight(currentBoard: TileDto[][]) {
        return currentBoard.map(row => this.slide([...row].reverse()).reverse());
    };

    slideUp(currentBoard: TileDto[][]) {
        const newBoard = this._fillBoard();
        for (let c = 0; c < COLUMN; c++) {
            const column = currentBoard.map(row => row[c]);
            const newColumn = this.slide(column);
            for (let r = 0; r < ROW; r++) {
                newBoard[r][c] = newColumn[r];
            }
        }
        return newBoard;
    };

    slideDown(currentBoard: TileDto[][]) {
        const newBoard = this._fillBoard();
        for (let c = 0; c < COLUMN; c++) {
            const column = currentBoard.map(row => row[c]).reverse();
            const newColumn = this.slide(column).reverse();
            for (let r = 0; r < ROW; r++) {
                newBoard[r][c] = newColumn[r];
            }
        }
        return newBoard;
    };

    slideTo(turn: TurnDto) {
        let newBoard: TileDto[][];
        const board = this.boardService.getPositionBoard();
        switch (turn) {
            case TurnDto.DOWN:
                newBoard = this.slideDown(board)
                break;
            case TurnDto.UP:
                newBoard = this.slideUp(board)
                break;
            case TurnDto.RIGHT:
                newBoard = this.slideRight(board)
                break;
            case TurnDto.LEFT:
                newBoard = this.slideLeft(board)
                break;
        }
        if (newBoard) {
            console.log(JSON.stringify(newBoard).length);
            this.updateTiles(newBoard);
            this.boardService.setPositionBoard(newBoard);
        }
        return this.boardService.getCopyBoard();
    }

    updateTiles(currentBoard: TileDto[][]) {
        currentBoard.flatMap(tile => tile).forEach((tile, index) => {
            this.boardService.setTile(tile, index % 4, Math.floor(index / 4));
        });
    }

}