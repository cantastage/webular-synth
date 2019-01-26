export class Voice {
    // build audio context
    private voiceGain: GainNode;
    public ac: AudioContext;
    private osc: OscillatorNode;
    private oscillators: Array<any>;
    private waveForm: any;
    private fineTune: any;
    private singleNote: any;
    private envelope: any;

    constructor(c: AudioContext, g: GainNode, waveform: string, envelopeValues: any) {
        const osc = c.createOscillator();
        const voiceGain = c.createGain();
        this.waveForm = waveform;
        // this.fineTune = finePitch;
        this.envelope = envelopeValues;
        this.oscillators = new Array<any>(0);
        this.ac = c;
        this.osc = osc;
        this.voiceGain = voiceGain;
        // osc.detune.setValueAtTime(this.fineTune, c.currentTime);
        osc.connect(this.voiceGain);
        voiceGain.connect(g);
    }

    public playNote(note: number) {
        this.singleNote = {
            oscillator: this.osc,
            gain: this.voiceGain
        };

        this.osc.frequency.value = note;
        this.osc.type = this.waveForm;
        this.osc.start();
        this.singleNote.gain.gain.setValueAtTime(0, this.ac.currentTime);
        this.singleNote.gain.gain.linearRampToValueAtTime(1, this.ac.currentTime + this.envelope[0]);
        this.singleNote.gain.gain.linearRampToValueAtTime(this.envelope[2], this.ac.currentTime + this.envelope[1]);
        this.oscillators.push(this.singleNote);
    }

    // Optimized code because for is faster than foreach
    public stopNote() {
        for (let i = 0; i < this.oscillators.length; i++) {
            this.oscillators[i].gain.gain.cancelScheduledValues(this.ac.currentTime);
            this.oscillators[i].gain.gain.setValueAtTime(this.oscillators[i].gain.gain.value, this.ac.currentTime);
            this.oscillators[i].gain.gain.linearRampToValueAtTime(0, this.ac.currentTime + this.envelope[3]);
            this.oscillators[i].oscillator.stop(this.ac.currentTime + 0.2);
        }

    }
}
