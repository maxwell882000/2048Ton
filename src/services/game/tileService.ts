import {TileDto} from "../../dtos/game/tileDto";
import {COLUMN, ROW} from "../../constants/game_dimension";
import {v4 as uuidv4} from "uuid";
import {TurnDto} from "../../dtos/game/turnDto";

export class TileService {
    private readonly rows: number;
    private readonly columns: number;

    constructor() {
        this.rows = ROW;
        this.columns = COLUMN;
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
        newRow = newRow.filter(cell => cell.value !== 0);
        while (newRow.length < this.columns) {
            newRow.push({uniqueId: uuidv4(), value: 0, isNew: false, cumulated: 0});
        }
        return newRow;
    }


    slideLeft(currentBoard: TileDto[][]) {
        return currentBoard.map(row => this.slide(row));
    };

    slideRight(currentBoard: TileDto[][]) {
        return currentBoard.map(row => this.slide([...row].reverse()).reverse());
    };

    slideUp(currentBoard: TileDto[][]) {
        const newBoard = this._fillBoard();
        for (let c = 0; c < this.columns; c++) {
            const column = currentBoard.map(row => row[c]);
            const newColumn = this.slide(column);
            for (let r = 0; r < this.rows; r++) {
                newBoard[r][c] = newColumn[r];
            }
        }
        return newBoard;
    };

    slideDown(currentBoard: TileDto[][]) {
        const newBoard = this._fillBoard();
        for (let c = 0; c < this.columns; c++) {
            const column = currentBoard.map(row => row[c]).reverse();
            const newColumn = this.slide(column).reverse();
            for (let r = 0; r < this.rows; r++) {
                newBoard[r][c] = newColumn[r];
            }
        }
        return newBoard;
    };

    slideTo(turn: TurnDto, board: TileDto[][]) {
        switch (turn) {
            case TurnDto.DOWN:
                return this.slideDown(board)
            case TurnDto.UP:
                return this.slideUp(board)
            case TurnDto.RIGHT:
                return this.slideRight(board)
            case TurnDto.LEFT:
                return this.slideLeft(board)
        }
    }

}