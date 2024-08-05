import {MusicInfra} from "../../infrastructure/audio/musicInfra";

export class MusicService {
    private readonly musicMergeInfra: MusicInfra;

    constructor(musicInfra: MusicInfra) {
        this.musicMergeInfra = musicInfra;
    }

    async loadMergeMusic() {
        await this.musicMergeInfra.loadToBuffer("merge.mp3");
    }

    playMergeMusic() {
        this.musicMergeInfra.play();
    }
}