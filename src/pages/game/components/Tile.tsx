import React, {useMemo, useState} from "react";
import {TileDto} from "../../../dtos/game/tileDto";
import {ANIMATION_MULTIPLIER, TILE_SIZE} from "../../../constants/game";
import {moveDuration} from "../../../utils/moveDuration";
import {formatNumber} from "../../../utils/formatNumber";

interface TileProps {
    tile: TileDto,
}

export const Tile: React.FC<TileProps> = ({tile}: TileProps) => {
    const [style, setStyle] = useState<any>();
    const [prevPosition, setPrevPosition] = useState<{ left: number, top: number }>();

    const {className, innerText} = useMemo(() => {
        if (tile.value === -1) return {className: 'tile tile-zero', innerText: ''};
        if (tile.value === 0) return {className: '', innerText: ''};
        return {
            className: `tile x${tile.value <= 4096 ? tile.value : 65536}${tile.isNew ? ' tile-new' : ''}  ${tile.isMerged ? ' tile-appear' : ''}`,
            innerText: tile.value
        };
    }, [tile.value, tile.isNew, tile.isMerged]);

    const {position} = useMemo(() => {
        if (prevPosition) {
            const leftDuration = Math.max(Math.abs(prevPosition.left - (tile.position?.left ?? 0)), 0) / (TILE_SIZE * ANIMATION_MULTIPLIER);
            const topDuration = Math.max(Math.abs(prevPosition.top - (tile.position?.top ?? 0)), 0) / (TILE_SIZE * ANIMATION_MULTIPLIER);
            setStyle({
                transition: `left ${leftDuration}s linear, top ${topDuration}s linear`,
            })
            setTimeout(() => {
                setStyle({});
            }, moveDuration())
        }
        setPrevPosition({left: tile.position?.left ?? 0, top: tile.position?.top ?? 0,});
        return {
            position: {
                left: `${tile.position?.left}px`,
                top: `${tile.position?.top}px`
            }
        };
    }, [tile.position]);


    return <div
        className={className}
        style={{...position, ...style}}
    >
        {formatNumber(innerText, "0a")}
    </div>
}