import {ANIMATION_MULTIPLIER} from "../constants/game";

export function moveDuration() {
    // 1/20 * 3000 it is 150 miliseconds + 10 additional wait time
    return (1 / (ANIMATION_MULTIPLIER) * 3000) + 10;
}