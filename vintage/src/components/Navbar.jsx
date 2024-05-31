// eslint-disable-next-line no-unused-vars
import React from "react";
import { Navbar, Container, Nav, Form, Button, Offcanvas } from "react-bootstrap";
import logo from "../components/assets/Vintage.png";


const NavigationBar = () => {

  const expand = 'lg'

  return (
    <Navbar key={expand} expand={expand} bg="light" className="bg-body-tertiary sticky-top">
      <Container fluid>
        <Navbar.Brand href="/" className="ps-3">
          <img
            src={logo}
            height="70"
            alt="Vintage Logo"
            loading="lazy"
            style={{ marginTop: "2px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-center flex-grow-1 ps-5">
              <Nav.Link href="#products">Products</Nav.Link>
              <Nav.Link  href="#categories" >Categories</Nav.Link>
              <Form className="d-flex mx-auto">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button  className="btn-nav" type="submit">
                  Search
                </Button>
              </Form>
              <div className="d-flex ms-auto">
                <Button className="btn-nav me-2" type="button">
                  Log in
                </Button>
                <Button className="btn-nav" type="button">
                  Sign up
                </Button>
              </div>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
