import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardItem from "./dashboardItemDetailed";
import { useState, useEffect } from "react";

function ADItemDonations({ setActivePage }) {
  const [items, setItems] = useState([
    {
      itemName: "Milk",
      quantity: "2",
      quality: "Good",
    },
    {
      itemName: "Milk",
      quantity: "2",
      quality: "Good",
    },
    {
      itemName: "Milk",
      quantity: "2",
      quality: "Good",
    },
    {
      itemName: "Milk",
      quantity: "2",
      quality: "Good",
    },
  ]);

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
                <DashboardItem
                  donorName={"Jane Doe"}
                  date={"May 12, 2026"}
                  category={"Clothing"}
                  details={"16 items"}
                  items={items}
                ></DashboardItem>{" "}
                <DashboardItem
                  donorName={"Jane Doe"}
                  date={"May 12, 2026"}
                  category={"Books"}
                  details={"14 items"}
                  items={items}
                ></DashboardItem>{" "}
                <DashboardItem
                  donorName={"Jane Doe"}
                  date={"May 12, 2026"}
                  category={"Toys"}
                  details={"13 items"}
                  items={items}
                ></DashboardItem>{" "}
                <DashboardItem
                  donorName={"Jane Doe"}
                  date={"May 12, 2026"}
                  category={"Food"}
                  details={"12 items"}
                  items={items}
                ></DashboardItem>
              </Stack>
            </Stack>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ADItemDonations;
