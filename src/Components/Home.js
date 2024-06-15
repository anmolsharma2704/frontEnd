// src/components/Home.js

import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const Home = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Lankaree</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* You can add additional links to other pages here */}
            </Nav>
            <Nav>
              <Link to="/login" className="nav-link">
                <Button variant="outline-primary">Login</Button>
              </Link>
              <Link to="/register" className="nav-link">
                <Button variant="primary" className="ms-2">
                  Register
                </Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <h2>Welcome to Lankaree</h2>
        <p>This page is now in developing mode and Developer is TechieAnmol</p>
      </Container>
    </div>
  );
};

export default Home;
