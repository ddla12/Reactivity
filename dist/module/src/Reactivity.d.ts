import { Data, ReactiveData, Types, ReactivityOptions, ReactiveCallback, Middlewares } from "./@types.js";
export declare class Reactivity implements ReactivityOptions {
    data: ReactiveData;
    beforeUpdating?: ReactiveCallback;
    updated?: ReactiveCallback;
    middlewares?: Middlewares;
    readonly types: Types;
    constructor(options: ReactivityOptions);
    makeDataReactive(data: Data): ReactiveData;
    getTypeOfData(data: Data): Types;
}
