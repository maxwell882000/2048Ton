import {useGame} from "./hooks/game/useGame";

const Game2048 = () => {
    let {onTouchEnd, onTouchMove, onTouchStart, score, board} = useGame();

    const getTilePosition = (row: any, col: any) => {
        return {
            left: `${col * 75}px`,
            top: `${row * 75}px`
        };
    };

    const updateTile = (cell: any) => {
        if (cell.value === 0) return {className: 'tile', innerText: ''};
        return {
            className: `tile x${cell.value <= 4096 ? cell.value : 8192}${cell.isNew ? ' tile-new' : ''}`,
            innerText: cell.value.toString()
        };
    };

    return (
        <div style={{marginTop: 20}}>
            <div>Score: {score}</div>
            <div id="board"
                 onTouchStart={onTouchStart}
                 onTouchMove={onTouchMove}
                 onTouchEnd={onTouchEnd}>
                {board.map((row, r) => (
                    row.map((cell: any, c: any) => {
                        const {className, innerText} = updateTile(cell);
                        const position = getTilePosition(r, c);
                        return (
                            <div
                                key={`${r}-${c}`}
                                className={className}
                                style={position}
                            >
                                {innerText}
                            </div>
                        );
                    })
                ))}
            </div>
        </div>
    );
};

export default Game2048;