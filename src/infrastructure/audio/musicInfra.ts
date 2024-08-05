export class MusicInfra {
    private audioContext: AudioContext;
    private buffer: AudioBuffer | null;

    constructor() {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.buffer = null;
    }

    async loadToBuffer(path: string) {
        try {
            const response = await fetch(path);
            const arrayBuffer = await response.arrayBuffer();
            this.buffer = await this.audioContext.decodeAudioData(arrayBuffer);
        } catch (error) {
            console.error('Error loading audio:', error);
        }
    }

    play() {
        const source = this.audioContext.createBufferSource();
        source.buffer = this.buffer;
        source.connect(this.audioContext.destination);
        source.start();
    }
}
