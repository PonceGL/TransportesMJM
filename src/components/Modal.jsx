import React from "react";
import ReactDOM from "react-dom";
import "@styles/components/Modal.css";

const Modal = ({ children, isOpen, handleClose }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="Modal-background">
      <div className="Modal-container">
        <div className="Modal-main">{children}</div>
        <div className="Modal-footer"></div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
