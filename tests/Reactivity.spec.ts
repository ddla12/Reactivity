import Reactivity from "../src/Reactivity";

jest.spyOn(console, "log");

describe("Reactivity", () => {
    const Reactive = new Reactivity({
        data: {
            msg: {
                type: String,
                value: "Hello world"
            },
            arr: {
                type: Array,
                value: []
            }
        },
        updated: () => {
            console.log("Updated");
        }
    });

    test("Initial states", () => {
        expect(Reactive.data.msg).toStrictEqual("Hello world");
        expect(Reactive.data.arr.length).toStrictEqual(0);
    });

    test("After a change", () => {
        Reactive.data.msg = "Darud Lingilien";
        Reactive.data.arr = ["Hello world"];

        expect(Reactive.data.msg).toStrictEqual("Darud Lingilien");
        expect(Reactive.data.arr.join("")).toStrictEqual("Hello world");    
    });

    test("'updated' has been called", () => {
        expect(console.log).toHaveBeenCalled();
    });

    test("'type' middleware is executed", () => {
        expect(() => { Reactive.data.msg = 1 }).toThrowError();
    });
});