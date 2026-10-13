import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Arrow from "../assets/images/Arrow.svg";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Text from "./textField";

function ItemDonation({ open, setClosed }) {
  const [isRecurring, setIsRecurring] = useState(true);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    if (setClosed) {
      setClosed(false);
    }
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(open);
  }, [open]);

  const switchMode = (recurring) => {
    setIsRecurring(recurring);
  };

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered={true}
        fullscreen="lg-down"
      >
        <Modal.Header style={{ padding: "2rem" }} closeButton>
          <Modal.Title>
            Make A Payment
            <h5 style={{ fontSize: "16px", paddingRight: "2rem" }}>
              No payments are actually processed. This is a student project and
              thus all payments are fake. No payment information is saved.
              Please only enter an amount and fake payment details for database
              testing purposes.
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-2">
          <div className="d-flex flex-row align-items-center gap-3">
            <div className="donationNumbers">1</div>
            <h4 style={{ marginBottom: "0" }}>
              Make This Donation A Recurring One
            </h4>
          </div>
          <div className="tabHeader">
            <div className="paymentSwitch">
              <button
                type="button"
                className={isRecurring ? "active" : ""}
                onClick={() => switchMode(true)}
              >
                One-Time
              </button>
              <button
                type="button"
                className={!isRecurring ? "active" : ""}
                onClick={() => switchMode(false)}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="d-flex flex-row align-items-center gap-3">
            <div className="donationNumbers">2</div>
            <h4 style={{ marginBottom: "0" }}>Donation Amount</h4>
          </div>
          <Text
            type={"Number"}
            label={"Amount"}
            placeholder={200}
            name={"Payment"}
            id={"Payment"}
            errorMessage={"Please enter an amount."}
          ></Text>
          <div className="d-flex flex-row align-items-center gap-3">
            <div className="donationNumbers">3</div>
            <h4 style={{ marginBottom: "0" }}>Your Card Details</h4>
          </div>
          <div className="paymentCards">
            <Text
              type={"text"}
              label={"Name on Card"}
              placeholder={"J Doe"}
              name={"CardName"}
              id={"CardName"}
              errorMessage={"Please enter the name of the card."}
            ></Text>
            <Text
              type={"text"}
              label={"Card Number"}
              placeholder={""}
              name={"CardNumber"}
              id={"CardNumber"}
              errorMessage={"Please enter a card Number."}
            ></Text>
            <Text
              type={"text"}
              label={"Expiration Date"}
              placeholder={"MM/YYYY"}
              name={"Date"}
              id={"Date"}
              errorMessage={"Please enter an Expiration Date."}
            ></Text>

            <Text
              type={"text"}
              label={"Security Code"}
              placeholder={"***"}
              name={"CardCode"}
              id={"CardCode"}
              errorMessage={
                "Please enter the Security Code on the back of the card."
              }
            ></Text>
          </div>
          <button className="formButton my-4" onClick={() => handleClose()}>
            Pay
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ItemDonation;
