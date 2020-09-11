import {
    ModalsList,
    Modal,
    ModalParams,
    OpenModalsList,
    Event,
    Callbacks,
    Subscribers,
    CallbackFunction,
    OpenModal,
} from "./interfaces";
import { CallbackParams } from "./CallbackParams";

const ALLOWED_EVENTS: Event[] = [
    "afterOpen",
    "beforeOpen",
    "afterClose",
    "beforeClose",
];

export class Manager {
    modals: ModalsList = [];
    open: OpenModalsList = [];
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
    addModal(modal_name: string, default_params: ModalParams = {}): void {
        const modal = this.getModalByName(modal_name);
        if (modal) return;
        this.modals.push({
            name: modal_name,
            default_params: default_params,
        });
        this.subscribers[modal_name] = [];
    }

    /**
     * Remove modal with specific name
     */
    delModal(modal_name: string): void {
        this.modals = this.modals.filter((m) => m.name !== modal_name);
        this.open = this.open.filter((m) => m.name !== modal_name);
        delete this.subscribers[modal_name];
    }

    /**
     * Get registred modal
     * @param modal_name {string} name of modal
     */
    getModalByName(modal_name: string): Modal | undefined {
        return this.modals.find((m) => m.name === modal_name);
    }

    /**
     * Open modal with specific name and close another modals if <close_other> is true
     */
    openModal(
        modal_name: string,
        close_other = true,
        params?: ModalParams
    ): void {
        const modal = this.getModalByName(modal_name);
        if (!modal) {
            throw new Error(`manager do not have modal '${modal_name}'`);
        }
        this.callbacks.beforeOpen.forEach((cb) =>
            cb(new CallbackParams(modal_name))
        );
        if (close_other) {
            for (const opened_modal of this.open) {
                this.closeModal(opened_modal.name);
            }
        }
        this.open.push({
            name: modal.name,
            params: params || modal.default_params,
        });
        this.callSubscribers(modal_name);
        this.callbacks.afterOpen.forEach((cb) =>
            cb(new CallbackParams(modal_name))
        );
    }

    /*
     * Close the modal with specific name
     */
    closeModal(modal_name: string): void {
        const modal = this.getModalByName(modal_name);
        if (!modal) {
            throw new Error(
                `manager do not have modal with name '${modal_name}'`
            );
        }
        this.callbacks.beforeClose.forEach((cb) =>
            cb(new CallbackParams(modal_name))
        );
        this.open = this.open.filter((m) => m.name !== modal_name);
        this.callSubscribers(modal_name);
        this.callbacks.afterClose.forEach((cb) =>
            cb(new CallbackParams(modal_name))
        );
    }

    /*
     * Define modal with name <modal_name> is opened
     */
    isOpen(modal_name: string): boolean {
        const open_modal = this.open.find((m) => m.name === modal_name) as
            | OpenModal
            | undefined;
        return !!open_modal;
    }

    /**
     * Get parameters of opened modal, if modal is closed result will be 'null'
     * @param modal_name name of modal
     * @returns {Object|Null}
     */
    getParams(modal_name: string): ModalParams | null {
        const open_modal = this.open.find((m) => m.name === modal_name) as
            | OpenModal
            | undefined;
        return open_modal?.params || null;
    }

    /**
     * Register function for modal, that will call on change of this modal
     */
    addSubscriber(modal_name: string, subscriber: () => unknown): void {
        this.subscribers[modal_name].push(subscriber);
    }

    /**
     * Remove subscriber for specific modal
     * Note: if all subscribers for modal_name are deleted, modal will be deleted
     */
    removeSubscriber(modal_name: string, subscriber: () => unknown): void {
        this.subscribers[modal_name] = this.subscribers[modal_name].filter(
            (s) => s !== subscriber
        );
        // Delete modal if it do not have subscribers
        if (this.subscribers[modal_name].length === 0) {
            this.delModal(modal_name);
        }
    }

    /**
     * Call all registred subscribers for specific modal
     */
    private callSubscribers(modal_name: string) {
        if (!Object.keys(this.subscribers).includes(modal_name)) {
            throw new Error(`Subscribers for '${modal_name} not defined'`);
        }
        for (const subscriber of this.subscribers[modal_name]) {
            subscriber();
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
