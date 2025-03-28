/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
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

  const handleFavoritesClick = () => {
    navigate('/favorites');
  };

  const handleAdminPageClick = () => navigate('/administrator');
  const handleExploreClick = () => navigate('/');
  const handleLoginClick = () => navigate('/login');
  const handleRegisterClick = () => navigate('/register');

  const capitalizeFirstLetter = (string) => {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1)?.toLowerCase();
  };

  return (
    <Container className='d-flex vh-100 justify-content-center align-items-center'>
      <Card style={{ width: '35rem', height: '28rem' }}> 
        <Card.Body>
          {userDetails ? (
            <>
              <Card.Title className='mt-2'>
                {`${capitalizeFirstLetter(userDetails.firstname)} ${capitalizeFirstLetter(userDetails.lastname)}`}
              </Card.Title>
              <Card.Text><strong>Username:</strong> {userDetails.username}</Card.Text>
              <Card.Text><strong>Role:</strong> {userDetails.role}</Card.Text>
              <Card.Text><strong>Country:</strong> {userDetails.country}</Card.Text>
              
              {/* Favorites Button - Visible to both ADMIN and USER */}
              {(userDetails.role === 'ADMIN' || userDetails.role === 'USER') && (
                <Button 
                  variant="secondary" 
                  className='mt-3 me-2'
                  onClick={handleFavoritesClick}
                >
                  View Favorites
                </Button>
                
              )}

              {/* Conditional Admin Button */}
              {userDetails.role === 'ADMIN' && (
                <Button 
                  variant="secondary" 
                  className='mt-3 me-2'
                  onClick={handleAdminPageClick}
                >
                  Admin Dashboard
                </Button>
              )}

              {/* Explore Button for regular users */}
              {(userDetails.role === 'ADMIN' || userDetails.role === 'USER') && (
                <Button 
                  variant="secondary" 
                  className='mt-3'
                  onClick={handleExploreClick}
                >
                  Explore Products
                </Button>
              )}
            </>
          ) : (
            <>
              <Card.Text className='mt-5'>
                <strong>Oops! It seems like you aren't logged in.</strong>
              </Card.Text>
              <Card.Text className='mt-5'>
                <a href="#" onClick={handleLoginClick}>Log in</a> or {' '}
                <a href="#" onClick={handleRegisterClick}>register</a>
              </Card.Text>
              <Button 
                variant="primary" 
                className='mt-3'
                onClick={handleExploreClick}
              >
                Explore Products
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;