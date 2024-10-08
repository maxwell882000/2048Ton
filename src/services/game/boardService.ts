import {COLUMN, ROW, TILE_SIZE} from "../../constants/game";
import {TileDto} from "../../dtos/game/tileDto";
import {createUniqueIdGenerator} from "../../utils/createUniqueIdGenerator";
// all tiles that are merging not working transition
export class BoardService {
    private board: TileDto[][];
    private positionBoard: TileDto[][];
    private oldPositionBoard: TileDto[][] | null;

    constructor() {
        this.board = this.fillBoard();
        this.positionBoard = this.getCopyBoard();
        this.oldPositionBoard = null;
    }

    generateBoard() {
        this.board = this.fillBoard();
        this.positionBoard = this.getCopyBoard();
        this.generateTile();
        this.generateTile();
        return this.board
    }

    getBoard() {
        return this.board;
    }

    getPositionBoard() {
        return this.positionBoard;
    }

    getCopyPositionBoard() {
        return this.positionBoard.map(row => row.map(tile => ({...tile} as TileDto)));
    }

    setPositionBoard(board: TileDto[][]) {
        this.oldPositionBoard = this.positionBoard;
        this.positionBoard = board;
    }

    positionChangedOrMerged() {
        return this.oldPositionBoard === null || this.positionBoard.some((r, row) =>
            r.some((c, col) =>
                !(c.uniqueId === this.oldPositionBoard![row][col].uniqueId
                    && c.value === this.oldPositionBoard![row][col].value)
            ))
    }

    private positionChanged() {
        return this.oldPositionBoard === null || this.positionBoard.some((r, row) =>
            r.some((c, col) =>
                c.uniqueId !== this.oldPositionBoard![row][col].uniqueId))
    }

    continueGame(board: TileDto[][], positionBoard: TileDto[][]) {
        this.board = board;
        this.positionBoard = positionBoard;
        this.oldPositionBoard = this.positionBoard;
    }

    getCopyBoard() {
        return this.board.map(row => row.map(tile => ({...tile} as TileDto)));
    }

    getScore() {
        return this.board.flatMap(e => e).reduce((sum, cur) => sum + (cur.cumulated ?? 0), 0);
    }

    fillBoard(value = 0) {
        const incrementer = createUniqueIdGenerator();
        return Array.from({length: ROW}, (_, row) =>
            Array.from({length: COLUMN}, (_, col) => ({
                value: value,
                isNew: false,
                cumulated: 0,
                uniqueId: incrementer("b"),
                position: {
                    left: col * TILE_SIZE,
                    top: row * TILE_SIZE
                }
            } as TileDto))
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

    private hasEmptyTile() {
        return this.board.some(row => row.some(cell => cell.value === 0));
    };

    setTile(newTile: TileDto, left: number, top: number) {
        let tile = this.board.flatMap(t => t).find(t => t.uniqueId === newTile.uniqueId);
        if (tile) {
            tile.value = newTile.value;
            tile.isNew = newTile.isNew;
            tile.isMerged = newTile.isMerged;
            tile.cumulated = newTile.cumulated;
            tile.position = {
                left: left * TILE_SIZE,
                top: top * TILE_SIZE,
            };
        }
    }

    generateTile() {
        if (!this.hasEmptyTile() || !this.positionChanged()) {
            return this.board
        }
        let r, c;
        do {
            r = Math.floor(Math.random() * ROW);
            c = Math.floor(Math.random() * COLUMN);
        } while (this.positionBoard[r][c].value !== 0);

        this.positionBoard[r][c] = {
            ...this.positionBoard[r][c],
            value: this.getRandomValue(),
            isNew: true,
            cumulated: 0
        };
        this.setTile(this.positionBoard[r][c], c, r)
        return this.getCopyBoard();
    };

    removeClasses() {
        this.board.flatMap(e => e).forEach(t => {
            t.isNew = false;
            t.isMerged = false
        })
        this.positionBoard.flatMap(e => e).forEach(t => {
            t.isNew = false;
            t.isMerged = false;
        })
    }
}