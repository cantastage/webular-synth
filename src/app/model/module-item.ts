import { Type } from '@angular/core';

export class ModuleItem {
    constructor(public component: Type<any>, public data: any) { }
}
