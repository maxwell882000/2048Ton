import {BoardService} from "../../services/game/boardService";
import {BoardsApiDto, TileApiDto} from "../../services/api/boardApi";
import {TileDto} from "../../dtos/game/tileDto";

export function boardApiFactory(boardService: BoardService): BoardsApiDto {
    function mapTile(tile: TileDto): TileApiDto {
        return {
            id: tile.uniqueId,
            v: tile.value,
            c: tile.cumulated,
            p: tile.position ? {l: tile.position.left, t: tile.position.top} : undefined
        };
    }

    const board = boardService.getBoard();
    const positionalBoard = boardService.getPositionBoard();

    return {
        b: board.map(row => row.map(mapTile)),
        p: positionalBoard.map(row => row.map(mapTile))
    };
}

