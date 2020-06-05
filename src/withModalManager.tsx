import * as React from "react";
import { useModalManager } from "./useModalManager";
import { Manager } from "./Manager";

/**
 * HOC for access to methods of manager and subscribe on changes in it
 * @param {Manager} modalManager
 * @param {string?} name
 */
export const withModalManager = (modalManager: Manager, name: string): any => (
    ComposedComponent: React.FunctionComponent | React.ClassicComponentClass
) => {
    const WithModalManagerWrapper: React.FunctionComponent<any> = (
        props: any
    ) => {
        const methods = useModalManager(modalManager, name);
        return <ComposedComponent {...methods} {...props} />;
    };

    const display_name =
        ComposedComponent.displayName || ComposedComponent.name || "Unknown";
    WithModalManagerWrapper.displayName = `withModalManager(${display_name})`;
    return WithModalManagerWrapper;
};
