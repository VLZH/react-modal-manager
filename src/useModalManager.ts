import { useEffect, useState } from "react";
import { ModalParams } from "./interfaces";
import { Manager } from "./Manager";

const createUndefinedModalError = (method_name: string) =>
    new Error(
        `You must provide modal name in 'useModalManage' otherwise in method '${method_name}'`
    );

/**
 * Attach element to modal in modal manager
 * and get methods for open/close modals.
 * name is not required,  you can use this hook
 * only for access to methods without subscription.
 * @param {Manager} modalManager
 * @param {string?} modal_name name of modal
 */
export const useModalManager = (modalManager: Manager, modal_name?: string) => {
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
            modal_name: string | undefined = _modal_name,
            close_other?: boolean,
            params?: ModalParams
        ) => {
            if (!modal_name) throw createUndefinedModalError("openModal");
            return modalManager.openModal(modal_name, close_other, params);
        },
        closeModal: (modal_name: string | undefined = _modal_name) => {
            if (!modal_name) throw createUndefinedModalError("closeModal");
            return modalManager.closeModal(modal_name);
        },
        isOpen: (modal_name: string | undefined = _modal_name) => {
            if (!modal_name) throw createUndefinedModalError("isOpen");
            return modalManager.isOpen(modal_name);
        },
        getParams: (modal_name: string | undefined = _modal_name) => {
            if (!modal_name) throw createUndefinedModalError("getParams");
            return modalManager.getParams(modal_name);
        },
    };
};
