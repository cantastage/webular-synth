import { IProgSequencer } from './IProgSequencer';
import { Scale } from '../Scale';
import { IHarmonization } from '../IHarmonization';
import { PitchClassesProvider } from '../PitchClassesProvider';
import { HarmonizationsProvider } from '../HarmonizationsProvider';
import { ProgMeasure } from './ProgMeasure';

export class ProgSequencer implements IProgSequencer {
    private _scale: Scale;
    private _measure: ProgMeasure;

    public get scale(): Scale {
        return this._scale;
    }
    public get measure(): ProgMeasure {
        return this._measure;
    }
    public get harmonization(): IHarmonization {
        return this.scale.harmonization;
    }

    public constructor() {
        // default initialization
        this._scale = new Scale(PitchClassesProvider.retrieveInstance('C'),
            HarmonizationsProvider.retrieveInstance('chromatic'));
    }
}
