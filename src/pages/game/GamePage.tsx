import {useGame} from "../../hooks/game/useGame";
import React from "react";
import {Tile} from "./components/Tile";

interface TileProps {
    row: number;
    col: number;
}

//
// const Tile: React.FC<TileProps> = () => {
//     const [row, setRow] = useState(0);
//     const [col, setCol] = useState(0);
//     const tileSize = 80; // Size of each tile in pixels
//
//     const handleKeyDown = (event: KeyboardEvent) => {
//         switch (event.key) {
//             case 'ArrowUp':
//                 setRow(prev => Math.max(prev - 1, 0));
//                 break;
//             case 'ArrowDown':
//                 setRow(prev => prev + 1);
//                 break;
//             case 'ArrowLeft':
//                 setCol(prev => Math.max(prev - 1, 0));
//                 break;
//             case 'ArrowRight':
//                 setCol(prev => prev + 1);
//                 break;
//             default:
//                 break;
//         }
//     };
//
//     useEffect(() => {
//         window.addEventListener('keydown', handleKeyDown);
//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//         };
//     }, []);
//
//     const positionStyle = {
//         left: `${col * tileSize}px`,
//         top: `${row * tileSize}px`
//     };
//
//     return (
//         <div className="tile" style={positionStyle}>
//             Tile
//         </div>
//     );
// };

const GamePage = () => {

    let {onTouchEnd, onTouchMove, onTouchStart, score, board} = useGame();
    return (
        <div style={{marginTop: 20, backgroundColor: "gray"}}>
            <div>Score: {score}</div>

            <div className="bg-white rounded p-[0.75rem]">
                <span id="board"
                      style={{display: "block"}}
                      onTouchStart={onTouchStart}
                      onTouchMove={onTouchMove}
                      onTouchEnd={onTouchEnd}>
                {board.flatMap(r => r).map((row, r) => (
                    <Tile key={row.uniqueId} row={Math.floor(r / 4)} col={r % 4} tile={row}></Tile>
                ))}
            </span>
            </div>

        </div>
    );
};

export default GamePage;