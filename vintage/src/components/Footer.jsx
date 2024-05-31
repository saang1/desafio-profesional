// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from "../components/assets/Vintage.png";

const Footer = () => {
  return (
    <div className="footer">
      <Container fluid>
        <Row>
          <Col xs={12} md={6} className="d-flex align-items-center">
            <img src={logo} alt="Vintage Logo" className="footer-logo" />
            <span className="footer-text">Vintage &copy; {new Date().getFullYear()}</span>
          </Col>
          <Col xs={12} md={6} className="d-flex justify-content-end align-items-center">
            <span className="footer-text">All rights reserved</span>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;