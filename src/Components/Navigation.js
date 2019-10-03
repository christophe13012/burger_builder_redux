import React from "react";
import logo from "../assets/images/burger-logo.png";
import { Navbar, Nav } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <img
          style={{ height: 30, width: 30, marginRight: 10 }}
          src={logo}
          alt="logo"
        />
        Burger Builder
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features">Build your burger</Nav.Link>
          <Nav.Link href="#features">Checkout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
