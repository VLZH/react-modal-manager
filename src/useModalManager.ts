import {useEffect, useMemo, useState} from "react";
import {ModalParams} from "./interfaces";
import {Manager} from "./Manager";

const createUndefinedModalError = (method_name: string) =>
    new Error(
        `You must provide modal name in 'useModalManage' otherwise in method '${method_name}'`
    );

interface ManagerWrapper {
    isOpen: (modal_name?: (string | undefined)) => boolean;
    openModal: (modal_name?: (string | undefined), close_other?: boolean, params?: ModalParams) => void;
    closeModal: (modal_name?: (string | undefined)) => void;
    getParams: (modal_name?: (string | undefined)) => ModalParams | null;
}

/**
 * Attaches an element to a modal in the modal manager and returns methods for opening and closing the modal.
 * @param {Manager} modalManager - The instance of the modal manager.
 * @param {string} [modal_name] - The name of the modal to be attached. If provided, the hook will subscribe to updates for the modal.
 * @returns {object} An object containing methods for opening and closing modals, checking if a modal is open, and retrieving the parameters for a modal.
 */
export const useModalManager = (modalManager: Manager, modal_name?: string): ManagerWrapper => {
    const _modal_name = modal_name;
    const [, update] = useState(0);
    useEffect(() => {
        if (!modal_name) {
            return;
        }
        const subscriber_cb = () => update(Math.random());

        modalManager.addModal(modal_name);

        return modalManager.addSubscriber(modal_name, subscriber_cb);
    }, [modal_name]);

    return useMemo(() => ({
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
    }), [modalManager]);
};
