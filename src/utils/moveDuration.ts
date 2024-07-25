import {ANIMATION_MULTIPLIER} from "../constants/game_dimension";

export function moveDuration() {
    return (1 / (ANIMATION_MULTIPLIER) * 3000) + 10;
}