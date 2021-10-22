const execMiddlewares = (callbacks, object, target, prop, receiver) => {
    if (!object.middlewares)
        return;
    try {
        if (object.middlewares[callbacks]) {
            return Object.values(object.middlewares[callbacks]).every((c) => c(target, prop, receiver));
        }
        return true;
    }
    catch (e) {
        console.error(e);
    }
};
export function execCallbacks(callbacks, object) {
    (typeof object[callbacks] === "function")
        ? object[callbacks](object.data)
        : (Object.values(object[callbacks]).forEach((callback) => callback(object.data)));
}
;
export function setReactivity(data) {
    return new Proxy(data.data, {
        get: (obj, prop, val) => {
            if (!execMiddlewares("getters", data, obj, prop, val)) {
                throw Error("Some of your middlewares didn't passed");
            }
            ;
            return Reflect.get(obj, prop);
        },
        set: (obj, prop, value) => {
            if (!execMiddlewares("setters", data, obj, prop, value)) {
                throw Error("Some of your middlewares didn't passed");
            }
            ;
            execCallbacks("beforeUpdating", data);
            Reflect.set(obj, prop, value);
            execCallbacks("updated", data);
            return true;
        },
    });
}
;
