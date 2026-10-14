import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Link, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../assets/images/Logo.svg";

function Navigation() {
  const location = useLocation();
  const navClass = ["/", "/Contact", "/AdminDashboard"].includes(
    location.pathname,
  )
    ? "NavGreen"
    : "NavOrange";
  const isActive = (path) => location.pathname === path;
  return (
    <Navbar expand="lg" className={navClass}>
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
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/Home"
              className={isActive("/Home") ? "active" : ""}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Donate"
              className={isActive("/Donate") ? "active" : ""}
            >
              Donate
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Contact "
              className={isActive("/Contact") ? "active" : ""}
            >
              Contact
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/AdminDashboard"
              className={isActive("/AdminDashboard") ? "active" : ""}
            >
              Admin Dashboard
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/UserDashboard"
              className={isActive("/UserDashboard") ? "active" : ""}
            >
              User Dashboard
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/"
              className={isActive("/") ? "active" : ""}
            >
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
