var midi, data;
var frequency;

//MIDI IMPLEMENTATION

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

function onMIDISuccess(midiAccess) {
    midi = midiAccess; 

    var inputs = midi.inputs.values();
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        input.value.onmidimessage = onMIDIMessage;
    }
}

function onMIDIFailure(error) {
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

function onMIDIMessage(event) {
  data = event.data; 
  channel = data[0] & 0xf;
  type = data[0] & 0xf0;
  note = data[1];
  velocity = data[2];
  document.querySelector(".circle").classList.toggle("active");
  
  switch (type) {
        case 144: // noteOn message 
             noteOn(note, velocity);
             break;
        case 128: // noteOff message 
            noteOff(note, velocity);
            break;
    }
}

function noteOn(midiNote, velocity){
  frequency = 440* Math.pow(2, (midiNote-69)/12);
  playNote(frequency, velocity);
  //console.log(frequency);
}

function noteOff(midiNote, velocity){
  osc.stop();
}

//AUDIO GENERATOR
c = new AudioContext();
function playNote(frequency, velocity){
  console.log("call function")
  osc = c.createOscillator();
  osc.frequency.value = frequency;
  g = c.createGain();
  g.gain.value = velocity * 4 / 127;
  osc.connect(g);
  g.connect(c.destination);
  now=c.currentTime;
  osc.start(now);
}


window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

var code;

function onKeyDown(e){
  code = String.fromCharCode(e.keyCode)
  if (e.repeat)
    return;
  
  switch(code){
    case "A": 
      frequency = 523.25;
      playNote(frequency, 100);
      break;
    case "B": 
      alert("B");
      break;
      
  }
  
  
}

function onKeyUp(){
  noteOff();
}
