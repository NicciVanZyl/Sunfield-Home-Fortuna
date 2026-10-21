import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Arrow from "../assets/images/Arrow.svg";
import { useEffect, useState } from "react";
import ItemDonation from "../components/donationItem";
import MoneyDonation from "../components/paymentModal";
import { Link } from "react-router-dom";
import ErrorModal from "../components/errorModal";
import SuccessModal from "../components/successModal";
import { BASE_URL, authHeader } from "../context/api";
import axios from "axios";

function Donate() {
  const [items, setItems] = useState([]);
  const half = Math.ceil(items.length / 2);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");

  const GetWishlistItems = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/wishlist/items`, authHeader());
      const tempItems = res.data.filter((e) => !e.isComplete);
      setItems(tempItems.map((item) => item.itemName));
    } catch (error) {
      console.log(error.response?.data?.error);
    }
  };

  useEffect(() => {
    GetWishlistItems();
  }, []);

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
  };
  return (
    <Container fluid className="PageBackgroundYellow">
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
      <div className="donateHero">
        <Row className="homeHeroGradient">
          <Col lg="8">
            <Stack>
              <h1>Support our community</h1>
              <p className="donateHeaderText">
                Home is more than a place to live — it's where you're seen,
                cared for, and never alone. Every gift helps us keep that
                promise for the people who call this community home.
              </p>
              <div className="d-flex gap-4 flex-column flex-lg-row align-items-center">
                <button
                  className="blueButton donateHeroButtons"
                  onClick={() => setPaymentOpen(true)}
                >
                  Monetary Donation <img src={Arrow}></img>
                </button>
                <button
                  className="blueButton donateHeroButtons"
                  onClick={() => setItemOpen(true)}
                >
                  Donate items<img src={Arrow}></img>
                </button>
              </div>
            </Stack>
          </Col>
        </Row>
      </div>
      <Row className="homeSection mx-4 py-5">
        <Col lg={12} className="my-auto d-flex flex-column">
          <Stack className="mx-auto my-3 mb-5 homeCards textContainers">
            <h3>Want to donate something?</h3>
            <h4>Here are some needed resident essentials</h4>
          </Stack>
          <div className="notebook">
            <div className="notebookContent  d-flex flex-column">
              <h5 className="notebookTitle">Wishlist</h5>
              <ul className="notebookList">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="homeSection mx-4 py-5 ">
        <Col lg={12} className="">
          <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center homeCards contactCard gap-3">
            <p>Have questions? We are here to help.</p>
            <Link to="/Contact" className="blueButton">
              Contact us <img src={Arrow}></img>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Donate;
