import { Type } from '@angular/core';

/**
 * Class which contains the type and the state of a synth module
 */
export class ModuleItem {
    constructor(public component: Type<any>, public data: Object) { }
}
