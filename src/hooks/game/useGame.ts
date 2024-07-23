import {MoveTileService} from "../../services/game/moveTileService";
import {useCallback, useEffect, useState} from "react";
import {Tile} from "../../dtos/game/tile";
import {Coordinate} from "../../dtos/game/coordinate";
import {COLUMN, ROW} from "../../constants/game_dimension";

export function useGame() {
    const tileService = new MoveTileService();
    const [board, setBoard] = useState<Tile[][]>([]);
    const [score, setScore] = useState(0);
    const [touchStart, setTouchStart] = useState<Coordinate | null>();
    const [touchEnd, setTouchEnd] = useState<Coordinate | null>();

    const setGame = useCallback(() => {
        let newBoard = Array(ROW).fill(null).map(() => Array(COLUMN).fill({
            value: 0,
            isNew: false,
            cumulated: 0
        } as Tile));

        newBoard = tileService.generateTile(newBoard);
        newBoard = tileService.generateTile(newBoard);
        setBoard(newBoard);
    }, []);

    useEffect(() => {
        setGame();
    }, [setGame]);


    const handleSwipe = useCallback(() => {
        if (!touchStart || !touchEnd) return;
        const distanceX = touchStart.x - touchEnd.x;
        const distanceY = touchStart.y - touchEnd.y;
        const isHorizontal = Math.abs(distanceX) > Math.abs(distanceY);

        let newBoard: any;
        if (isHorizontal) {
            if (distanceX > 20) {
                newBoard = tileService.slideLeft(board);
            } else if (distanceX < -20) {
                newBoard = tileService.slideRight(board);
            }
        } else {
            if (distanceY > 20) {
                newBoard = tileService.slideUp(board);
            } else if (distanceY < -20) {
                newBoard = tileService.slideDown(board);
            }
        }
        if (newBoard) {
            newBoard = tileService.generateTile(newBoard);
            setBoard(newBoard);
            tileService.testEndGame(newBoard);
        }
    }, [board, touchStart, touchEnd]);


    const onTouchStart = (e: any) => {
        setTouchEnd(null);
        setTouchStart({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY
        });
    };

    const onTouchMove = (e: any) => {
        setTouchEnd({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY
        });
    };

    const onTouchEnd = () => {
        handleSwipe();
        setTouchStart(null);
        setTouchEnd(null);
    };

    const handleKeyDown = useCallback((event: any) => {
        let newBoard: any[][];
        switch (event.code) {
            case 'ArrowLeft':
                newBoard = tileService.slideLeft(board);
                break;
            case 'ArrowRight':
                newBoard = tileService.slideRight(board);
                break;
            case 'ArrowUp':
                newBoard = tileService.slideUp(board);
                break;
            case 'ArrowDown':
                newBoard = tileService.slideDown(board);
                break;
            default:
                return;
        }
        setScore(newBoard.flatMap(e => e).reduce((sum, cur) => sum + (cur.cumulated ?? 0), 0))
        newBoard = tileService.generateTile(newBoard);
        setBoard(newBoard);
        tileService.testEndGame(newBoard);
    }, [board]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
    return {
        onTouchStart: onTouchStart,
        onTouchMove: onTouchMove,
        onTouchEnd: onTouchEnd,
        score: score,
        board: board
    }
}