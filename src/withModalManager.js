import React from "react";
import { useModalManager } from "./useModalManager";

/**
 * HOC for access to methods of manager and subscribe on changes in it
 * @param {Manager} modalManager
 * @param {string?} name
 */
export const withModalManager = (modalManager, name) => ComposedComponent => {
    const WithModalManagerWrapper = props => {
        const methods = useModalManager(modalManager, name);
        return <ComposedComponent {...methods} {...props} />;
    };

    const display_name =
        ComposedComponent.displayName || ComposedComponent.name || "Unknown";
    WithModalManagerWrapper.displayName = `withModalManager(${display_name})`;
    return WithModalManagerWrapper;
};
