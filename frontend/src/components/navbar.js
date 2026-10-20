import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Link, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../assets/images/Logo.svg";
import Profile from "../assets/images/profile.svg";
import { useAuth } from "../context/authContext";

function Navigation() {
  const { user, isAdmin } = useAuth();
  const [expanded, setExpanded] = React.useState(false);
  const location = useLocation();
  const navClass = ["/", "/Contact", "/AdminDashboard"].includes(
    location.pathname,
  )
    ? "NavGreen"
    : "NavOrange";
  const isActive = (path) => location.pathname === path;
  React.useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);

  return (
    <Navbar
      expand="lg"
      className={navClass}
      expanded={expanded}
      onToggle={(val) => setExpanded(val)}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/Home">
          <img
            src={Logo}
            width="100"
            height="50"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 justify-content-between">
            <div className="navbarLeft">
              <Nav.Link
                as={Link}
                to="/Home"
                className={isActive("/Home") ? "active" : ""}
                onClick={() => setExpanded(false)}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/Donate"
                className={isActive("/Donate") ? "active" : ""}
                onClick={() => setExpanded(false)}
              >
                Donate
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/Contact "
                className={isActive("/Contact") ? "active" : ""}
                onClick={() => setExpanded(false)}
              >
                Contact
              </Nav.Link>
            </div>

            <div className="navbarRight">
              {isAdmin && (
                <Nav.Link
                  as={Link}
                  to="/AdminDashboard"
                  className={isActive("/AdminDashboard") ? "active" : ""}
                  onClick={() => setExpanded(false)}
                >
                  Admin Dashboard
                </Nav.Link>
              )}

              <Nav.Link
                as={Link}
                to={user == null ? "/" : "/UserDashboard"}
                className={isActive("/") ? "active" : ""}
                onClick={() => setExpanded(false)}
              >
                <img src={Profile}></img>
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
