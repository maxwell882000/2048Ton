import {TileApiDto} from "../../services/api/boardApi";
import {TileDto} from "../../dtos/game/tileDto";

export function tileDtoFactory(tileApiDto: TileApiDto): TileDto {
    return {
        uniqueId: tileApiDto.id,
        value: tileApiDto.v,
        isNew: true,
        cumulated: tileApiDto.c,
        isMerged: false,
        position: tileApiDto.p ? {left: tileApiDto.p.l, top: tileApiDto.p.t} : undefined
    };
}