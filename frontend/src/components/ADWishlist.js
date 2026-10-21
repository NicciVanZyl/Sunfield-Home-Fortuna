import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import WishlistItem from "./wishlistItem";
import { useState, useEffect } from "react";
import AddModal from "./addWishlistModal";
import EditModal from "./editWishlistModal";
import { BASE_URL, authHeader } from "../context/api";
import axios from "axios";
import DashboardItem from "./DashboardItem";

function ADWishlist({ setActivePage }) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [items, setItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);

  const GetWishlistItems = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/wishlist/items`, authHeader());
      setItems(res.data.filter((e) => !e.isComplete));
      setCompletedItems(res.data.filter((e) => e.isComplete));
      console.log(res.data.filter((e) => e.isComplete));
      
    } catch (error) {
      console.log(error.response?.data?.error);
    }
  };

  useEffect(() => {
    GetWishlistItems();
  }, []);

  const RenderWishlistItem = () => {
    if (!items || items.length === 0) {
      return <p>No Wishlist Items Added Yet</p>;
    }
    return items.map((item) => (
      <WishlistItem
        key={item.entryID}
        itemName={item.itemName}
        quantity={item.quantity}
        category={item.category}
        fillAmount={`${Math.min(100, (item.donatedQuantity / item.quantity) * 100)}%`}
      />
    ));
  };

  const RenderCompletedItem = () => {
    if (!completedItems || completedItems.length === 0) {
      return <p>No Wishlist Items Completed Yet</p>;
    }
    return completedItems.map((item) => (
      <DashboardItem
        donorName={item.itemName}
        date=""
        category={item.category}
        details={item.quantity}
      />
    ));
  };

  return (
    <>
      <AddModal
        open={openAddModal}
        setClosed={() => {
          setOpenAddModal(false);
        }}
        items={items}
        onAdded={GetWishlistItems}
      ></AddModal>
      <EditModal
        open={openEditModal}
        setClosed={() => {
          setOpenEditModal(false);
        }}
        items={items}
        onEdit={GetWishlistItems}
      ></EditModal>

      <Container fluid className="adminPageBackground">
        <Row className="mx-auto">
          <h3 style={{ textAlign: "center" }}>Wishlist</h3>
        </Row>
        <Row className="mt-5">
          <Col sx={12} className="">
            <div className="homeCards mb-5">
              <Stack>
                <Stack className="d-flex justify-content-center align-items-center mb-4">
                  <Row
                    sm={0}
                    md={12}
                    className="d-flex justify-content-between dashboardItem"
                  >
                    <Col md={2}>
                      <h5>Item</h5>
                    </Col>
                    <Col md={2}>
                      <h5>Category</h5>
                    </Col>
                    <Col md={1}>
                      <h5>Quantity</h5>
                    </Col>
                    <Col md={6} sm={12}>
                      <h5 style={{ textAlign: "center" }}>Progress</h5>
                    </Col>
                  </Row>
                  {RenderWishlistItem()}
                </Stack>
                <div className="d-flex gap-3">
                  <button
                    className="adminLogout"
                    onClick={() => setOpenAddModal(true)}
                  >
                    Add An Item
                  </button>
                  <button
                    className="adminLogout"
                    onClick={() => setOpenEditModal(true)}
                  >
                    Edit Wishlist
                  </button>
                </div>
              </Stack>
            </div>
          </Col>
        </Row>
        <Row className="mx-auto">
          <h3 style={{ textAlign: "center" }}>Completed Donations</h3>
        </Row>
        <Row className="mt-5">
          <Col sx={12} className="">
            <div className="homeCards mb-5">
              <Stack>
                <Stack className="d-flex justify-content-center align-items-center mb-4">
                  {RenderCompletedItem()}
                </Stack>
              </Stack>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ADWishlist;
