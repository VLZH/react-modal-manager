import { useEffect, useState } from "react";
import { Manager } from "./Manager";
import { HookReturns } from "./interfaces";

/**
 * Attach element to modal in modal manager
 * and get methods for open/close modals.
 * name is not required,  you can use this hook
 * only for access to methods without subscription.
 * @param {Manager} modalManager
 * @param {string?} modal_name name of modal
 */
export const useModalManager = (
    modalManager: Manager,
    modal_name: string
): HookReturns => {
    const [, update] = useState(0);
    useEffect(() => {
        if (modal_name) {
            modalManager.addModal(modal_name);
            modalManager.addSubscriber(modal_name, () => {
                update(Math.random());
            });
        }
        return () => {
            if (modal_name) {
                modalManager.removeSubscriber(modal_name);
            }
        };
    });
    return {
        openModal: (...args: Parameters<Manager["openModal"]>) =>
            modalManager.openModal(...args),
        closeModal: (...args: Parameters<Manager["closeModal"]>) =>
            modalManager.closeModal(...args),
        isOpen: (...args: Parameters<Manager["isOpen"]>) =>
            modalManager.isOpen(...args),
    };
};
