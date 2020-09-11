import { CallbackParams } from "./CallbackParams";

export interface ModalParams {
    [key: string]: any;
}

export interface Modal {
    name: string;
    default_params: ModalParams;
}

export type ModalsList = Modal[];

export interface OpenModal {
    name: string;
    params: ModalParams;
}

export type OpenModalsList = OpenModal[];

export type Event = "afterOpen" | "beforeOpen" | "afterClose" | "beforeClose";

export type CallbackFunction = (cb_params: CallbackParams) => unknown;

export type Callbacks = {
    [key in Event]: CallbackFunction[];
};

export type Subscribers = {
    [key: string]: (() => void)[];
};

export interface HookReturns {
    openModal: (modal_name?: string, close_other?: boolean) => void;
    closeModal: (modal_name?: string) => void;
    isOpen: (modal_name?: string) => boolean;
    getParams: (modal_name?: string) => ModalParams | null;
}
