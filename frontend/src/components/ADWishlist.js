import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import WishlistItem from "./wishlistItem";
import { useState, useEffect } from "react";

function ADWishlist({ setActivePage }) {
  return (
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
                  <Col md={3}>
                    <h5>Category</h5>
                  </Col>
                  <Col md={1}>
                    <h5>Quantity</h5>
                  </Col>
                  <Col md={6} sm={12}>
                    <h5 style={{ textAlign: "center" }}>Progress</h5>
                  </Col>
                </Row>
                <WishlistItem
                  itemName={"Milk"}
                  quantity={"12"}
                  category={"Food"}
                  fillAmount={"20%"}
                ></WishlistItem>{" "}
                <WishlistItem
                  itemName={"Milk"}
                  quantity={"12"}
                  category={"Food"}
                  fillAmount={"40%"}
                ></WishlistItem>{" "}
                <WishlistItem
                  itemName={"Milk"}
                  quantity={"12"}
                  category={"Food"}
                  fillAmount={"10%"}
                ></WishlistItem>{" "}
                <WishlistItem
                  itemName={"Milk"}
                  quantity={"12"}
                  category={"Food"}
                  fillAmount={"80%"}
                ></WishlistItem>{" "}
                <WishlistItem
                  itemName={"Milk"}
                  quantity={"12"}
                  category={"Food"}
                  fillAmount={"94%"}
                ></WishlistItem>{" "}
                <WishlistItem
                  itemName={"Milk"}
                  quantity={"12"}
                  category={"Food"}
                  fillAmount={"62%"}
                ></WishlistItem>{" "}
              </Stack>
              <button
                className="adminLogout"
                onClick={() => console.log("Edit")}
              >
                Edit Wishlist
              </button>
            </Stack>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ADWishlist;
