import { execCallbacks, setReactivity } from "./Helpers.js";
export class Reactivity {
    constructor(options) {
        ({ beforeUpdating: this.beforeUpdating, updated: this.updated, middlewares: this.middlewares } = options);
        this.data = this.makeDataReactive(options.data);
        this.types = this.getTypeOfData(options.data);
        Object.seal(this);
    }
    ;
    makeDataReactive(data) {
        Object.values(data).some((prop) => {
            if (prop.type === undefined) {
                console.warn(`Data '${prop}' doesn't have a 'type' property, you should give it one`);
                return false;
            }
        });
        return setReactivity({
            data,
            beforeUpdating: () => {
                (this.beforeUpdating) && execCallbacks("beforeUpdating", this);
            },
            updated: () => {
                (this.updated) && execCallbacks("updated", this);
            },
            middlewares: {
                setters: {
                    type: (_, prop, value) => {
                        if (this.types[prop].name !== value.constructor.name) {
                            console.warn(`Should not assign type ${value.constructor.name} to type ${this.types[prop].name}`);
                            return false;
                        }
                        return true;
                    },
                    ...this.middlewares?.setters
                },
                getters: this.middlewares?.getters
            }
        });
    }
    ;
    getTypeOfData(data) {
        return Object.entries(data).reduce((prev, [key, val]) => ({ ...prev, [key]: val.type }), {});
    }
    ;
}
