import { ReactivityOptions } from "./@types.js";

const execMiddlewares = (
    callbacks: "getters"|"setters", 
    object: ReactivityOptions,
    target: Object,
    prop: string,
    receiver?: any,
): boolean|void => {
    if(!object.middlewares) return;

    try {
        if(object.middlewares[callbacks]) {
            return Object.values(object.middlewares[callbacks]!).every((c) => c(target, prop, receiver));
        }

        return true;
    } catch(e) {
        console.error(e);
    }
};

/**
 * Execute all callbacks in an reactive object
 * @param callbacks 
 * @param object 
 */
export const execCallbacks = (callbacks: "beforeUpdating"|"updated", object: ReactivityOptions): void => {
    (typeof object[callbacks] === "function")
        ? (object[callbacks] as Function)(object.data)
        : (Object.values(object[callbacks]!).forEach((callback) => callback(object.data)));
};

/**
 * Create a new reactive object, creating a Proxy
 * @param data 
 * @returns A reactive object
 */
export function setReactivity(data: ReactivityOptions) {
    return new Proxy(data.data, {
        get: (obj, prop: string, val) => {
            if(!execMiddlewares("getters", data, obj, prop, val)) {
                throw Error("Some of your middlewares didn't passed");
            };

            return Reflect.get(obj, prop);
        },
        set: (obj, prop: string, value) => {
            if(!execMiddlewares("setters", data, obj, prop, value)) {
                throw Error("Some of your middlewares didn't passed");
            };

            execCallbacks("beforeUpdating", data);

            Reflect.set(obj, prop, value);

            execCallbacks("updated", data);

            return true;
        },
    });
};
