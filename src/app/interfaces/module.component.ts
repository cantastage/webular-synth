export interface SynthModule {
    data: any;
    isInSoundChain: boolean; // TODO aggiungere get e set
    position: number;
    loadPatch(): void;
    savePatch(): any;

    getInput(): AudioNode;
    getOutput(): AudioNode;
    connectSynthModule(inputModule: SynthModule);
    disconnectSynthModule(): void;
}
