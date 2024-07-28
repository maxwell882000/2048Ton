import {app} from "./domain";
import {Pages} from "../constants/pages";


export const $pageChanged = app.createEvent<Pages>();

export const $gameStarted = app.createEvent();