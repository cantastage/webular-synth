interface IModulator extends IModule {
  // modulates which field?!
  /*
    for the chain-of-responsability-pattern, the modulator knows the modulated.
    it is responsability of the modulator to alter a certain parameter of the modulated.
    the annotation @configurable(true) on the modulable properties is useful?
    */
  // possible solution?
  // holds trace of the module it's attached to
  modulatedModule: ISoundGenerator;
  // but also of the field/property it can modify
  modulatedParameter: IModulableParameterFromMod;
}

/*
ISoundGenerator sg = new Oscillator(shape, level, coarse, fine);
    //ISG creates instances of IModulableParameterFromMod passing a modulable param and the related predicate
        //eg. level in [0, 1] -> ISG contains IModulableParameterFromMod _lvl =
                                        new IModulableParameterFromMod(level, _check)
        //where _check is a function (delegate) receiving a number and returning a boolean
IModulator m = new LFO(sg, sg.lvl, //accessor of sg to _lvl of type IModulableParameterFromMod
                    configVal1, configVal2...)
sg.start(); //does things like playing a note...
m.start(); //does things like modulating the level of the oscillator, but how?
    //depending on the modulation wave, calls iteratively m.modulatedParameter.modulateBy(waveValue)
    //which doesn't modify the original value of IModulableParameterFromMod, but saves a factor
    //the sg.start() iteration modifies in real-time ......TO FINISH HERE!
    //TRY OUT A MODULATION WITH CODEPEN!
    //FROM HERE ON https://codepen.io/anon/pen/gQQWOb
*/
