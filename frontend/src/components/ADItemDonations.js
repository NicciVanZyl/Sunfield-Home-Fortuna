import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardItem from "./dashboardItemDetailed";
import { useState, useEffect } from "react";
import { BASE_URL, authHeader } from "../context/api";
import axios from "axios";

function ADItemDonations({ setActivePage }) {
  const [items, setItems] = useState([]);

  const GetItemDetailedData = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/donations/itemDetails`,
        authHeader(),
      );
      setItems(res.data);
    } catch (error) {
      console.log(error.response?.data?.error);
    }
  };

  useEffect(() => {
    GetItemDetailedData();
  }, []);

  const RenderItemCards = () => {
    if (!items || items.length === 0) {
      return <p>No Items Donated Yet</p>;
    } else {
      console.log(items);
      
      return Array.from({ length: items.length }, (_, i) => (
        <>
          <DashboardItem
            donorName={items[i].donorName}
            date={items[i].donationDate}
            category={"Item Donation"}
            details={items[i].totalItems}
            items={items[i].items}
          ></DashboardItem>
        </>
      ));
    }
  };

  return (
    <Container fluid className="adminPageBackground">
      <Row className="mx-auto">
        <h3 style={{ textAlign: "center" }}>Item Donations</h3>
      </Row>
      <Row className="mt-5">
        <Col sx={12} className="">
          <div className="homeCards mb-5">
            <Stack>
              <h5 style={{ textAlign: "center" }}>All Item Donations</h5>

              <Stack className="d-flex justify-content-center align-items-center">
                {RenderItemCards()}
              </Stack>
            </Stack>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ADItemDonations;
