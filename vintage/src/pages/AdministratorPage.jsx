// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const AdministratorPage = () => {
  const navigate = useNavigate();


  const handleUserList = () => {
    navigate('/users');
  };

  return (
    <>
      <div className="admin-content">
        <h1 className="text-center mt-5">Administrator</h1>
        <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
          <Row className="w-100">
            <Col className="d-flex justify-content-center">
              <Button
                className="big-button"
                variant="primary"
                onClick={() => navigate('/admin-list-product')}
              >
                List Products
              </Button>
            </Col>
            <Col className="d-flex justify-content-center">
              <Button className="big-button" variant="primary" onClick={handleUserList}>
                List Users
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="mobile-message">
        <p>This page is not available on mobile devices.</p>
      </div>
    </>
  );
};

export default AdministratorPage;
