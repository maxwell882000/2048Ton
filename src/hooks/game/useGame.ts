import {TileService} from "../../services/game/tileService";
import {useCallback, useEffect, useState} from "react";
import {TileDto} from "../../dtos/game/tileDto";
import {CoordinateDto} from "../../dtos/game/coordinateDto";
import {BoardService} from "../../services/game/boardService";
import {TestGameService} from "../../services/game/testGameService";

export function useGame() {
    const tileService = new TileService();
    const boardService = new BoardService();
    const testEndService = new TestGameService();
    const [board, setBoard] = useState<TileDto[][]>([]);
    const [score, setScore] = useState(0);
    const [touchStart, setTouchStart] = useState<CoordinateDto | null>();
    const [touchEnd, setTouchEnd] = useState<CoordinateDto | null>();

    const setGame = useCallback(() => {
        let newBoard = boardService.generateBoard();
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

        let newBoard: TileDto[][] | null = null;
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
            setScore(newBoard.flatMap(e => e).reduce((sum, cur) => sum + (cur.cumulated ?? 0), 0))
            newBoard = boardService.generateTile(newBoard);
            setBoard(newBoard as TileDto[][]);
            testEndService.testEndGame(newBoard as TileDto[][]);
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
        let newBoard: TileDto[][];
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
        newBoard = boardService.generateTile(newBoard);
        console.log(newBoard.flatMap(e => e));
        setBoard(newBoard);
        testEndService.testEndGame(newBoard);
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