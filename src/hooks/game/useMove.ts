import {useCallback, useEffect, useState} from "react";
import {CoordinateDto} from "../../dtos/game/coordinateDto";
import Container from "../../containers/container";
import {TurnDto} from "../../dtos/game/turnDto";
import {useUnit} from "effector-react/effector-react.umd";
import {$moveMade} from "../../states/game/events";

export function useMove() {
    const tileService = Container.getTileService();
    const [touchStart, setTouchStart] = useState<CoordinateDto | null>();
    const [touchEnd, setTouchEnd] = useState<CoordinateDto | null>();
    const [moveMade] = useUnit([$moveMade])


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
        moveMade();
    }, [touchStart, touchEnd]);


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
        moveMade();
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
    useEffect(() => {
        window.scrollTo(0, 3);
        return () => {
            window.scrollTo(0, 0);
        }
    })

    return {
        onTouchStart: onTouchStart,
        onTouchMove: onTouchMove,
        onTouchEnd: onTouchEnd,
    }
}