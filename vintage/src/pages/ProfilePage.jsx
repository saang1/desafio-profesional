// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { getUserDetails } from '../services/AuthService';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const details = await getUserDetails();
      setUserDetails(details);
    };
    fetchUserDetails();
  }, []);

  const handleAdminPageClick = () => {
    navigate('/administrator');
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <Card className="mt-5">
            <Card.Body>
              {userDetails ? (
                <>
                  <Card.Title>{`${userDetails.firstname} ${userDetails.lastname}`}</Card.Title>
                  <Card.Text><strong>Username:</strong> {userDetails.username}</Card.Text>
                  <Card.Text><strong>Email:</strong> {userDetails.email}</Card.Text>
                  <Card.Text><strong>Country:</strong> {userDetails.country}</Card.Text>
                  {userDetails.role === 'ADMIN' && (
                    <Button variant="primary" onClick={handleAdminPageClick}>
                      Go to Administrator Page
                    </Button>
                  )}
                </>
              ) : (
                'Loading...'
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
