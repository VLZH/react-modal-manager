import { useEffect, useState } from "react";

/**
 * Attach element to modal in modal manager
 * and get methods for open/close modals.
 * name is not required,  you can use this hook
 * only for access to methods without subscription.
 * @param {Manager} modalManager
 * @param {string?} name name of modal
 */
export const useModalManager = (modalManager, name) => {
    const [, update] = useState(0);
    useEffect(() => {
        if (name) {
            modalManager.addSubscriber(name, () => {
                update(Math.random());
            });
        }
        return () => {
            if (name) {
                modalManager.removeSubscriber(name);
            }
        };
    });
    return {
        openModal: (...args) => modalManager.openModal(...args),
        closeModal: (...args) => modalManager.closeModal(...args),
        isOpen: (...args) => modalManager.isOpen(...args)
    };
};
