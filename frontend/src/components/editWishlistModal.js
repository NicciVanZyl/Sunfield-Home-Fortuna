import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BASE_URL, authHeader } from "../context/api";
import axios from "axios";

function EditWishlistModal({ open, setClosed, items, onEdit }) {
  const [show, setShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState([
    { id: "", name: "", quantity: "", category: "" },
  ]);
  const [deletedItems, setDeletedItems] = useState([]);

  const EditWishlistItems = (item) =>
    axios.put(
      `${BASE_URL}/wishlist/${item.id}`,
      {
        itemName: item.name.trim(),
        quantity: Number(item.quantity),
        category: item.category,
      },
      authHeader(),
    );

  const DeleteItems = (item) =>
    axios.delete(`${BASE_URL}/wishlist/${item.id}`, authHeader());

  const handleSubmit = async () => {
    const valid = selectedItems.filter(
      (i) =>
        i.name.trim() &&
        Number.isInteger(Number(i.quantity)) &&
        Number(i.quantity) >= 1 &&
        i.category,
    );

    if (valid.length === 0 && deletedItems.length === 0) {
      alert("Nothing to save.");
      return;
    }

    try {
      await Promise.all([
        ...valid.map(EditWishlistItems),
        ...deletedItems.map(DeleteItems),
      ]);
      setDeletedItems([]);
      if (onEdit) await onEdit(); // wait for the re-fetch
      handleClose();
    } catch (error) {
      console.log("save failed:", error.response?.data?.error || error.message);
    }
  };

  const handleClose = () => {
    setShow(false);
    if (setClosed) {
      setClosed(false);
    }
  };

  useEffect(() => {
    setShow(open);
  }, [open]);

  useEffect(() => {
    setSelectedItems(
      (items ?? []).map((item) => ({
        id: item.entryID ?? "",
        name: item.itemName ?? "",
        quantity: item.quantity ?? "",
        category: item.category ?? "",
      })),
    );
    setDeletedItems([]);
  }, [items]);

  const handleChange = (index, field, value) => {
    setSelectedItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const removeSelectedItem = (index) => {
    const itemToRemove = selectedItems[index];
    if (itemToRemove.id) {
      setDeletedItems((prev) => [...prev, itemToRemove]);
    }

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
            <button className="adminLogout" onClick={handleSubmit}>
              Save Changes
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditWishlistModal;
