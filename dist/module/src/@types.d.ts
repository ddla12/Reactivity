export declare type Constructor = (new (...args: any[]) => any);
export declare type Types = Record<string, Constructor>;
export interface DataProp {
    type: Constructor;
    value?: InstanceType<Constructor>;
}
export interface Middlewares {
    getters?: MiddlewareCallbacks;
    setters?: MiddlewareCallbacks;
}
export declare type Data = Record<string, DataProp>;
export declare type Callbacks = Record<string, Function>;
export declare type ReactiveData = Record<string, any>;
export declare type Middleware = (target: object, prop: string, value: any) => boolean | void;
export declare type Callback = (data?: any) => void;
export declare type MiddlewareCallbacks = Record<string, Middleware>;
export declare type ReactiveCallback = Callbacks | Callback;
export interface ReactivityOptions {
    data: Data;
    beforeUpdating?: ReactiveCallback;
    updated?: ReactiveCallback;
    middlewares?: Middlewares;
}
