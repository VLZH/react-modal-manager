import { Manager } from "./Manager";
import { useModalManager as _useModalManager } from "./useModalManager";
import { withModalManager as _withModalManager } from "./withModalManager";

const manager = new Manager();

/**
 * Create new hook with predefined manager
 * @param {string?} name the same as in original useModalManager
 */
const useModalManager = name => {
    return _useModalManager(manager, name);
};

/**
 * Create new HOC with predefined manager
 * @param {string?} name the same as in original withModalManager
 */
const withModalManager = name => _withModalManager(manager, name);

export { manager, useModalManager, withModalManager };
