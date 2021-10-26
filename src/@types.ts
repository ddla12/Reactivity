export type Constructor = (new (...args: any[]) => any);

export type Types   = Record<string, Constructor>;

export interface DataProp {
    type    : Constructor,
    value?  : InstanceType<Constructor>
}

export interface Middlewares {
    getters?: MiddlewareCallbacks;
    setters?: MiddlewareCallbacks;
};

export type Data = Record<string, DataProp>;

export type Callbacks = Record<string, Function>;

export type ReactiveData = Record<string, any>;

export type Middleware = (target: object, prop: string, value: any) => boolean|void|Promise<void>;

export type Callback = (data?: any) => void|Promise<void>;

export type MiddlewareCallbacks = Record<string, Middleware>;

export type ReactiveCallback = Callbacks|Callback;

export interface ReactivityOptions {
    data            : Data;
    beforeUpdating? : ReactiveCallback;
    updated?        : ReactiveCallback;
    middlewares?    : Middlewares;
}