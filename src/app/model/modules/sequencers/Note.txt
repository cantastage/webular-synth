// export class Note {
//     public static readonly FREQUENCY_MIN = 50; // MAYBE SHOULD HAVE DIFFERENT BOUNDARIES?!?! ONLY FOR THE 4th OCT?
//     public static readonly FREQUENCY_MAX = 20000;

//     private _frequency: number;
//     private _name: string;
//     private _enharmonicName: string;

//     public get frequency(): number {
//         return this._frequency;
//     }
//     public set frequency(frequency: number) {
//         if (frequency < Note.FREQUENCY_MIN || frequency > Note.FREQUENCY_MAX ) {
//             throw new Error('error while assigning the frequency value');
//         }
//         this._frequency = frequency;
//     }
//     public get name(): string {
//         return this._name;
//     }
//     public set name(name: string) {
//         if (name == null || name === '') {
//             throw new Error('error while assigning the name value');
//         }
//         this._name = name;
//     }
//     public get enharmonicName(): string {
//         return this._enharmonicName;
//     }
//     public set enharmonicName(enharmonicName: string) {
//         if (enharmonicName == null || enharmonicName === '') {
//             throw new Error('error while assigning the enharmonicName value');
//         }
//         this._enharmonicName = enharmonicName;
//     }

//     public constructor(frequency: number, name: string, enharmonicName: string) {
//         this.frequency = frequency;
//         this.name = name;
//         this.enharmonicName = enharmonicName;
//     }
// }
