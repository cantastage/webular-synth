# WebularSynth

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Introduction

WebularSynth is a web-application built on Angular Framework.

It is a modular synthesizer designed for passionate musicians. It uses the Angular component-based logic to map the real modules of a synthesizer into reusable and expandable UI components.  
The application runs best on Chrome browser, because of the use of webAudio and webMIDI API.

### Demo

The brief demonstrative video is available @ [this link](https://www.dropbox.com/s/5f6joppful1dlr9/Webular%20Synthesizer.mp4?dl=0).

### Sound Chain management

The sound chain is built upon synth modules. Adding a module to the "Synth modules" list automatically creates the needed connections in the audio context. Note that you must provide at least one source and one amplifier to output audio from your speakers. The amplifier is the only module connected to the audio context destination.

## Modules & Corresponding Components

### Clock

As in all the most known synthesizers, the clock module is a single instance which can be observed by objects who might desire a synchronization.

In our case, the only module which needs temporization is the harmonic sequencer.

The `ClockComponent` builds an `IClock` instance thanks to the `ClockManagerService` service and the `ClockProvider` factory.

Further extensions, such as coexisting clocks for poly-harmonic/melodic interfering structures, are now neglected and forbidden.

On the other hand, they could be implemented in future (considering a structural modification).

### MIDI-IN Interface

The MIDI-IN interface is neither properly a module nor a component: it is a background service, instead.

The `MidiContextManagerService` exposes methods for a correct communication with MIDI-IN devices, beyond the most useful and common functions for MIDI messages conversions.

Even in this case, the service sends messages to optional interested listeners containing the most relevant MIDI information.

### Prog-Sequencer

#### Data Model

The data model contains the following main data types:
- `IPitchClass`: this interface represents a pitch class, contains the `primaryName` field with default 'b' for accidental keys. Furthermore, provides a `value` (index) for the position of the pitch class within the chromatic scale starting from C (retrieved via `PitchClassesProvider` factory);
- `IPitch`: this interface exposes the `octave` related to the pitch class and evaluates the `frequency` of the pitch (retrieved via `PitchesProvider` factory);
- `IChordQuality`: this interface represents the quality of a chord, its `name` and the associated `value` (which is a binary mask of the quality built upon the chromatic scale);

- `Scale`: this class exploits a stack of intervals starting from the root pitch class in order to expose the `diatonicNotes` field which contains all of the pitch classes within the scale given the interval stack. All the scales start from the 4th octave;
- `Chord`: this class exploits the binary mask, starts from the root pitch class, generates the chromatic scale starting from the root and applies the mask. The purpose is to expose `chordNotes`: the set of pitches of the chord. All the chords start from the 4th octave and are in their basic form (with no inversions);

#### Features

The prog sequencer is both synchronized with the click and, like the MIDI-IN interface, capable of sending messages to listeners.

This last action is achieved via the `MidiContextManagerService` itself, following a sort of bus logic.

This option has been chosen to have a single source of messages of the same type.

The UI of the `ProgSequencerComponent` allows the state configuration:
- Progression selector: allows to select one of the default progressions (see 'Chord Substitution section');
- Difficulty selector: allows to select the difficulty of the substitutions performed (see 'Chord Substitution section');
- Play/Pause and Stop buttons: allow to handle the reproduction of the score;

Reproduction phases:
- Play: the prog sequencer begins to follow the click and once each 2/4 a chord is orderedly selected from the score. When a chord is selected, each note is sent to the listeners;
- Pause/Play: the prog sequencer stops the reproduction at the current time instant (it no longer follows the click) or restarts it from the correct chord;
- Stop: the prog sequencer stops the reproduction and resets the whole state, restarting from the beginning;

_To prevent unrealistic behaviours that would compromise the functionality of the following module (an internal poly-phonic oscillator), the duration of each chord is slightly altered. This choice is justified by the asynchronous nature of the 'stop chord' and by the unperceptiveness of such a temporal modification._

#### Chord Rendering

Chords are rendered using VexFlow (@http://www.vexflow.com), an open-source online music notation rendering API.
It uses SVG as a backend rendering engine.

Vexflow requires notes to be formatted in a particular way. The `ChordDisplayService` is devoted to this function. In particular, its main job is to find the correct note labels. 

The problem of note labels comes from the fact that the chromatic scale has twelve notes.
Each note can have a different label according to the chord it belongs to. Here we make use of the interval theory.
By the time we know a chord root and the notes that compose the chord voicing, we can extract every note label accordingly, including accidentals.
A separated display is used to show what chord is playing and what's coming next. 

### Oscillator

The Oscillator is the main sound generator of the synthesizer sound chain. Its aim is to take any midi signal, generated by a MIDI input keyboard or by the sequencer component, using the functions provided by the `MidiContextManagerService`, and to generate a corresponding audio signal: it is therefore also connected to the `AudioContextManagerService` providing the webAudio API functions to create oscillator and gain Nodes. 

Its UI is made of:
- 4 button switches to select the waveform (sine, square, triangular or sawtooth);
- a Volume Knob to control the volume of the output of the component
- a Coarse Tune knob, which allows to transpose the played note in an interval of [-12, +12] semitones;
- a Fine Tune knob, which allows fine tuning in an interval of [-10, +10] cents.

It implements polyphony using the class `Voice`, which keeps track of every input note generated by a midi controller or by the sequencer and their individual velocity. To avoid any interference between the inputs the sequencer communicates with the oscillator on the MidiChannel n.16, while the other midi controllers should use channels 1-15.
Every voice generated contains an oscillatorNode and a gainNode which charaterize a single note.
The oscillator has a single gainNode as output, to which all the internal voice gainNodes are connected.

The note envelope is generated via `ADSRComponent`

### ADSR Envelope

The ADSR generates the gain envelope which charaterizes every note generated by the oscillator component. The note envelope is applied inside the `Voice` class for every note using webAudio API functions, and is made of 4 parameters: attack time, decay time, sustain value, release time. 
The UI provides 2 circles which the user can move in a canvas, whose x axis indicates time and y axis indicate level:
- the first circle represents the attack time (x axis) and fixed attack level(y axis)
- the second circle represents the sustain value (y axis) and both release time (x axis, distance from canvas right margin) and decay time(x axis, distance from first point).

It uses `MessageService` to communicate its parameters to the oscillator component.

### Moog Ladder Filter

The component is an emulation of the traditional analog Moog Ladder Filter invented by Robert Moog and used in classic Moog Synthesizers. The filter is a 4 pole lowpass filter and its implementation is based on a custom DSP algorithm which emulates the stages of filtering and the feedback system.
It takes as input the gainNode provided by the output of the preceding component, and makes use of an audio buffer of 1024 samples to filter the sound stream.
The samples present in the audiobuffer are then processed inside the scriptProcessorNode, a webAudio API node made for custom audio processing.

The UI provides the user with 2 sliders to control:
- Cutoff frequency
- Resonance of the filter

The output of the component is still a gainNode.

### Biquadratic Filter

The UI of the `FilterComponent` allows the state configuration:
- Filter type selector: allows to choose among a variety of filter categories;
- Characterizing frequency knob;
- Resonance/quality factor knob.

Basically this filter wraps a `BiquadFilterNode` of the web audio api and allows the configuration of the parameters.

The configuration is done through `AudioParam` wrappers which handle an optional linear transformation between UI value and low level value (see `LFOComponent` for further details).

Both the frequency and the resonance can be modulated via `LFOComponent`.

### Amplifier

The UI of the `AmplifierComponent` allows the state configuration:
- Level knob;
- Balance knob;

Basically the amplifier wraps a `GainNode` followed by a `StereoPannerNode` of the web audio api and allows the configuration of the parameters.

Both the level and the balance can be modulated via `LFOComponent`.

### LFO Modulator

The UI of the `LFOComponent` allows the state configuration:
- Modulation wave shape selector: allows to choose among a variety of wave shapes;
- Modulation intensity knob: variation around the modulated parameter value (expressed in percentage);
- Modulation rate knob: sets the velocity of the variation above.

Basically the lfo wraps three successive nodes of the api:
- `OscillatorNode`;
- `ScriptProcessorNode`;
- `GainNode`.

As briefly mentioned, this component needed to cope with decimal values to handle intensity and rate, which unfortunately could not be handled directly via the sole angular knob component).

_In order to keep a simple connection logic, the communication between modulator and modulated modules is temporarily oversimplified. Future extensions might take in account a more complex service for information exchange._

#### Modulation Logic

The basic explanation of the modulation is the following:
- `OscillatorNode`: generates the basic wave selected with the wave shape selector at the given rate;
- `ScriptProcessorNode`: exploits the audio parameter value and variation range in order to alter the basic incoming wave.
The original sinusoid is unbalanced within the range [-1,1] depending on the initial value of the modulated parameter and on the intensity percentage;
- `GainNode`: finally amplifies the unbalanced wave, leading it back to the default parameter variation range.

_The `LFOComponent` code is furtherly detailed and self-explanatory._

#### Parameters Wrapping

As previously said, some parameters needed to be decimal.
In order to deal with this issue, the typescript `AudioParameter` module has been provided.

It is a basic script which exploits a couple of `AudioParameterDescriptors` to correctly set the lower level `AudioParam` value.

## Connections Among Modules

The connection of the synth modules is managed by the "AudioContextManager" service. This service provides a shared audio context that is accessible from all the components. It also contains methods to add, reorder and delete elements from the sound chain. It automatically updates all the connections everytime the user moves a synth module in the sound chain.

## Chord Substitution

### Rules

The algorithm used in the Prog Sequencer to implement chord substitution is based on the results provided "Surprising Harmonies" by Francois Pachet, International Journal on Computing Anticipatory Systems, 1999.

The paper addresses the modeling of surprise in Jazz harmonic progressions, and after having proposed some simple rules for substitution, by which combination any other substitution can be modeled, it focuses on how to learn these rules starting from a corpus of jazz chord sequences.

The information are extracted from the corpus using the Lempel-Ziv compression algorithm: this procedure is used to parse a sequence into distinct phrases, such that each phrase is the shortest string which is not a previously parsed one.
From the dictionary built that way, the LZ-tree is extracted: each node represents a possible substring and the sons of the nodes represent possible continuations of this substring.

In conclusion the number of sons is the probability of occurrence of the substring. This procedure is applied iteratively from the starting sequence comparing it at each step with the LZ-tree, and the chords are used as sequences of chord changes in order to bypass the problem of transposition.

This model is used to train a Machine Learning algorithm to induce chord substitution rules from a corpus of jazz chord changes, build using 76 sequences (52 tunes by Charlie Parker and 24 standard tunes from the Real Book) and creating sequences of changes corrisponding to 1-1, 1-2 and 2-2 rules.

### Builder

In this didactic program we aimed at building a sequence of continously changing chords starting from a given sequence of 4 chords, by exploiting the results of Francois Pachet's experiment.

The user is asked to select a chord sequence within a set of possibilities offered by a drop-down menu (the sequences are typical jazz progressions or taken from famous jazz standards) and a level of difficulty (easy-mid-pro).

He can also adjust parameters for the reproduction of the chord accompainment on the oscillator built in the component itself.

After pressing the play button the prog sequencer component starts playing the corresponding sequence, 2 chords per bar: at each turnaround one bar of chords is substituted with 1-1 or 1-2 rules taken from the Pachet results (section 4.3.1 and 4.3.2 of the paper) starting from the last bar and getting back till all of the original chords are substituted, except the first bar chord, and then rolling back the procedure until the original sequence is found back again.

Then the procedure is iterated until the user presses the stop button. During the whole process the user is expected to improvise on the chords proposed, using the sound chain of the main synthesizer, to practice improvisation on different chord sequences built by substitution, and to get new ideas on how to elaborate a given sequence. 

The difficulty level represents the likelihood of the substituting chords:
- level 1 (easy): uses the same chord but with different extensions, modal change of the same chord or chords sharing the same scale of the original one;
- level 2 (mid): uses all the rules of level 1, plus secondary dominants, and preparations;
- level 3 (pro): uses all the other levels rules plus tritone-substitution-like changes.

The rules are defined for each chord type proposed in the paper, and are defined in the `SubstitutionRules` file, along with the chord qualities provided in the `IChordQuality` interface.
