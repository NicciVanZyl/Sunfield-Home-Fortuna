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
  const [selectedItems, setSelectedItems] = useState([
    { name: "", quality: "", quantity: "" },
  ]);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [show, setShow] = useState(false);
  const today = new Date();
  const minDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

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

  const handleDropOffChange = (e) => {
    const { name, value } = e.target;

    if (name === "pickupDate") setPickupDate(value);
    if (name === "pickupTime") setPickupTime(value);
  };

  const switchMode = (recurring) => {
    setIsRecurring(recurring);
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const amount = Number.isNaN(value) ? 0 : Math.max(0, Math.min(value, 20));

    setItemAmount(amount);
    setSelectedItems((prev) =>
      Array.from(
        { length: amount },
        (_, i) => prev[i] ?? { name: "", quality: "", quantity: "" },
      ),
    );
  };

  const handleItemSelect = (index, field, value) => {
    setSelectedItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const renderItems = () => {
    return Array.from({ length: itemAmount }, (_, i) => (
      <div className="paymentCards" style={{ marginBottom: "1rem" }} key={i}>
        <Form.Group className="input-field" controlId={`item-${i}`}>
          <Form.Label>Item </Form.Label>
          <InputGroup hasValidation>
            <Form.Select
              aria-label={`Item Name ${i + 1}`}
              value={selectedItems[i]?.name ?? ""}
              onChange={(e) => handleItemSelect(i, "name", e.target.value)}
              className="donateInputs"
            >
              <option value="">Select An Item</option>
              <option value="Milk">Milk</option>
              <option value="Bread">Bread</option>
              <option value="Dictionaries">Dictionaries</option>
              <option value="Sugar">Sugar</option>
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
              value={selectedItems[i]?.quality ?? ""}
              onChange={(e) => handleItemSelect(i, "quality", e.target.value)}
              className="donateInputs"
            >
              <option value="">Select The Item Quality</option>
              <option value="New">New</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="OK">OK</option>
              <option value="Poor">Poor</option>
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
              value={selectedItems[i]?.quantity ?? ""}
              onChange={(e) => handleItemSelect(i, "quantity", e.target.value)}
              className="donateInputs"
            >
              <option value="">Select the amount you want to donate</option>
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

  const renderSummaryItems = () => {
    return Array.from({ length: itemAmount }, (_, i) => (
      <>
        <Row className="d-flex justify-content-between align-items-center itemDonateItems">
          <Col sm={3}>{selectedItems[i]?.name ?? ""}</Col>
          <Col sm={3} style={{ textAlign: "center" }}>
            {selectedItems[i]?.quality ?? ""}
          </Col>
          <Col sm={3} style={{ textAlign: "center" }}>
            {selectedItems[i]?.quantity ?? ""}
          </Col>
        </Row>
      </>
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
        <Modal.Header
          style={{ padding: "2rem" }}
          className="BlueModalExtras"
          closeButton
        >
          <Modal.Title>
            Donate From Our Wishlist
            <h5 style={{ fontSize: "16px", paddingRight: "2rem" }}>
              No donations are actually processed. This is a student project and
              thus all donations are fake. No donation information is saved.
              Please enter information for database testing.
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-2 BlueModalBackground">
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
              className="donateTextInputs"
            />
            <Form.Control.Feedback type="invalid">
              Please enter the amount of items you want to donate.
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex flex-row align-items-center gap-3">
            <div className="donationNumbers">2</div>
            <h4 style={{ marginBottom: "0" }}>Item Details</h4>
          </div>
          {renderItems()}
          <div className="d-flex flex-row align-items-center gap-3 mt-5">
            <div className="donationNumbers">3</div>
            <h4 style={{ marginBottom: "0" }}>Donation Summary</h4>
          </div>
          <div className="paymentCards">
            {" "}
            <Row className="d-flex justify-content-between align-items-center donateSummary">
              <Col sm={3}>Item Name</Col>
              <Col sm={3} style={{ textAlign: "center" }}>
                Quality
              </Col>
              <Col sm={3} style={{ textAlign: "center" }}>
                Quantity
              </Col>
            </Row>
            {renderSummaryItems()}
          </div>
          <div className="d-flex flex-row align-items-center gap-3 mt-5">
            <div className="donationNumbers">4</div>
            <h4 style={{ marginBottom: "0" }}>Drop-off Details</h4>
          </div>
          <div className="paymentCards">
            <Form.Group className="input-field" controlId="pickupDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                required
                type="date"
                name="pickupDate"
                value={pickupDate}
                min={minDate}
                onChange={handleDropOffChange}
                className="donateTextInputs"
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
                value={pickupTime}
                placeholder="1"
                onChange={handleDropOffChange}
                min="09:00"
                max="17:00"
                className="donateTextInputs"
              />
              <Form.Control.Feedback type="invalid">
                Please enter the amount of items you want to donate.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Label>
              Drop-offs are done at the Sunfield home Location found on your
              website.
            </Form.Label>
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
