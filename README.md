# WebularSynth

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Introduction

WebularSynth borns as an Angular web-application.

It is a modular synthesizer designed for passionate musicians, exploiting the parallelism between Angular components and real modules of a synthesizer.

## The Modules & The Corresponding Components

### Clock

As in all the most known synthesizers, the clock module is a single instance which can be observed by objects who might desire a synchronization.

In our case, the sole module which needs temporization is the harmonic/melodic sequencer.

**The `ClockComponent` builds an `IClock` instance thanks to the `ClockManagerService` service and the `ClockProvider` factory.**

Further extensions, such as coexisting clocks for poly-harmonic/melodic interfering structures, are now neglected and forbidden.

On the other hand, they could be implemented in future (considering a structural modification).

### MIDI-IN Interface

The MIDI-IN interface is neither properly a module nor a component: it is a background service, instead.

The `MidiContextManagerService` exposes methods for a correct communication with MIDI-IN devices, beyond the most useful and common functions for MIDI messages conversions.

Even in this case, the service sends messages to optional interested listeners containing the most relevant MIDI information.

### Sequencer

The sequencer is both synchronized with the click and, like the MIDI-IN interface, capable of sending messages to listeners.

This last action is achieved via the `MidiContextManagerService` itself, following a sort of bus logic, which in future could be extended with MIDI channels discrimination.

This option has been chosen to have a single source of messages of the same type.

The UI of the `SequencerComponent` allows the state configuration:
- Key selector: allows the choice of an item `IPitchClass` provided by the fly-weight factory `PitchClassesProvider`;
- Harmonization selector: allows the choice of an item `IHarmonization` provided by the factory `HarmonizationsProvider` which can be easily extended with new harmonizations via scale pattern;
- Metric selector: allows to add more and more 4^th subdivisions to the measure.

Depending on Key and Harmonization, a `Scale` object is built.

Each `Subdivision` of the `Measure` is characterized by a set of 'octave' values (vertical cells) and the duration. The velocity could be added.

(both duration and velocity could be set, with different granularity, on cells or subdivisions)

Eventually, the `Sequencer` joins the `Scale` and `Measure` concepts, giving an overall musical acceptation.

We recall the sequencer to follow the click, each beat leads to the 'selection' of a different subdivision.

When a subdivision is selected, each 'active note' is sent to the listeners.

_To prevent unrealistic behaviours that would compromise the functionality of the following module (generally a poly-phonic oscillator), the duration of each note is altered.
This choice is justified by the asynchronous nature of the 'stop note' and by the unperceptiveness of such a temporal modification._

### Poly-phonic Oscillator



### ADSR Envelop



### Custom MoogLadderFilter



### Filter

The UI of the `FilterComponent` allows the state configuration:
- Filter type selector: allows to choose among a variety of filter categories;
- Characterizing frequency knob;
- Resonance/quality factor knob.

~~Both the frequency and the resonance can be modulated via `LFOComponent`.~~

### Final Amplifier ~~(singleton provider)~~

The UI of the `AmplifierComponent` allows the state configuration:
- Final level knob;
- Pan knob;

~~Both the level and the pan can be modulated via `LFOComponent`.~~

### LFO Modulator

~~The UI of the `LFOComponent` allows the state configuration:
- FM wave shape selector: allows to choose among a variety of wave shapes;
- FM intensity knob: variation around the modulated parameter value;
- FM rate knob: sets the velocity of the variation above.

**FINISH HERE OR IN MODULATION SECTION**~~

## Sound chain



## Modulation



## Conclusion


