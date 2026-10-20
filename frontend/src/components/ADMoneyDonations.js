import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardItem from "./DashboardItem";
import { useState, useEffect } from "react";
import { BASE_URL, authHeader } from "../context/api";
import axios from "axios";

function ADMonetaryDonations({ setActivePage }) {
  const [monetaryData, setMonetaryData] = useState([]);

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
    GetMonetaryOverview();
  }, []);

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
        <h3 style={{ textAlign: "center" }}>Monetary Donations</h3>
      </Row>
      <Row className="mt-5">
        <Col sx={12} className="">
          <div className="homeCards mb-5">
            <Stack>
              <h5 style={{ textAlign: "center" }}>All Monetary Donations</h5>

              <Stack className="d-flex justify-content-center align-items-center">
                {RenderMonetaryCards()}
              </Stack>
            </Stack>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ADMonetaryDonations;
