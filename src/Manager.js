export class Manager {
    modals = [];
    open = [];
    subscribers = {};
    scroll_point = 0;

    addModal(modal_name) {
        this.modals.push(modal_name);
    }

    delModal(modal_name) {
        this.modals = this.modals.filter(m => m !== modal_name);
    }

    openModal(modal_name, close_other = true) {
        if (!this.include(modal_name)) {
            console.error(`manager do not have modal '${modal_name}'`);
        }
        if (close_other) {
            this.open = [];
        }
        this.open.push(modal_name);
        this.callSubscribers(modal_name);
        this.addBodyClass();
    }

    closeModal(modal_name) {
        if (!this.include(modal_name)) {
            console.error(`manager do not have modal '${modal_name}'`);
        }
        this.open = this.open.filter(m => m !== modal_name);
        this.callSubscribers(modal_name);
        this.removeBodyClass();
    }

    isOpen(modal_name) {
        if (!this.include(modal_name)) {
            console.error(`manager do not have modal '${modal_name}'`);
        }
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
        // this.subscribers = this.subscribers.filter(s => s !== subscriber);
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

    addBodyClass() {
        if (this.scroll_point) {
            return;
        }
        this.scroll_point = window.scrollY;
        document.querySelector(
            "#global_content"
        ).style.top = `-${this.scroll_point}px`;
        document.querySelector("body").classList.add("open_modal");
        window.scrollTo(0, 0);
    }

    removeBodyClass() {
        // setTimeout(() => {
        if (this.scroll_point === null) {
            return;
        }
        document.querySelector("#global_content").style.top = "0px";
        document.querySelector("body").classList.remove("open_modal");
        window.scrollTo(0, this.scroll_point);
        this.scroll_point = null;
    }
}
