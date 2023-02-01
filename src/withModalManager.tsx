import * as React from "react";
import {useModalManager} from "./useModalManager";
import {Manager} from "./Manager";

type ComposedComponentType<T> = React.FunctionComponent<T> | React.ClassicComponentClass<T>;

/**
 * Higher Order Component that provides access to methods in the modal manager and subscribes to updates.
 * @param {Manager} modalManager - The instance of the modal manager.
 * @param {string} [name] - The name of the modal to subscribe to updates for.
 * @param {ComposedComponentType<T>} ComposedComponent - The component to be composed with the modal manager.
 * @returns {React.FunctionComponent<T>} A new component that has access to the modal manager's methods and is subscribed to updates for the specified modal.
 */
export const withModalManager = <T, >(
    modalManager: Manager,
    name: string | undefined
) => (
        ComposedComponent: ComposedComponentType<T>
    ): React.FunctionComponent<T> => {
        const WithModalManagerWrapper: React.FunctionComponent<T> = (
            props: T
        ) => {
            const methods = useModalManager(modalManager, name);
            return <ComposedComponent {...methods} {...props} />;
        };

        const display_name = ComposedComponent.displayName || ComposedComponent.name || "Unknown";
        WithModalManagerWrapper.displayName = `withModalManager(${display_name})`;

        return WithModalManagerWrapper;
    };
