import "../App.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/esm/Stack";
import Logo from "../assets/images/Logo.svg";
import Mail from "../assets/images/mail.svg";
import Location from "../assets/images/Location.svg";
import Phone from "../assets/images/phone.svg";
import Instagram from "../assets/images/instagram.svg";
import Facebook from "../assets/images/facebook.svg";

function Footer() {
  const location = useLocation();
  const [navClass, setNavClass] = useState("FooterOrange");
  if (
    location.pathname === "/" ||
    location.pathname === "/Contact" ||
    location.pathname === "/AdminDashboard"
  ) {
    setNavClass("FooterGreen");
  }
  return (
    <div className={navClass}>
      <Container fluid>
        <Row className="footerContainer pt-5">
          <Col lg={3} md={12}>
            <Stack className="">
              <div className="logoBackground mx-auto mb-4">
                <img className="footerLogo" src={Logo}></img>
              </div>
              <h5>Thank you for learning about our family!</h5>
            </Stack>
          </Col>

          <Col lg={4} md={6} className="mx-auto pageLinks">
            <Stack className="mx-auto">
              <h4>Pages</h4>
              <Link to="/Home" className="footerLink">
                Home
              </Link>
              <Link to="/Contact" className="footerLink">
                Contact Us
              </Link>
              <Link to="/Donate" className="footerLink">
                Donate
              </Link>
              <Link to="/" className="footerLink">
                Profile
              </Link>
            </Stack>
          </Col>

          <Col lg={4} md={6} className="mx-auto">
            <h4>Contact Information</h4>
            <Stack gap={3}>
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
              <div className="d-flex flex-row">
                <a href="#">
                  <img src={Facebook}></img>
                </a>
                <a href="#">
                  <img src={Instagram}></img>
                </a>
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
