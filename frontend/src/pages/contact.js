import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ContactInfoImage from "../assets/images/ContactImage.png";
import Arrow from "../assets/images/Arrow.svg";
import DonateImage from "../assets/images/DonateImage.png";
import HomeCards from "../components/homePageCards";
import QAAccordion from "../components/accordion";
import Mail from "../assets/images/mail.svg";
import Location from "../assets/images/Location.svg";
import Phone from "../assets/images/phone.svg";
import Clock from "../assets/images/clock.svg";

function Contact() {
  return (
    <Container fluid className="PageBackgroundGreen">
      <Row className="homeSection mx-4 py-5">
        <h3 style={{ textAlign: "center", marginBottom: "4rem" }}>
          Contact Us
        </h3>
        <Col lg={6} className="my-auto d-flex flex-column">
          <Stack className="mx-auto my-3 ContactCards">
            <h3>Have Any Questions?</h3>
            <h4 style={{ marginBottom: "2rem" }}>We're happy to help.</h4>
            <Stack gap={4}>
              <div className="d-flex flex-row align-items-center">
                <img src={Location}></img>
                <p className="contactInfoFooter">2410 Balfour, South Africa</p>
              </div>
              <div className="d-flex flex-row align-items-center">
                <img src={Phone}></img>
                <p className="contactInfoFooter">+27 72 826 0556</p>
              </div>
              <div className="d-flex flex-row align-items-center">
                <img src={Mail}></img>
                <p className="contactInfoFooter">
                  themanager@sunfieldhomes.co.za
                </p>
              </div>
              <div className="d-flex flex-row align-items-center">
                <img src={Clock}></img>
                <p className="contactInfoFooter">8am - 4pm on weekdays</p>
              </div>
            </Stack>
          </Stack>
        </Col>
        <Col lg={6} className="mx-auto ">
          <div className="ImageContainers">
            <img src={ContactInfoImage} className="Images"></img>
          </div>
        </Col>
      </Row>
      <Row className="homeSection mx-4 py-5 ">
        <Col lg={6} className="mx-auto ">
          <div className="ImageContainers">
            <img src={DonateImage} className="Images"></img>
          </div>
        </Col>
        <Col lg={6} className="d-flex flex-column">
          <Stack className="mx-auto ContactCards justify-content-center">
            <h3>FAQ</h3>
            <h5 style={{ marginBottom: "2rem" }}>Quick Answers</h5>
            <QAAccordion></QAAccordion>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
