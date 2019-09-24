# react-modal-manager
Manager for modals in your react application

# Installation
```bash
yarn add @vlzh/react-modal-manager
```
or
```bash
npm add @vlzh/react-modal-manager
```

# API
- useModalManager
- withModalManager

# Example
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { useModalManager } from "react-modal-manager";

Modal.setAppElement('#yourAppElement')

const OpenModalButton = () => {
    // if we do not define name in useModalManager this button will not be subscribed on changes in manager
    cosnt { openModal } = useModalManager();
    return (
        <button
            type="button"
            onClick={() => openModal("example_modal")}
        >
            Open modal
        <button>
    )
}

const App = (props) => {
    cosnt { isOpen, closeModal } = useModalManager("example_modal");
    return (
        <div>
            <Modal
                isOpen={isOpen("example_modal")}
                onRequestClose={() => closeModal("example_modal")}
                contentLabel="Example Modal"
            >
                <h2>Hello</h2>
                <button onClick={() => closeModal("example_modal")}>close</button>
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
    )
}

ReactDOM.render(<App />, appElement);
```

# TODO
- API documentation
- Example on codesandbox.io
