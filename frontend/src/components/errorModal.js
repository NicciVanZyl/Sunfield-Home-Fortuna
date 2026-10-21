import { useEffect } from "react";
import "../App.css";
import Modal from "react-bootstrap/Modal";

function ErrorModal({ show, message, onClose }) {
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
      <Modal show={show} backdrop="static" keyboard={false} centered={true}>
        <Modal.Header className="ModalExtras">
          <Modal.Title>Something went Wrong!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="PageBackgroundGreen d-flex flex-column align-items-center justify-content-center gap-4 p-5">
          <div className="homeCards d-flex flex-column align-items-center ">
            <p style={{ textAlign: "center" }}>{message}</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ErrorModal;
