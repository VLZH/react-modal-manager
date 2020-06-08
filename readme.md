# react-modal-manager

Manager for modals in your react application

![npm](https://img.shields.io/npm/dm/@vlzh/react-modal-manager) ![GitHub issues](https://img.shields.io/github/issues-raw/vlzh/react-modal-manager) ![npm bundle size](https://img.shields.io/bundlephobia/min/@vlzh/react-modal-manager)

# Installation

```bash
yarn add @vlzh/react-modal-manager
```

or

```bash
npm add @vlzh/react-modal-manager
```

# API

You can to manipulate with manager through 2 api:

-   `useModalManager(name: string)`
-   `withModalManager(name: string)`

⚠️You can to call `useModalManager` and `withModalManager` with providing `name` of modal... but there is one point! When you will provide `name` you just subscribe current component to `modalManager` + methods returned from `useModalManager` will be associated with specific modal.

they provide several methods:

-   `closeModal(name: string): void` - close modal with specific name
-   `openModal(name: string): void` - open modal with specific name
-   `isOpen(name: string): boolean` - get opening status for modal with specific name

# Events

In example bellow you can to see, how to subscribe on event. Supported events:

-   `beforeOpen`
-   `afterOpen`
-   `beforeClose`
-   `afterClose`

Any provided callback function will call with object like:

```
{
    modal_name: string
}
```

# Example

[![Edit react-modal-manager](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/frosty-currying-ytyku?fontsize=14)

```javascript
import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { useModalManager, manager } from "@vlzh/react-modal-manager";

// subscribe on event 'afterOpen'
manager.on("afterOpen", ({ modal_name }) => {
    console.log(`Modal ${modal_name} opened`);
});

Modal.setAppElement("#root");

const OpenModalButton = () => {
    // if we do not define name in useModalManager this button will not be subscribed on changes in manager, but you must to define modal_name on calling of openModal
    const { openModal } = useModalManager();
    return (
        <button type="button" onClick={() => openModal("example_modal")}>
            Open modal
        </button>
    );
};

const App = (props) => {
    const { isOpen, closeModal } = useModalManager("example_modal");
    return (
        <div>
            <OpenModalButton />
            <Modal
                isOpen={isOpen("example_modal")}
                onRequestClose={() => closeModal("example_modal")}
                contentLabel="Example Modal"
            >
                <h2>Hello</h2>
                <button onClick={() => closeModal("example_modal")}>
                    close
                </button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </Modal>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
```

# TODO

-   API documentation
