import {gameDomain} from "./domain";
import {TileDto} from "../../dtos/game/tileDto";

export const $moveMade = gameDomain.createEvent();

export const $boardChanged = gameDomain.createEvent<TileDto[][]>();

export const $scoreChanged = gameDomain.createEvent<number>();

export const $isGameEndChanged = gameDomain.createEvent<boolean>();
