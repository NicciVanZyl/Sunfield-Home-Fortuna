import React, { useEffect } from "react";
import "../App.css";
import Modal from "react-bootstrap/Modal";

function SuccessModal({ show, message, title, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <>
      <Modal
        size="md"
        show={show}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <Modal.Header className="ModalExtras">
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="PageBackgroundGreen d-flex flex-column align-items-center justify-content-center gap-4 p-5">
          <p>{message}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SuccessModal;
