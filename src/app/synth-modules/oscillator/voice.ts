import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';

export class Voice {
    //build audio context
    public ac: AudioContext;
    public osc: OscillatorNode;
    public oscillators: any;

    constructor(c){
        const osc = c.createOscillator();
        osc.connect(c.destination);

        this.oscillators = [];
        this.ac = c;
        this.osc = osc;
     }
    


    public playNote(note: number){
        this.osc.frequency.value = note;
        this.osc.type = "sine";
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
