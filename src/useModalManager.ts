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
    modal_name?: string
): HookReturns => {
    const _modal_name = modal_name;
    const [, update] = useState(0);
    useEffect(() => {
        const subscriber_cb = () => {
            update(Math.random());
        };
        if (modal_name) {
            modalManager.addModal(modal_name);
            modalManager.addSubscriber(modal_name, subscriber_cb);
        }
        return () => {
            if (modal_name) {
                modalManager.removeSubscriber(modal_name, subscriber_cb);
            }
        };
    }, [modal_name]);
    return {
        openModal: (
            modal_name: string = _modal_name,
            close_other?: boolean
        ) => {
            modalManager.openModal(modal_name, close_other);
        },
        closeModal: (modal_name: string = _modal_name) =>
            modalManager.closeModal(modal_name),
        isOpen: (modal_name: string = _modal_name) =>
            modalManager.isOpen(modal_name),
    };
};
