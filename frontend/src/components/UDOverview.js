import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardItem from "./DashboardItem";
import DonationType from "./donationModal";
import ItemDonation from "./donationItem";
import MoneyDonation from "./paymentModal";
import ErrorModal from "./errorModal";
import SuccessModal from "./successModal";
import { useEffect, useState, useMemo } from "react";
import { BASE_URL, authHeader } from "../context/api";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { format } from "date-fns";

function UDOverview({ setActivePage }) {
  const { user } = useAuth();
  const [donateOpen, setDonateOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const [donationType, setDonationType] = useState("");
  const [donationData, setDonationData] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [items, money] = await Promise.all([
          axios.get(`${BASE_URL}/donations/items/${user.userID}`, authHeader()),
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
      return <p>No Items Donated Yet</p>;
    } else {
      console.log(sortedData);

      return sortedData
        .slice(0, 4)
        .map((d) => (
          <DashboardItem
            key={
              d.itemDonationID
                ? `item-${d.itemDonationID}`
                : `money-${d.monetaryDonationID}`
            }
            donorName={d.donorName}
            date={format(new Date(d.donationDate), "yyyy-MM-dd HH:mm")}
            category={d.itemDonationID ? `Item Donation` : `Monetary Donation`}
            details={d.totalItems ?? d.amount}
          />
        ));
    }
  };
  const RenderOverviewCards = () => {
    if (!donationData || donationData.length === 0) {
      return (
        <>
          <Col className="mb-3">
            <div className="homeCards h-100">
              <h5 style={{ textAlign: "center" }}>You've given</h5>
              <h4 style={{ textAlign: "center" }}>R0</h4>
            </div>
          </Col>
          <Col className="mb-3">
            <div className="homeCards h-100">
              <h5 style={{ textAlign: "center" }}>Items Donated</h5>
              <h4 style={{ textAlign: "center" }}>0</h4>
            </div>
          </Col>
          <Col className="mb-3">
            <div className="homeCards h-100">
              <h5 style={{ textAlign: "center" }}>Donor Since</h5>
              <h4 style={{ textAlign: "center" }}>
                {format(new Date(user.createdAt), "MMM yyyy")}
              </h4>
            </div>
          </Col>
        </>
      );
    } else {
      return (
        <>
          <Col className="mb-3">
            <div className="homeCards h-100">
              <h5 style={{ textAlign: "center" }}>You've given</h5>
              <h4 style={{ textAlign: "center" }}>
                R{donationData.reduce((sum, d) => sum + (d.amount ?? 0), 0)}
              </h4>
            </div>
          </Col>
          <Col className="mb-3">
            <div className="homeCards h-100">
              <h5 style={{ textAlign: "center" }}>Items Donated</h5>
              <h4 style={{ textAlign: "center" }}>
                {donationData.reduce((sum, d) => sum + (d.totalItems ?? 0), 0)}
              </h4>
            </div>
          </Col>
          <Col className="mb-3">
            <div className="homeCards h-100">
              <h5 style={{ textAlign: "center" }}>Donor Since</h5>
              <h4 style={{ textAlign: "center" }}>
                {format(new Date(user.createdAt), "MMM yyyy")}
              </h4>
            </div>
          </Col>
        </>
      );
    }
  };

  const openModals = () => {
    if (donationType == "Money") {
      setPaymentOpen(true);
    } else if (donationType == "Item") {
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

  const handleSuccess = () => {
    setShowSuccess(true);
  };
  const handleError = (errorMessage) => {
    setMessage(errorMessage);
    setShowError(true);
  };

  const handleModalClose = () => {
    setShowError(false);
    setShowSuccess(false);
    window.location.reload();
  };
  return (
    <>
      <DonationType
        open={donateOpen}
        setClosed={() => setDonateOpen(false)}
        chosenType={handleDonationType}
      ></DonationType>
      <ErrorModal
        show={showError}
        onClose={handleModalClose}
        message={message}
      ></ErrorModal>
      <SuccessModal
        show={showSuccess}
        onClose={handleModalClose}
        title={"Donation Complete!"}
        message={"Thank you for your donation! Your support is appreciated"}
      ></SuccessModal>
      <MoneyDonation
        open={paymentOpen}
        setClosed={() => setPaymentOpen(false)}
        onAdded={handleSuccess}
        onError={(errorMessage) => handleError(errorMessage)}
      ></MoneyDonation>

      <ItemDonation
        open={itemOpen}
        setClosed={() => setItemOpen(false)}
        onAdded={handleSuccess}
        onError={(errorMessage) => handleError(errorMessage)}
      ></ItemDonation>

      <Container fluid className="adminPageBackground">
        <Row className="mx-auto d-flex flex-row">
          <Col>
            <h3>Welcome Back</h3>
            <h4>Here’s the difference you’ve made</h4>
          </Col>
          <Col sm={3}>
            <button className="adminLogout" onClick={() => setDonateOpen(true)}>
              Make a Donation
            </button>
          </Col>
        </Row>
        <Row className="mx-auto d-flex flex-row my-5">
          {RenderOverviewCards()}
        </Row>
        <Row className="my-5">
          <Col sx={12} className="mb-5">
            <div className="homeCards">
              <Stack>
                <h4>Your Recent Donations</h4>

                <Stack className="d-flex justify-content-center align-items-center">
                  {RenderDonationCards()}
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
