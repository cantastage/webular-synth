export interface SynthModule {
    data: any;
    isInSoundChain: boolean;
    position: number;
    loadPatch(): void;
    savePatch(): any;

    getInput(): AudioNode;
    getOutput(): AudioNode;
    connectSynthModule(inputModule: SynthModule): void;
    disconnectSynthModule(): void;
}
