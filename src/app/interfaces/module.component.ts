export interface SynthModule {
    data: any;
    isInSoundChain: boolean; // TODO aggiungere get e set
    position: number;
    loadPatch(): void;
    savePatch(): any;

    getInput(): AudioNode;
    getOutput(): AudioNode;
    connectToSynthNode(module: SynthModule); // TODO pass synth module
    disconnectSynthModule(): void;
}
