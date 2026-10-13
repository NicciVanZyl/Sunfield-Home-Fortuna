import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Arrow from "../assets/images/Arrow.svg";

function DonationType({ open, setClosed, chosenType }) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    if (setClosed) {
      setClosed(false);
    }
  };
  const ChooseDonateType = (type) => {
    setShow(false);
    if (chosenType) {
      chosenType(type);
    }
    if (setClosed) {
      setClosed(false);
    }
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(open);
  }, [open]);

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <Modal.Header className="ModalExtras" closeButton>
          <Modal.Title>Make A Donation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="PageBackgroundGreen d-flex flex-column align-items-center justify-content-center gap-4 p-5">
          <button
            className="blueButton donateHeroButtons"
            onClick={() => ChooseDonateType("Money")}
            style={{
              width: "80%",
              height: "4rem",
              d: "flex",
              alignItems: "center",
            }}
          >
            Monetary Donation{" "}
            <img style={{ height: "1.5rem" }} src={Arrow}></img>
          </button>
          <button
            className="blueButton donateHeroButtons"
            onClick={() => ChooseDonateType("Item")}
            style={{
              width: "80%",
              height: "4rem",
              d: "flex",
              alignItems: "center",
            }}
          >
            Item Donation <img style={{ height: "1.5rem" }} src={Arrow}></img>
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DonationType;
