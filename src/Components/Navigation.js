import React from "react";
import logo from "../assets/images/burger-logo.png";
import { Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const Navigation = props => {
  const token = localStorage.getItem("token");
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/burger_builder">
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
          <NavLink className="nav-link" to="/burger_builder">
            Build your burger
          </NavLink>
          <NavLink className="nav-link" to="/checkout">
            Checkout
          </NavLink>
          {token === null ? (
            <React.Fragment>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-link" to="/register">
                S'inscrire
              </NavLink>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <NavLink className="nav-link" to="/compte">
                Mon compte
              </NavLink>
              <NavLink className="nav-link" to="/deconnection">
                Se déconnecter
              </NavLink>
            </React.Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
