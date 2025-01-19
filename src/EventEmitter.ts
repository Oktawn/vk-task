type Listener = (...args: any[]) => void;
type Key = string | symbol;

export class EventEmitter {
    private events: { [key in Key]?: Listener[] } = {};

    on(eventName: Key, listener: Listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = [listener];
        } else {
            this.events[eventName]?.push(listener);
        }
    }
    emit(eventName: Key, data?: any) {
        const listeners = this.events[eventName];
        listeners?.forEach(fn => fn(data));
    }

    off(eventName: Key, listener: Listener) {
        const deleteEvents = this.events[eventName]?.filter(fn => fn !== listener);
        if (deleteEvents)
            this.events[eventName] = deleteEvents;


    }
}
