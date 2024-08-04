export enum Pages {
    START = "/2048Ton",
    HOME = "/2048Ton/home",
    GAME = "/2048Ton/game",
    OUTENERGY = "/2048Ton/outenergy",
    REFANDLEADER = "/2048Ton/refandleader",
}

export interface Nav {
    page: Pages,
    params?: any
}