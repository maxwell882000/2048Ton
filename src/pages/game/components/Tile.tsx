import React, {useEffect, useMemo, useState} from "react";
import {TileDto} from "../../../dtos/game/tileDto";

interface TileProps {
    tile: TileDto,
    row: number,
    col: number
}

export const Tile: React.FC<TileProps> = ({tile, row, col}: TileProps) => {
    const [merged, setMerged] = useState<boolean>(false);
    const [style, setStyle] = useState<any>();
    const [prevPosition, setPrevPosition] = useState<{ left: number, top: number }>();

    const {className, innerText} = useMemo(() => {
        if (tile.value === 0) return {className: 'tile-new', innerText: ''};
        return {
            className: `tile x${tile.value <= 4096 ? tile.value : 8192}${tile.isNew ? ' tile-new' : ''}`,
            innerText: tile.value.toString()
        };
    }, [tile.value, tile.isNew, tile.isMerged, setMerged]);

    const {position} = useMemo(() => {
        return {
            position: {
                left: `${col * 75}px`,
                top: `${row * 75}px`
            }
        };
    }, [col, row])

    // useEffect(() => {
    //     if (prevPosition) {
    //         const leftDuration = Math.max(Math.abs(prevPosition.left - col * 75), 0) / 75;
    //         const topDuration = Math.max(Math.abs(prevPosition.top - row * 75), 0) / 75;
    //         setStyle({
    //             transition: `left ${leftDuration}s linear, top ${topDuration}s linear`,
    //         })
    //     }
    //     setPrevPosition({left: col * 75, top: row * 75});
    //
    // }, [col, row]);


    return <span
        className={className}
        style={{...position, ...style}}
    >
        {innerText}
   </span>
}