import { CallbackParams } from "./CallbackParams";

export interface ModalParams {
    [key: string]: unknown;
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

