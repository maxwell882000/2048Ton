import {ANIMATION_MULTIPLIER} from "../constants/game";

export function moveDuration() {
    return (1 / (ANIMATION_MULTIPLIER) * 3000) + 10;
}