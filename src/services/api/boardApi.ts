import {getValueCloudStorage, setValueCloudStorage} from "../../infrastructure/telegram/telegram_storage";

export interface TileApiDto {
    id: string;
    v: number;
    c: number;
    p?: {
        l: number;
        t: number;
    }
}

export interface BoardsApiDto {
    b: TileApiDto[][],
    p: TileApiDto[][]
}

export class BoardApi {

    async setBoards(boardApi: BoardsApiDto) {
        await setValueCloudStorage<BoardsApiDto>("boards", boardApi);
    }

    async removeBoards() {
        await setValueCloudStorage("boards", null);
    }

    async getBoards(): Promise<BoardsApiDto> {
        return await getValueCloudStorage("boards")
    }

}