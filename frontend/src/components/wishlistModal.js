import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Text from "./textField";
import Form from "react-bootstrap/Form";

function EditWishlistModal({ open, setClosed, items }) {
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

  return (
    <>
      <Modal
        style={{ zIndex: "10000" }}
        fullscreen={true}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header className="ModalExtras" closeButton>
          <h2>Edit The Wishlist</h2>
        </Modal.Header>
        <Modal.Body className="PageBackgroundGreen">
          <Row className="mx-auto w-100">
            {items.map(({ itemName, quantity, category, id }) => (
              <Col sm={12} className="my-1 w-100 DetailedItems">
                <Stack
                  direction="horizontal"
                  className="mx-2 d-flex align-items-between"
                >
                  <Stack>
                    <Text
                      name={itemName}
                      label={"Item Name"}
                      placeholder={"Bread"}
                      type={"text"}
                      id={id + "N"}
                      value={itemName}
                      errorMessage={"Please give the item a name"}
                    ></Text>
                    <Text
                      name={quantity}
                      label={"Quantity"}
                      placeholder={"2"}
                      type={"Number"}
                      id={id + "Q"}
                      value={quantity}
                      errorMessage={"Please give the item a quantity"}
                    ></Text>
                    <Form.Select aria-label="Category" defaultValue={category}>
                      <option>Select A Category</option>
                      <option value="1">Food</option>
                      <option value="2">Clothing</option>
                      <option value="3">Toys</option>
                      <option value="3">Books</option>
                    </Form.Select>
                  </Stack>
                </Stack>
              </Col>
            ))}
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
