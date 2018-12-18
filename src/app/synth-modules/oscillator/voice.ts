import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';
import { } from 'src/app/synth-modules/oscillator/oscillator.component'

export class Voice {
    //build audio context
    public gain: GainNode;
    public ac: AudioContext;
    public osc: OscillatorNode;
    public oscillators: any;
    private waveForm: any;
    private fineTune: any;

    constructor(c, g, waveform, finePitch){
        const osc = c.createOscillator();
        this.waveForm = waveform;
        this.fineTune = finePitch;
        this.gain = g;
        this.oscillators = [];
        this.ac = c;
        this.osc = osc;
        osc.detune.setValueAtTime(this.fineTune, c.currentTime);
        osc.connect(g);
        g.connect(c.destination);
     }
    


    public playNote(note: number){
        this.osc.frequency.value = note;
        this.osc.type = this.waveForm;
        this.osc.start();
        //this.g.gain.value = 0.5;
        this.oscillators.push(this.osc);
    }

    public stopNote(){
        this.oscillators.forEach(function(oscillator, _){
            oscillator.stop();
        });
    }
    

}
