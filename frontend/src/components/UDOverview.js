import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardItem from "./DashboardItem";
import DonationType from "./donationModal";
import ItemDonation from "./donationItem";
import MoneyDonation from "./paymentModal";
import { useEffect, useState } from "react";
import Arrow from "../assets/images/Arrow.svg";

function UDOverview({ setActivePage }) {
  const [donateOpen, setDonateOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const [donationType, setDonationType] = useState("");

  const openModals = () => {
    if (donationType == "Money") {
      setPaymentOpen(true);
    } else if(donationType == "Item") {
      setItemOpen(true);
    }
  };

  useEffect(() => {
    openModals();
  }, [DonationType]);

  const handleDonationType = (type) => {
    setDonateOpen(false);

    if (type === "Money") {
      setPaymentOpen(true);
    } else if (type === "Item") {
      setItemOpen(true);
    }
  };
  return (
    <>
      <DonationType
        open={donateOpen}
        setClosed={() => setDonateOpen(false)}
        chosenType={handleDonationType}
      ></DonationType>

      <MoneyDonation
        open={paymentOpen}
        setClosed={() => setPaymentOpen(false)}
      ></MoneyDonation>

      <ItemDonation
        open={itemOpen}
        setClosed={() => setItemOpen(false)}
      ></ItemDonation>

      <Container fluid className="adminPageBackground">
        <Row className="mx-auto d-flex flex-row">
          <Col>
            <h3>Welcome Back</h3>
            <h5>Here’s the difference you’ve made</h5>
          </Col>
          <Col sm={3}>
            <button className="adminLogout" onClick={() => setDonateOpen(true)}>
              Make a Donation
            </button>
          </Col>
        </Row>
        <Row className="mx-auto d-flex flex-row my-5">
          <Col className="mb-3">
            <div className="homeCards h-100">
              <h5 style={{ textAlign: "center" }}>You've given</h5>
              <h3 style={{ textAlign: "center" }}>R2400,00</h3>
            </div>
          </Col>
          <Col className="mb-3">
            <div className="homeCards h-100">
              <h5 style={{ textAlign: "center" }}>Items Donated</h5>
              <h3 style={{ textAlign: "center" }}>32</h3>
            </div>
          </Col>
          <Col className="mb-3">
            <div className="homeCards h-100">
              <h5 style={{ textAlign: "center" }}>Donor Since</h5>
              <h3 style={{ textAlign: "center" }}>Mar 2026</h3>
            </div>
          </Col>
        </Row>
        <Row className="my-5">
          <Col sx={12} className="mb-5">
            <div className="homeCards">
              <Stack>
                <h4>Your Recent Donations</h4>

                <Stack className="d-flex justify-content-center align-items-center">
                  <DashboardItem
                    donorName={"Jane Doe"}
                    date={"May 12, 2026"}
                    category={"Clothing"}
                    details={"16 items"}
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
                    category={"Toys"}
                    details={"13 items"}
                  ></DashboardItem>{" "}
                  <DashboardItem
                    donorName={"Jane Doe"}
                    date={"May 12, 2026"}
                    category={""}
                    details={"R300.00"}
                  ></DashboardItem>
                </Stack>
                <button
                  className="adminLogout"
                  onClick={() => setActivePage("My Donations")}
                >
                  View All
                </button>
              </Stack>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UDOverview;
