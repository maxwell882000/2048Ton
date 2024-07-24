import {COLUMN, ROW} from "../../constants/game_dimension";
import {v4 as uuidv4} from "uuid";
import {TileDto} from "../../dtos/game/tileDto";

export class BoardService {

    generateBoard() {
        let newBoard = this.fillBoard();
        newBoard = this.generateTile(newBoard);
        newBoard = this.generateTile(newBoard);
        return newBoard
    }

    fillBoard() {
        return Array.from({length: ROW}, () =>
            Array.from({length: COLUMN}, () => ({
                value: 0,
                isNew: false,
                cumulated: 0,
                uniqueId: uuidv4()
            }))
        );
    }

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

    hasEmptyTile(currentBoard: TileDto[][]) {
        return currentBoard.some(row => row.some(cell => cell.value === 0));
    };


    generateTile(currentBoard: TileDto[][]) {
        if (!this.hasEmptyTile(currentBoard)) {
            return currentBoard
        }

        let r, c;
        do {
            r = Math.floor(Math.random() * ROW);
            c = Math.floor(Math.random() * COLUMN);
        } while (currentBoard[r][c].value !== 0);
        const newBoard = currentBoard.map(row => row.map(cell => ({...cell})));
        newBoard[r][c] = {...newBoard[r][c], value: this.getRandomValue(), isNew: true, cumulated: 0};
        return newBoard;
    };
}