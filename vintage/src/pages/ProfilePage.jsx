// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { getUserDetails } from '../services/AuthService';
import { Button, Container, Card } from 'react-bootstrap';
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

  const handleExploreClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <Container className='d-flex vh-100 justify-content-center align-items-center'>
      <Card style={{ width: '35rem', height: '20rem' }}>
        <Card.Body>
          {userDetails ? (
            <>
              <Card.Title className='mt-2'>{`${capitalizeFirstLetter(userDetails.firstname)} ${capitalizeFirstLetter(userDetails.lastname)}`}</Card.Title>
              <Card.Text><strong>Username:</strong> {userDetails.username}</Card.Text>
              <Card.Text><strong>Role:</strong> {userDetails.role}</Card.Text>
              <Card.Text><strong>Country:</strong> {userDetails.country}</Card.Text>
              {userDetails.role === 'ADMIN' && (
                <Button variant="primary" className='mt-5' onClick={handleAdminPageClick}>
                  Go to Administrator Page
                </Button>
              )}
              {userDetails.role === 'USER' && (
                <Button variant="primary" className='mt-5' onClick={handleExploreClick}>
                  Explore more products!
                </Button>
              )}
            </>
          ) : (
            <>
              <Card.Text className='mt-5'>
                <strong>Oops! It seems like you aren't logged in.</strong>
              </Card.Text>
              <Card.Text className='mt-5'>
                <a href="#" onClick={handleLoginClick}>Click here to log in</a> or <a href="#" onClick={handleRegisterClick}>register</a>.
              </Card.Text>
              <Button variant="primary" className='mt-5' onClick={handleExploreClick}>
                Explore more products!
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
