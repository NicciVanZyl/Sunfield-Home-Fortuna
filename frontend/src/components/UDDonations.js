import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardItem from "./dashboardItemDetailed";
import { useState, useEffect, useMemo } from "react";
import { BASE_URL, authHeader } from "../context/api";
import axios from "axios";
import { useAuth } from "../context/authContext";

function UDDonations({ setActivePage }) {
  const { user } = useAuth();
  const [donationData, setDonationData] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [items, money] = await Promise.all([
          axios.get(
            `${BASE_URL}/donations/itemDetails/${user.userID}`,
            authHeader(),
          ),
          axios.get(
            `${BASE_URL}/donations/monetary/${user.userID}`,
            authHeader(),
          ),
        ]);
        setDonationData([...items.data, ...money.data]); // spread both arrays into one flat list
      } catch (error) {
        console.log(error.response?.data?.error);
      }
    };
    load();
  }, []);

  const sortedData = useMemo(
    () =>
      [...donationData].sort(
        (a, b) => new Date(b.donationDate) - new Date(a.donationDate),
      ),
    [donationData],
  );

  const RenderDonationCards = () => {
    if (!donationData || donationData.length === 0) {
      return <p>No Donations Yet</p>;
    } else {
      return Array.from({ length: sortedData.length }, (_, i) => (
        <DashboardItem
          key={
            sortedData[i].itemDonationID
              ? `item-${sortedData[i].itemDonationID}`
              : `money-${sortedData[i].monetaryDonationID}`
          }
          donorName={sortedData[i].donorName}
          date={sortedData[i].donationDate}
          category={
            sortedData[i].itemDonationID
              ? "Item Donation"
              : "Monetary Donation"
          }
          details={sortedData[i].totalItems ?? sortedData[i].amount}
          items={sortedData[i].items ?? []}
        />
      ));
    }
  };

  return (
    <Container fluid className="adminPageBackground">
      <Row className="mx-auto">
        <h3 style={{ textAlign: "center" }}>Your Donations</h3>
      </Row>
      <Row className="mt-5">
        <Col sx={12} className="">
          <div className="homeCards mb-5">
            <Stack>
              <Stack className="d-flex justify-content-center align-items-center">
                {RenderDonationCards()}
              </Stack>
            </Stack>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default UDDonations;
