import React, { useEffect } from "react";
import "../App.css";
import Modal from "react-bootstrap/Modal";
import Checkmark from "../assets/images/checkmark.png";

function SuccessModal({ show, message, title, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false} centered={true}>
        <Modal.Header className="ModalExtras">
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="PageBackgroundGreen d-flex flex-column align-items-center justify-content-center gap-4 p-5">
          <div className="homeCards d-flex flex-column align-items-center ">
            <img style={{ width: "10rem" }} src={Checkmark}></img>
            <p style={{ textAlign: "center" }}>{message}</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SuccessModal;
