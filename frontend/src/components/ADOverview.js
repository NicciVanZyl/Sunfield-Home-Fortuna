import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardItem from "./DashboardItem";
import { BASE_URL, authHeader } from "../context/api";
import axios from "axios";
import { useState, useEffect } from "react";

function ADOverview({ setActivePage }) {
  const [itemData, setItemData] = useState([]);
  const [monetaryData, setMonetaryData] = useState([]);

  const GetItemsOverview = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/donations/items`, authHeader());
      setItemData(res.data);
    } catch (error) {
      console.log(error.response?.data?.error);
    }
  };

  const GetMonetaryOverview = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/donations/monetary`,
        authHeader(),
      );
      setMonetaryData(res.data);
    } catch (error) {
      console.log(error.response?.data?.error);
    }
  };

  useEffect(() => {
    GetItemsOverview();
    GetMonetaryOverview();
  }, []);

  const RenderItemCards = () => {
    if (!itemData || itemData.length === 0) {
      return <p>No Items Donated Yet</p>;
    } else {
      return Array.from({ length: itemData.length }, (_, i) => (
        <>
          <DashboardItem
            donorName={itemData[i].donorName}
            date={itemData[i].donationDate}
            category={""}
            details={itemData[i].totalItems}
          ></DashboardItem>
        </>
      ));
    }
  };
  const RenderMonetaryCards = () => {
    if (!monetaryData || monetaryData.length === 0) {
      return <p>No Monetary Donations Yet</p>;
    } else {
      return Array.from({ length: monetaryData.length }, (_, i) => (
        <>
          <DashboardItem
            donorName={monetaryData[i].donorName}
            date={monetaryData[i].donationDate}
            category={""}
            details={monetaryData[i].amount}
          ></DashboardItem>
        </>
      ));
    }
  };

  return (
    <Container fluid className="adminPageBackground">
      <Row className="mx-auto">
        <h3 style={{ textAlign: "center" }}>Welcome Back</h3>
        <h5 style={{ textAlign: "center" }}>
          Here’s what’s happening with Sunfield Home Fortuna
        </h5>
      </Row>
      <Row className="mt-5">
        <Col lg={6} sx={12} className="">
          <div className="homeCards mb-5">
            <Stack>
              <h5>Recent Item Donations</h5>

              <Stack className="d-flex justify-content-center align-items-center mb-4">
                {RenderItemCards()}
              </Stack>
              <button
                className="adminLogout"
                onClick={() => setActivePage("Item Donations")}
              >
                View More
              </button>
            </Stack>
          </div>
        </Col>
        <Col lg={6} sx={12} className="">
          <div className="homeCards mb-5">
            <Stack>
              <h5>Recent Monetary Donations</h5>

              <Stack className="d-flex justify-content-center align-items-center mb-4">
                {RenderMonetaryCards()}
              </Stack>
              <button
                className="adminLogout"
                onClick={() => setActivePage("Monetary Donations")}
              >
                View More
              </button>
            </Stack>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ADOverview;
