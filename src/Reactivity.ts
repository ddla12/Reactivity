import { Data, ReactiveData, Types, ReactivityOptions, ReactiveCallback, Middlewares } from "./@types";
import { execCallbacks, setReactivity } from "./Helpers";

/**
 * Class to create reactive objects, with middlewares and callbacks
 * @class
 */
export default class Reactivity implements ReactivityOptions {
    data            : ReactiveData;
    beforeUpdating? : ReactiveCallback;
    updated?        : ReactiveCallback;
    middlewares?    : Middlewares;
    readonly types  : Types;

    constructor(options: ReactivityOptions) {
        ({ beforeUpdating: this.beforeUpdating, updated: this.updated, middlewares: this.middlewares } = options);

        this.data   = this.makeDataReactive(options.data);
        this.types  = this.getTypeOfData(options.data);

        Object.seal(this);
    };

    /**
     * Create a reactive data, with all middlewares and callbacks
     * @param data 
     * @returns Reactive data
     */
    makeDataReactive(data: Data): ReactiveData {
        Object.values(data).some((prop) => {
            if(prop.type === undefined) {
                console.warn(`Data '${prop}' doesn't have a 'type' property, you should give it one`);
                return false;
            }
        })

        return setReactivity({
            data: Object.entries(data).reduce((prev, [key, props]) => ({ ...prev, [key]: props.value }), {}),
            beforeUpdating: () => {
                (this.beforeUpdating) && execCallbacks("beforeUpdating", this);
            },
            updated: () => {
                (this.updated) &&  execCallbacks("updated", this);
            },
            middlewares: {
                setters: {
                    type: (_, prop, value) => {
                        if(this.types[prop].name !== value.constructor.name) {
                            console.warn(
                                `Should not assign type ${value.constructor.name} to type ${this.types[prop].name}`
                            );
                            return false;
                        }

                        return true;
                    },
                    ...this.middlewares?.setters
                },
                getters: this.middlewares?.getters
            }
        });
    };

    /**
     * Extract all types in the data properties
     * @param data 
     * @returns An object with the property types of data
     */
    getTypeOfData(data: Data): Types {
        return Object.entries(data).reduce((prev, [key, val]) => ({ ...prev, [key]: val.type }), {});
    };
}