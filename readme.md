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
- useModalManager
- withModalManager

# Example
[![Edit react-modal-manager](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/frosty-currying-ytyku?fontsize=14)

```javascript
import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { useModalManager } from "@vlzh/react-modal-manager";

Modal.setAppElement("#root");

const OpenModalButton = () => {
  // if we do not define name in useModalManager this button will not be subscribed on changes in manager
  const { openModal } = useModalManager();
  return (
    <button type="button" onClick={() => openModal("example_modal")}>
      Open modal
    </button>
  );
};

const App = props => {
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
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
```

# TODO
- Add callbacks
- API documentation
- Add tests for manager
