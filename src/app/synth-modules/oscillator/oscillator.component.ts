import { Component, OnInit } from '@angular/core';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { Voice } from 'src/app/synth-modules/oscillator/voice';

@Component({
  selector: 'app-oscillator',
  templateUrl: './oscillator.component.html',
  styleUrls: ['./oscillator.component.scss']
})

export class OscillatorComponent implements OnInit {

  public c: AudioContext;
  public active_voices: any;
  public frequency: any;
  public waveForm: any;
  public midiData: any;
  //public Voice: any;
  constructor(private contextManager: AudioContextManagerService) {   }

  ngOnInit() {
    this.active_voices = [];
    this.c = this.contextManager.audioContext;
    const g = this.c.createGain();
    let active = 0;
    this.waveForm = "sine";
    let fixedVel = 100;
    g.gain.setValueAtTime(0.5, this.c.currentTime);

  
    function toggleWave(button){
      button.onclick = selectWaveform;
    }

    function selectWaveform(data){
      console.log("called");
      var type = data.target.id;
      switch(type){
        case("sin"): this.waveForm = "sine"; active = 0; break;
        case("sqr"): this.waveForm = "square"; active = 1; break;
        case("saw"): this.waveForm = "sawtooth"; active = 2; break;
        case("tri"): this.waveForm = "triangle"; active = 3; break;
      };
     
      render();
    };

    function render(){
      document.querySelectorAll(".button").forEach(toggleWave);
      document.querySelectorAll(".button").forEach(renderDot);
    }
    
    function renderButton(button){
      console.log(active);
    }
    
    function renderDot(data){
      let dots = document.querySelectorAll(".dot")
      document.querySelectorAll(".dot").forEach(function(data){data.classList.remove("active")});
        switch(active){
            case(0): dots[0].classList.add("active"); break;
            case(1): dots[1].classList.add("active"); break;
            case(2): dots[2].classList.add("active"); break;
            case(3): dots[3].classList.add("active"); break;
        }
      
    }
    
    render();

    this.checkMidi();
  }

  public noteOn(midiNote, velocity){
    this.frequency = 440 * Math.pow(2, (midiNote-69)/12);
    const note = new Voice(this.c);
    this.active_voices[midiNote] = note;
    note.playNote(this.frequency);
  }

  public noteOff(midiNote, _){
    this.active_voices[midiNote].stopNote();
    delete this.active_voices[midiNote];
  }

  public checkMidi(){
    if (navigator["requestMIDIAccess"]) {
      navigator["requestMIDIAccess"]({
          sysex: false
      }).then(this.onMIDISuccess.bind(this), this.onMIDIFailure.bind(this));
    } else {
      alert("No MIDI support in your browser.");
    }
  }

  public onMIDISuccess(midiAccess){
    console.log(midiAccess);
    let midi;
    midi = midiAccess; 
    var inputs = midi.inputs.values();
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
      console.log(input.value);
      input.value.onmidimessage = this.onMIDIMessage.bind(this);
    }
  }

  public onMIDIFailure(error) {
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
  }

  public onMIDIMessage(event) {
    console.log("message")
    
    this.midiData = event.data; 
    let channel = this.midiData[0] & 0xf;
    let type = this.midiData[0] & 0xf0;
    let note = this.midiData[1];
    let velocity = this.midiData[2];
    
    switch (type) {
      case 144: // noteOn message 
          this.noteOn(note, velocity);
          break;
      case 128: // noteOff message 
          this.noteOff(note, velocity);
          break;
    }
      
  }

  public onVolumeChange(value){
    console.log(value);
    //this.maxVelocity = value;
    this.noteOn(66,100);
  }

}
