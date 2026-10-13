import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Arrow from "../assets/images/Arrow.svg";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Text from "./textField";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

function ItemDonation({ open, setClosed }) {
  const [isRecurring, setIsRecurring] = useState(true);
  const [itemAmount, setItemAmount] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setItemAmount(0);
    setSelectedItems([]);
    if (setClosed) setClosed(false);
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(open);
  }, [open]);

  const switchMode = (recurring) => {
    setIsRecurring(recurring);
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const amount = Number.isNaN(value) ? 0 : Math.max(0, Math.min(value, 20)); // clamp 0-20
    setItemAmount(amount);
    // keep the array the same length as the amount
    setSelectedItems((prev) =>
      Array.from({ length: amount }, (_, i) => prev[i] ?? ""),
    );
  };

  const handleItemSelect = (index, value) => {
    setSelectedItems((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const renderItems = () => {
    return Array.from({ length: itemAmount }, (_, i) => (
      <div className="paymentCards" key={i}>
        <Form.Group className="input-field" controlId={`item-${i}`}>
          <Form.Label>Item </Form.Label>
          <InputGroup hasValidation>
            <Form.Select
              aria-label={`Item Name ${i + 1}`}
              onChange={(e) => handleItemSelect(i, e.target.value)}
            >
              <option value="">Select An Item</option>
              <option value="1">Milk</option>
              <option value="2">Bread</option>
              <option value="3">Dictionaries</option>
              <option value="4">Sugar</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select an item.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="input-field" controlId={`item-${i}`}>
          <Form.Label>Quality</Form.Label>
          <InputGroup hasValidation>
            <Form.Select
              aria-label={`Item ${i + 1}`}
              onChange={(e) => handleItemSelect(i, e.target.value)}
            >
              <option value="">Select The Item Quality</option>
              <option value="1">New</option>
              <option value="2">Excellent</option>
              <option value="3">Good</option>
              <option value="4">OK</option>
              <option value="5">Poor</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select the Item Quality.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="input-field" controlId={`item-${i}`}>
          <Form.Label>Quantity</Form.Label>
          <InputGroup hasValidation>
            <Form.Select
              aria-label={`Item ${i + 1}`}
              onChange={(e) => handleItemSelect(i, e.target.value)}
            >
              <option value="">Select An Item</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select an item.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </div>
    ));
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
            Donate From Our Wishlist
            <h5 style={{ fontSize: "16px", paddingRight: "2rem" }}>
              No donations are actually processed. This is a student project and
              thus all donations are fake. No donation information is saved.
              Please enter information for database testing.
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-2">
          <div className="d-flex flex-row align-items-center gap-3">
            <div className="donationNumbers">1</div>
            <h4 style={{ marginBottom: "0" }}>
              How many items would you like to donate?
            </h4>
          </div>
          <Form.Group className="input-field" controlId="itemAmount">
            <Form.Label>Amount of items</Form.Label>
            <Form.Control
              required
              type="number"
              name="itemAmount"
              value={itemAmount}
              placeholder="1"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter the amount of items you want to donate.
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex flex-row align-items-center gap-3">
            <div className="donationNumbers">2</div>
            <h4 style={{ marginBottom: "0" }}>Donation Amount</h4>
          </div>
          {renderItems()}
          <div className="d-flex flex-row align-items-center gap-3 mt-5">
            <div className="donationNumbers">3</div>
            <h4 style={{ marginBottom: "0" }}>Your Card Details</h4>
          </div>
          <div className="paymentCards">
            <Form.Group className="input-field" controlId="pickupDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                required
                type="date"
                name="pickupDate"
                value={itemAmount}
                placeholder="1"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter the amount of items you want to donate.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="input-field" controlId="pickupTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                required
                type="time"
                name="pickupTime"
                value={itemAmount}
                placeholder="1"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter the amount of items you want to donate.
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <button className="formButton my-4" onClick={() => handleClose()}>
            Make Donation
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ItemDonation;
