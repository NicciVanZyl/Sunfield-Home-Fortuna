import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardItem from "./DashboardItem";
import { useState, useEffect } from "react";

function ADMonetaryDonations({ setActivePage }) {
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
                <DashboardItem
                  donorName={"Jane Doe"}
                  date={"May 12, 2026"}
                  category={""}
                  details={"R300.00"}
                ></DashboardItem>{" "}
                <DashboardItem
                  donorName={"Jane Doe"}
                  date={"May 12, 2026"}
                  category={""}
                  details={"R300.00"}
                ></DashboardItem>{" "}
                <DashboardItem
                  donorName={"Jane Doe"}
                  date={"May 12, 2026"}
                  category={""}
                  details={"R300.00"}
                ></DashboardItem>{" "}
                <DashboardItem
                  donorName={"Jane Doe"}
                  date={"May 12, 2026"}
                  category={""}
                  details={"R300.00"}
                ></DashboardItem>{" "}
                <DashboardItem
                  donorName={"Jane Doe"}
                  date={"May 12, 2026"}
                  category={""}
                  details={"R300.00"}
                ></DashboardItem>{" "}
                <DashboardItem
                  donorName={"Jane Doe"}
                  date={"May 12, 2026"}
                  category={""}
                  details={"R300.00"}
                ></DashboardItem>{" "}
              </Stack>
            </Stack>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ADMonetaryDonations;
