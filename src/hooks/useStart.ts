import {useUnit} from "effector-react";
import {$gameStarted} from "../states/events";

export const useStart = () => {
    const [gameStarted] = useUnit([$gameStarted]);

    return {
        startGame: gameStarted,
    }
}