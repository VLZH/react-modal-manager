import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { manager, useModalManager, withModalManager } from "../dist";
//import { manager, useModalManager, withModalManager } from "../src";

manager.on("beforeOpen", ({ modal_name }) => {
    console.log(modal_name);
});

Modal.setAppElement("#root");

const OpenModalButton = () => {
    // if we do not define name in useModalManager this button will not be subscribed on changes in manager
    const { openModal } = useModalManager();
    return (
        <button type="button" onClick={() => openModal("example_modal")}>
            Open modal (HOOK)
        </button>
    );
};

const OpenModalButtonWithHoc = withModalManager()(({ openModal }) => {
    return (
        <button type="button" onClick={() => openModal("example_modal")}>
            Open modal (HOC)
        </button>
    );
});

const App = (props) => {
    const { isOpen, closeModal } = useModalManager("example_modal");
    return (
        <div>
            <OpenModalButton />
            <OpenModalButtonWithHoc />
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
