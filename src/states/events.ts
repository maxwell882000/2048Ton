import {app} from "./domain";
import {Nav} from "../constants/pages";


export const $pageChanged = app.createEvent<Nav>();

export const $gameStarted = app.createEvent();
