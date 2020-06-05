import { ModalsList, Event, Callbacks, Subscribers, CallbackFunction } from "./interfaces";
import { CallbackParams } from "./CallbackParams";

const ALLOWED_EVENTS: Event[] = [
    "afterOpen",
    "beforeOpen",
    "afterClose",
    "beforeClose",
];


export class Manager {
    modals: ModalsList = [];
    open: ModalsList = [];
    subscribers: Subscribers = {};
    //
    callbacks: Callbacks = {
        afterOpen: [],
        beforeOpen: [],
        afterClose: [],
        beforeClose: [],
    };
    // meta
    scroll_point = 0;

    /**
     * Register new modal
     */
    addModal(modal_name: string): void {
        if (this.include(modal_name)) return;
        this.modals.push(modal_name);
    }

    /**
     * Remove modal with specific name
     */
    delModal(modal_name: string): void {
        this.modals = this.modals.filter((m) => m !== modal_name);
    }

    /**
     * Open modal with specific name and close another modals if <close_other> is true
     */
    openModal(modal_name: string, close_other = true): void {
        if (!this.include(modal_name)) {
            throw new Error(`manager do not have modal '${modal_name}'`);
        }
        this.callbacks.beforeOpen.forEach((cb) =>
            cb(new CallbackParams(modal_name))
        );
        if (close_other) {
            this.open = [];
        }
        this.open.push(modal_name);
        this.callSubscribers(modal_name);
        this.callbacks.afterOpen.forEach((cb) =>
            cb(new CallbackParams(modal_name))
        );
    }

    /*
     * Close the modal with specific name
     */
    closeModal(modal_name: string): void {
        if (!this.include(modal_name)) {
            throw new Error(`manager do not have modal '${modal_name}'`);
        }
        this.callbacks.beforeClose.forEach((cb) =>
            cb(new CallbackParams(modal_name))
        );
        this.open = this.open.filter((m) => m !== modal_name);
        this.callSubscribers(modal_name);
        this.callbacks.afterClose.forEach((cb) =>
            cb(new CallbackParams(modal_name))
        );
    }

    /*
     * Define modal with name <modal_name> is opened
     */
    isOpen(modal_name: string): boolean {
        return this.open.includes(modal_name);
    }

    /**
     * Name already exist in manager
     */
    private include(modal_name: string): boolean {
        return this.modals.includes(modal_name);
    }

    /**
     * Register function for modal, that will call on change of this modal
     */
    addSubscriber(name: string, subscriber: () => unknown): void {
        this.subscribers[name] = subscriber;
    }

    /**
     * Remove subscriber for specific modal
     */
    removeSubscriber(name: string): void {
        delete this.subscribers[name];
    }

    /**
     * Call all registred subscribers for specific modal
     */
    private callSubscribers(name: string) {
        for (const k in this.subscribers) {
            if (!name) {
                this.subscribers[k]();
            } else if (name === k) {
                this.subscribers[k]();
            }
        }
    }

    /**
     * Register new callback for event
     */
    on(event: Event, cb: CallbackFunction): void {
        if (!ALLOWED_EVENTS.includes(event)) {
            throw new Error(`Unknown event ${event}`);
        }
        this.callbacks[event].push(cb);
    }
}
