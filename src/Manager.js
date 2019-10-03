const ALLOWED_EVENTS = ["afterOpen", "beforeOpen", "afterClose", "beforeClose"];

class CallbackParams {
    constructor(modal_name) {
        this.modal_name = modal_name;
    }
}

export class Manager {
    modals = [];
    open = [];
    subscribers = {};
    //
    callbacks = {
        afterOpen: [],
        beforeOpen: [],
        afterClose: [],
        beforeClose: []
    };
    // meta
    scroll_point = 0;

    addModal(modal_name) {
        if (this.include(modal_name)) return;
        this.modals.push(modal_name);
    }

    delModal(modal_name) {
        this.modals = this.modals.filter(m => m !== modal_name);
    }

    openModal(modal_name, close_other = true) {
        if (!this.include(modal_name)) {
            throw new Error(`manager do not have modal '${modal_name}'`);
        }
        this.callbacks.beforeOpen.forEach(cb =>
            cb(new CallbackParams(modal_name))
        );
        if (close_other) {
            this.open = [];
        }
        this.open.push(modal_name);
        this.callSubscribers(modal_name);
        this.callbacks.afterOpen.forEach(cb =>
            cb(new CallbackParams(modal_name))
        );
    }

    closeModal(modal_name) {
        if (!this.include(modal_name)) {
            throw new Error(`manager do not have modal '${modal_name}'`);
        }
        this.callbacks.beforeClose.forEach(cb =>
            cb(new CallbackParams(modal_name))
        );
        this.open = this.open.filter(m => m !== modal_name);
        this.callSubscribers(modal_name);
        this.callbacks.afterClose.forEach(cb =>
            cb(new CallbackParams(modal_name))
        );
    }

    isOpen(modal_name) {
        return this.open.includes(modal_name);
    }

    include(modal_name) {
        return this.modals.includes(modal_name);
    }

    addSubscriber(name, subscriber) {
        this.subscribers[name] = subscriber;
    }

    removeSubscriber(name) {
        delete this.subscribers[name];
    }

    callSubscribers(name) {
        for (let k in this.subscribers) {
            if (!name) {
                this.subscribers[k]();
            } else if (name === k) {
                this.subscribers[k]();
            }
        }
    }

    on(event, cb) {
        if (!ALLOWED_EVENTS.includes(event)) {
            throw new Error(`Unknown event ${event}`);
        }
        this.callbacks[event].push(cb);
    }
}
