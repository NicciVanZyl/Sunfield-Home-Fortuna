import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { BASE_URL, authHeader } from "../context/api";
import axios from "axios";

function ItemDonation({ open, setClosed, onAdded, onError }) {
  const [isRecurring, setIsRecurring] = useState(true);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [CVV, setCVV] = useState("");
  const [date, setDate] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setCVV("");
    setCardName("");
    setCardNumber("");
    setDate("");
    setPaymentAmount("");
    if (setClosed) {
      setClosed(false);
    }
  };

  const AddMoneyDonation = (amount) => {
    axios.post(
      `${BASE_URL}/donations/monetary`,
      {
        amount: amount,
      },
      authHeader(),
    );
  };

  const handleSubmit = async () => {
    try {
      await AddMoneyDonation(paymentAmount);
      if (onAdded) await onAdded();
      handleClose();
    } catch (error) {
      console.log(
        "Donation Failed:",
        error.response?.data?.error || error.message,
      );
      if (onError)
        await onError("Donation Failed:", error.response?.data?.error);
    }
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(open);
  }, [open]);

  const switchMode = (recurring) => {
    setIsRecurring(recurring);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "Payment") {
      setPaymentAmount(value);
    }
    if (name == "CardName") {
      setCardName(value);
    }
    if (name == "CardNumber") {
      setCardNumber(value);
    }
    if (name == "CardCode") {
      setCVV(value);
    }
    if (name == "Date") {
      setDate(value);
    }
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
        <Modal.Header
          style={{ padding: "2rem" }}
          className="BlueModalExtras"
          closeButton
        >
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
        <Modal.Body className="d-flex flex-column gap-2 BlueModalBackground">
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

          <Form.Group className="input-field" controlId={"Payment"}>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="Number"
              name="Payment"
              value={paymentAmount}
              placeholder="200"
              onChange={handleChange}
              className="donateTextInputs"
              min={0}
            />
            <Form.Control.Feedback type="invalid">
              {"Please enter an amount."}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex flex-row align-items-center gap-3">
            <div className="donationNumbers">3</div>
            <h4 style={{ marginBottom: "0" }}>Your Card Details</h4>
          </div>
          <div className="paymentCards">
            <Form.Group className="input-field" controlId={"CardName"}>
              <Form.Label>Name on Card</Form.Label>
              <Form.Control
                type="text"
                name="CardName"
                value={cardName}
                placeholder="J Doe"
                onChange={handleChange}
                className="donateTextInputs"
              />
              <Form.Control.Feedback type="invalid">
                {"Please enter the name of the card."}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="input-field" controlId={"CardNumber"}>
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                name="CardNumber"
                value={cardNumber}
                onChange={handleChange}
                className="donateTextInputs"
              />
              <Form.Control.Feedback type="invalid">
                {"Please enter a card Number."}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="input-field" controlId={"Date"}>
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control
                type="text"
                name="Date"
                value={date}
                placeholder="MM/YYYY"
                onChange={handleChange}
                className="donateTextInputs"
              />
              <Form.Control.Feedback type="invalid">
                {"Please enter an Expiration Date."}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="input-field" controlId={"CardCode"}>
              <Form.Label>Security Code</Form.Label>
              <Form.Control
                type="text"
                name="CardCode"
                value={CVV}
                placeholder="***"
                onChange={handleChange}
                className="donateTextInputs"
              />
              <Form.Control.Feedback type="invalid">
                {"Please enter the Security Code on the back of the card."}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <button className="formButton my-4" onClick={handleSubmit}>
            Pay
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ItemDonation;
