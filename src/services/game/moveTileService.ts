import {Tile} from "../../dtos/game/tile";
import {COLUMN, ROW} from "../../constants/game_dimension";

export class MoveTileService {
    private readonly rows: number;
    private readonly columns: number;

    constructor() {
        this.rows = ROW;
        this.columns = COLUMN;
    }

    slide(row: Tile[]) {
        let newRow = row.filter(cell => cell.value !== 0);
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i].value === newRow[i + 1].value) {
                newRow[i] = {
                    value: newRow[i].value * 2,
                    isNew: false,
                    cumulated: (newRow[i].cumulated ?? 0) + (newRow[i + 1].cumulated ?? 0) + newRow[i].value * 2
                };
                newRow[i + 1] = {value: 0, isNew: false, cumulated: 0};
            }
        }
        newRow = newRow.filter(cell => cell.value !== 0);
        while (newRow.length < this.columns) {
            newRow.push({value: 0, isNew: false, cumulated: 0});
        }
        return newRow;
    }


    slideLeft(currentBoard: Tile[][]) {
        return currentBoard.map(row => this.slide(row));
    };

    slideRight(currentBoard: Tile[][]) {
        return currentBoard.map(row => this.slide([...row].reverse()).reverse());
    };

    slideUp(currentBoard: Tile[][]) {
        const newBoard = Array(this.rows).fill(null).map(() => Array(this.columns).fill(0));
        for (let c = 0; c < this.columns; c++) {
            const column = currentBoard.map(row => row[c]);
            const newColumn = this.slide(column);
            for (let r = 0; r < this.rows; r++) {
                newBoard[r][c] = newColumn[r];
            }
        }
        return newBoard;
    };

    slideDown(currentBoard: Tile[][]) {
        const newBoard = Array(this.rows).fill(null).map(() => Array(this.columns).fill(0));
        for (let c = 0; c < this.columns; c++) {
            const column = currentBoard.map(row => row[c]).reverse();
            const newColumn = this.slide(column).reverse();
            for (let r = 0; r < this.rows; r++) {
                newBoard[r][c] = newColumn[r];
            }
        }
        return newBoard;
    };

    hasEmptyTile(currentBoard: Tile[][]) {
        return currentBoard.some(row => row.some(cell => cell.value === 0));
    };

    getRandomValue() {
        // Generate a random number between 0 and 1
        const random = Math.random();

        // Define the probabilities
        const probabilityOf2 = 0.9;

        // Determine the value based on the probability
        if (random < probabilityOf2) {
            return 2;
        } else {
            return 4;
        }
    }

    generateTile(currentBoard: Tile[][]) {
        if (!this.hasEmptyTile(currentBoard)) {
            return currentBoard
        }

        let r, c;
        do {
            r = Math.floor(Math.random() * this.rows);
            c = Math.floor(Math.random() * this.columns);
        } while (currentBoard[r][c].value !== 0);
        const newBoard = currentBoard.map(row => row.map(cell => ({...cell})));
        newBoard[r][c] = {value: this.getRandomValue(), isNew: true, cumulated: 0};
        return newBoard;
    };

    testEndGame(currentBoard: Tile[][]) {
        let noMovesForDirection = 0;
        let testBoard = currentBoard;
        testBoard = this.slideLeft(currentBoard);
        if (!this.hasEmptyTile(testBoard)) {
            noMovesForDirection += 1;
        }
        testBoard = this.slideRight(currentBoard)
        if (!this.hasEmptyTile(testBoard)) {
            noMovesForDirection += 1;
        }
        testBoard = this.slideUp(currentBoard)
        if (!this.hasEmptyTile(testBoard)) {
            noMovesForDirection += 1;
        }
        testBoard = this.slideDown(currentBoard)
        if (!this.hasEmptyTile(testBoard)) {
            noMovesForDirection += 1;
        }
        if (noMovesForDirection === 4) {
            console.log("GAME IS FINISHED !!!!!!")
        }
    }
}