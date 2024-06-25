// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Form, Button, Offcanvas } from 'react-bootstrap';
import logo from '../components/assets/Vintage.png';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, logout, isLoggedIn } from '../services/AuthService';
import { toast } from 'react-toastify';

const NavigationBar = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      const fetchUserDetails = async () => {
        const details = await getUserDetails();
        setUserDetails(details);
      };
      fetchUserDetails();
    }
  }, []);

  const handleSignUpClick = () => {
    navigate('/register');
  };

  const handleLogInClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    setUserDetails(null); // Clear user state after logout
    toast.success('Logged out successfully');
    navigate(`/`);
  };

  const getInitials = (firstname, lastname) => {
    if (firstname && lastname) {
      return `${firstname[0]}${lastname[0]}`;
    }
    return '';
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <Navbar expand="lg" bg="light" className="bg-body-tertiary sticky-top">
      <Container fluid>
        <Navbar.Brand href="/" className="ps-3">
          <img src={logo} height="70" alt="Vintage Logo" loading="lazy" style={{ marginTop: '2px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-lg"
          aria-labelledby="offcanvasNavbarLabel-expand-lg"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-center flex-grow-1 ps-5">
              <Nav.Link href="#products">Products</Nav.Link>
              <Nav.Link href="#categories">Categories</Nav.Link>
              <Form className="d-flex mx-auto">
                <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                <Button className="btn-nav" type="submit">
                  Search
                </Button>
              </Form>
              <div className="d-flex ms-auto">
                {isLoggedIn() ? (
                  <>
                    <Button
                      className="d-flex align-items-center justify-content-center"
                        style={{
                          width: '50px',
                          height: '40px',
                          borderRadius: '25%',
                          backgroundColor: '#000',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '18px',
                          marginRight: '10px',
                          textTransform: 'uppercase'
                        }}
                        onClick={handleProfileClick}
                        >
                          {userDetails ? getInitials(userDetails.firstname, userDetails.lastname) : '...'}
                        </Button>
                    <Button className="btn-logout me-2" onClick={handleLogout}>
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn-nav me-2" onClick={handleLogInClick}>
                      Log in
                    </Button>
                    <Button className="btn-nav" onClick={handleSignUpClick}>
                      Sign up
                    </Button>
                  </>
                )}
              </div>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
