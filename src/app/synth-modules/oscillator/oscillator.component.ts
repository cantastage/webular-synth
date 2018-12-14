import { Component, OnInit } from '@angular/core';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';

@Component({
  selector: 'app-oscillator',
  templateUrl: './oscillator.component.html',
  styleUrls: ['./oscillator.component.scss']
})
export class OscillatorComponent implements OnInit {

  constructor(private contextManager: AudioContextManagerService) {  }

  ngOnInit() {
    const g = this.contextManager.audioContext.createGain();
    let active = 0;
    let waveForm = "sine";
    g.gain.setValueAtTime(0.5, this.contextManager.audioContext.currentTime);
    document.querySelectorAll(".button").forEach(function(){console.log("dio cane")});


  var Voice = (function(c) {
  
    function Voice(freq){
      this.freq = freq;
      this.oscillators = [];
    };
  
  
    Voice.prototype.start = function() {
      var osc = this.contextManager.audioContext.createOscillator();
      osc.type = waveForm;
      osc.frequency.value = this.freq;
      g.gain.value = 0.5; //velocity * 4/ 127;
      osc.connect(g);
      g.connect(this.contextManager.audioContext.destination);
      osc.start();
    
      this.oscillators.push(osc);
  
    };
  
    Voice.prototype.stop = function() {
      this.oscillators.forEach(function(oscillator, _) {
        oscillator.stop();
      });
    };
  
    return Voice;
    })(this.contextManager.audioContext);

    let active_voices = {};
  
    function toggleWave(button){
      button.onclick = selectWaveform;
    }

    function selectWaveform(data){
      console.log("called");
      var type = data.target.id;
      switch(type){
        case("sin"): waveForm = "sine"; active = 0; break;
        case("sqr"): waveForm = "square"; active = 1; break;
        case("saw"): waveForm = "sawtooth"; active = 2; break;
        case("tri"): waveForm = "triangle"; active = 3; break;
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

  }







}
