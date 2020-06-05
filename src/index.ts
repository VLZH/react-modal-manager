import { Manager } from "./Manager";
import { useModalManager as _useModalManager } from "./useModalManager";
import { withModalManager as _withModalManager } from "./withModalManager";

export const manager = new Manager();

/**
 * Create new hook with predefined manager
 * @param {string?} name the same as in original useModalManager
 */
export const useModalManager = (
    name: string
): ReturnType<typeof _useModalManager> => {
    return _useModalManager(manager, name);
};

/**
 * Create new HOC with predefined manager
 * @param {string?} name the same as in original withModalManager
 */
export const withModalManager = (
    name: string
): ReturnType<typeof _withModalManager> => _withModalManager(manager, name);
