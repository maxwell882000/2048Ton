import {useCallback, useEffect, useState} from "react";
import {TileDto} from "../../dtos/game/tileDto";
import {CoordinateDto} from "../../dtos/game/coordinateDto";
import Container from "../../containers/container";
import {TurnDto} from "../../dtos/game/turnDto";
import {moveDuration} from "../../utils/moveDuration";
import {APPEAR_DURATION} from "../../constants/game_dimension";

export function useGame() {
    const tileService = Container.getTileService();
    const boardService = Container.getBoardService();
    const testEndService = Container.getTestGameService();
    const [board, setBoard] = useState<TileDto[][]>([]);
    const [isEndGame, setEndGame] = useState(false);
    const [score, setScore] = useState(0);
    const [touchStart, setTouchStart] = useState<CoordinateDto | null>();
    const [touchEnd, setTouchEnd] = useState<CoordinateDto | null>();

    const setGame = useCallback(() => {
        let newBoard = boardService.generateBoard();
        setEndGame(false);
        setScore(0);
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
        const isVertical = !isHorizontal;
        if (distanceX > 20 && isHorizontal) {
            tileService.slideTo(TurnDto.LEFT);
        } else if (distanceX < -20 && isHorizontal) {
            tileService.slideTo(TurnDto.RIGHT);
        } else if (distanceY > 20 && isVertical) {
            tileService.slideTo(TurnDto.UP);
        } else if (distanceY < -20 && isVertical) {
            tileService.slideTo(TurnDto.DOWN);
        } else {
            return;
        }
        saveNewBoard();
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
        switch (event.code) {
            case 'ArrowLeft':
                tileService.slideTo(TurnDto.LEFT);
                break;
            case 'ArrowRight':
                tileService.slideTo(TurnDto.RIGHT);
                break;
            case 'ArrowUp':
                tileService.slideTo(TurnDto.UP);
                break;
            case 'ArrowDown':
                tileService.slideTo(TurnDto.DOWN);
                break;
            default:
                return;
        }
        saveNewBoard();
    }, [board]);

    const saveNewBoard = () => {
        setScore(boardService.getScore())
        setBoard(boardService.getCopyBoard());
        generateTileAndRemoveAnimation()
        setEndGame(testEndService.testEndGame(boardService.getCopyPositionBoard()));
    }

    const generateTileAndRemoveAnimation = () => {
        setTimeout(() => {
            let newBoard = boardService.generateTile();
            setBoard(newBoard);
            setTimeout(() => {
                boardService.removeClasses();
                setBoard(boardService.getCopyBoard());
            }, APPEAR_DURATION)
        }, moveDuration())
    }

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
        board: board,
        emptyBoard: boardService.fillBoard(-1),
        isEndGame: isEndGame,
        setGame: setGame,
    }
}