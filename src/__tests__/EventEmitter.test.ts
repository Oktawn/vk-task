import { EventEmitter } from "../EventEmitter"


describe("testing EventEmitter", () => {
    let newEmitter: EventEmitter;
    beforeEach(() =>
        newEmitter = new EventEmitter()
    )
    it("add new element", () => {
        const eventName = "test";
        const listener = () => console.log("hello");

        newEmitter.on(eventName, listener);
        expect(newEmitter['events'][eventName]).toContain(listener);

    })

    it("should emit an event to the listeners", () => {
        const eventName = "test emit";
        const listener1 = (data: any) => { console.log(data) };
        const listener2 = function () { console.log("twice event") };

        newEmitter.on(eventName, listener1);
        newEmitter.on(eventName, listener2);

        const logSpy = jest.spyOn(global.console, "log");
        newEmitter.emit(eventName, "test data");
        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith("test data");
        expect(logSpy).toHaveBeenCalledWith("twice event");
        logSpy.mockRestore();
    });

    it("one more emit test", () => {
        const eventName = 'data';
        const logData = (data: any) => console.log(data);
        newEmitter.on(eventName, logData);

        const logSpy = jest.spyOn(global.console, "log");
        newEmitter.emit(eventName, { message: "hello" });
        expect(logSpy).toHaveBeenCalledWith({ message: "hello" });

        newEmitter.off(eventName, logData);

        expect(newEmitter['events'][eventName]).not.toContain(logData);
        logSpy.mockRestore();
    });

    it("should remove a listener from the event listeners", () => {
        const eventName = "test del";
        const listener1 = () => { console.log("list 1") };
        const listener2 = () => { console.log("list 2") };

        newEmitter.on(eventName, listener1);
        newEmitter.on(eventName, listener2);

        newEmitter.off(eventName, listener2);
        expect(newEmitter['events'][eventName]).toContain(listener1);
        expect(newEmitter['events'][eventName]).not.toContain(listener2);

    });


    it("should remove a listener that does not exist", () => {
        const eventName = "test del";
        const listener1 = () => { console.log("list 1") };
        const listener2 = () => { console.log("list 2") };
        const listener3 = () => { console.log("list 3") };

        newEmitter.on(eventName, listener1);
        newEmitter.on(eventName, listener2);

        newEmitter.off(eventName, listener3);
        expect(newEmitter['events'][eventName]).not.toContain(listener3);
        const logSpy = jest.spyOn(global.console, "log");
        newEmitter.emit(eventName);
        expect(logSpy).toHaveBeenCalledTimes(2);
        logSpy.mockRestore();
    });
})