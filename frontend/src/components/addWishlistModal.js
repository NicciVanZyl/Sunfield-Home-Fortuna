import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BASE_URL, authHeader } from "../context/api";
import axios from "axios";

function ItemDonation({ open, setClosed, onAdded }) {
  const [isRecurring, setIsRecurring] = useState(true);
  const [itemAmount, setItemAmount] = useState(1);
  const [selectedItems, setSelectedItems] = useState([
    { name: "", category: "", quantity: "" },
  ]);

  const AddWishlistItem = (item) =>
    axios.post(
      `${BASE_URL}/wishlist/addItem`,
      {
        itemName: item.name.trim(),
        quantity: Number(item.quantity),
        category: item.category,
      },
      authHeader(),
    );

  const handleSubmit = async () => {
    const valid = selectedItems.filter(
      (i) =>
        i.name.trim() &&
        Number.isInteger(Number(i.quantity)) &&
        Number(i.quantity) >= 1 &&
        i.category,
    );

    if (valid.length === 0) {
      alert("Please fill in at least one item completely.");
      return;
    }

    try {
      await Promise.all(valid.map(AddWishlistItem)); 
      if (onAdded) await onAdded(); 
      handleClose();
    } catch (error) {
      console.log("add failed:", error.response?.data?.error || error.message);
    }
  };

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

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const amount = Number.isNaN(value) ? 0 : Math.max(0, Math.min(value, 20));

    setItemAmount(amount);
    setSelectedItems((prev) =>
      Array.from(
        { length: amount },
        (_, i) => prev[i] ?? { name: "", category: "", quantity: "" },
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
      <div className="homeCards" style={{ marginBottom: "1rem" }} key={i}>
        <Form.Group className="input-field" controlId={`item-${i}`}>
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            value={selectedItems[i]?.name ?? ""}
            onChange={(e) => handleItemSelect(i, "name", e.target.value)}
            className="modalInputsGreen"
          />
          <Form.Control.Feedback type="invalid">
            Please enter the name of the item.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="input-field" controlId={`item-${i}`}>
          <Form.Label>Item Quantity</Form.Label>
          <Form.Control
            type="Number"
            value={selectedItems[i]?.quantity ?? ""}
            onChange={(e) => handleItemSelect(i, "quantity", e.target.value)}
            className="modalInputsGreen"
          />
          <Form.Control.Feedback type="invalid">
            Please enter the item amount.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="input-field" controlId={`item-${i}`}>
          <Form.Label>Item Category</Form.Label>
          <InputGroup hasValidation>
            <Form.Select
              aria-label={`Item ${i + 1}`}
              value={selectedItems[i]?.category ?? ""}
              onChange={(e) => handleItemSelect(i, "category", e.target.value)}
              className="modalSelectsGreen"
            >
              <option value="">Select the item category</option>
              <option value="Food">Food</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Medicine">Medicine</option>
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
            {selectedItems[i]?.category ?? ""}
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
          className="ModalExtras"
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
        <Modal.Body className="d-flex flex-column gap-2 modalGreen">
          <div className="d-flex flex-row align-items-center gap-3">
            <div className="donationNumbers">1</div>
            <h4 style={{ marginBottom: "0" }}>
              How many items would you like to add?
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
              className="modalInputsGreen"
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
            <h4 style={{ marginBottom: "0" }}>Addition Summary</h4>
          </div>
          <div className="homeCards">
            <Row className="d-flex justify-content-between align-items-center donateSummary">
              <Col sm={3}>Item Name</Col>
              <Col sm={3} style={{ textAlign: "center" }}>
                Category
              </Col>
              <Col sm={3} style={{ textAlign: "center" }}>
                Quantity
              </Col>
            </Row>
            {renderSummaryItems()}
          </div>
          <button className="formButton my-4" onClick={handleSubmit}>
            Add Items
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ItemDonation;
