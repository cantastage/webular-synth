export class Voice {
    // build audio context
    public voiceGain: GainNode;
    public ac: AudioContext;
    public osc: OscillatorNode;
    // public analyser: AnalyserNode;
    public oscillators: Array<any>;
    private waveForm: any;
    private fineTune: any;

    constructor(c, g, waveform, finePitch) {
        const osc = c.createOscillator();
        const voiceGain = c.createGain();
        this.waveForm = waveform;
        this.fineTune = finePitch;
        this.oscillators = new Array<any>(0);
        this.ac = c;
        this.osc = osc;
        this.voiceGain = voiceGain;
        osc.detune.setValueAtTime(this.fineTune, c.currentTime);
        osc.connect(this.voiceGain);
        voiceGain.connect(g);
    }

    public playNote(note: number) {
        this.osc.frequency.value = note;
        this.osc.type = this.waveForm;
        this.osc.start();
        this.voiceGain.gain.value = 0;
        this.voiceGain.gain.linearRampToValueAtTime(1, this.ac.currentTime + 0.2);
        this.oscillators.push(this.osc);
    }

    // Optimized code because for is faster than foreach
    public stopNote() {
        for (let i = 0; i < this.oscillators.length; i++) {
            // this.gain.gain.linearRampToValueAtTime(0.0, this.ac.currentTime + 2);
            console.log('stopping');
            this.oscillators[i].stop();
        }
        // this.oscillators.forEach(function (oscillator, _) {
        //     oscillator.stop();
        // });
    }
}
