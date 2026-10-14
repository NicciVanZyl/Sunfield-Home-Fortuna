import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Text from "./textField";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function EditWishlistModal({ open, setClosed, items }) {
  const [show, setShow] = useState(false);
  const [itemAmount, setItemAmount] = useState(1);
  const [selectedItems, setSelectedItems] = useState([
    { name: "", quantity: "", category: "" },
  ]);

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

  useEffect(() => {
    setSelectedItems(
      (items ?? []).map((item) => ({
        name: item.itemName ?? "",
        quantity: item.quantity ?? "",
        category: item.category ?? "",
      })),
    );
  }, [items]);

  const handleChange = (index, field, value) => {
    setSelectedItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const handleItemSelect = (index, field, value) => {
    setSelectedItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const removeSelectedItem = (index) => {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const renderItems = () => {
    return selectedItems.map((item, i) => (
      <div className="homeCards" style={{ marginBottom: "1rem" }} key={i}>
        <Form.Group className="input-field" controlId={`item-name-${i}`}>
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            value={item.name}
            onChange={(e) => handleChange(i, "name", e.target.value)}
            className="modalInputsGreen"
          />
        </Form.Group>
        <Form.Group className="input-field" controlId={`item-quantity-${i}`}>
          <Form.Label>Item Quantity</Form.Label>
          <Form.Control
            type="Number"
            value={item.quantity}
            onChange={(e) => handleChange(i, "quantity", e.target.value)}
            className="modalInputsGreen"
          />
        </Form.Group>
        <Form.Group className="input-field" controlId={`item-category-${i}`}>
          <Form.Label>Item Category</Form.Label>
          <InputGroup hasValidation>
            <Form.Select
              aria-label={`Item ${i + 1}`}
              value={item.category}
              onChange={(e) => handleChange(i, "category", e.target.value)}
              className="modalSelectsGreen"
            >
              <option value="">Select the item category</option>
              <option value="Food">Food</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Medicine">Medicine</option>
            </Form.Select>
          </InputGroup>
        </Form.Group>
        <Button
          type="button"
          variant="danger"
          onClick={() => removeSelectedItem(i)}
        >
          Remove
        </Button>
      </div>
    ));
  };

  return (
    <>
      <Modal fullscreen={true} show={show} onHide={handleClose}>
        <Modal.Header className="ModalExtras" closeButton>
          <h2>Edit The Wishlist</h2>
        </Modal.Header>
        <Modal.Body className="modalGreen">
          <Row>
            <Col className="px-5 mt-4">{renderItems()}</Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="ModalExtras">
          <div className="d-flex gap-3 w-100">
            <button className="adminLogout" onClick={handleClose}>
              Close
            </button>
            <button className="adminLogout" onClick={handleClose}>
              Save Changes
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditWishlistModal;
