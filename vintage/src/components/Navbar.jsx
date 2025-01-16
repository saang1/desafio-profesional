// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Form, Button, Offcanvas, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DebounceInput } from 'react-debounce-input';
import axios from 'axios';
import logo from '../components/assets/Vintage.png';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, logout, isLoggedIn } from '../services/AuthService';
import { toast } from 'react-toastify';

const NavigationBar = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
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
    setUserDetails(null);
    toast.warn('Logged out successfully');
    navigate(`/`);
  };

  const getInitials = (firstname, lastname) => {
    if (firstname && lastname) {
      return `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`;
    }
    return '';
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const confirmLogout = () => {
    handleLogout();
    closeLogoutModal();
  };

  // Fetch suggestions from backend
  const fetchSuggestions = async (query) => {
    if (query.length > 1) {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/suggestions?query=${query}`);
        setSuggestions(response.data); // Assuming the response now includes objects with 'id' and 'name'
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchSuggestions(query);  // Fetch suggestions as the user types
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion && suggestion.id) {
      setSearchQuery('');
      setSuggestions([]);
      navigate(`/product/${suggestion.id}`);  // Navigate to the product details page
    } else {
      console.error('Product ID is undefined');
    }
  };

  const handleKeyDown = (event) => {
    if (suggestions.length === 0) return;

    if (event.key === 'ArrowDown') {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (event.key === 'ArrowUp') {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    } else if (event.key === 'Enter' && activeSuggestionIndex >= 0) {
      handleSuggestionClick(suggestions[activeSuggestionIndex]);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products/search?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
    navigate(`/search?query=${searchQuery}`);
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
              <Form className="d-flex mx-auto position-relative">
                <DebounceInput
                  minLength={2}
                  debounceTimeout={300}
                  className="form-control me-2"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onKeyDown={handleKeyDown}
                />
                {suggestions.length > 0 && (
                  <ul className="suggestions-list" >
                    {suggestions.map((suggestion, index) => {
                      const matchIndex = suggestion.name.toLowerCase().indexOf(searchQuery.toLowerCase());
                      const beforeMatch = suggestion.name.slice(0, matchIndex);
                      const matchText = suggestion.name.slice(matchIndex, matchIndex + searchQuery.length);
                      const afterMatch = suggestion.name.slice(matchIndex + searchQuery.length);

                      return (
                        <li
                          key={suggestion.id}  // Make sure to use the 'id' for the key
                          style={{
                            padding: '5px 10px',
                            cursor: 'pointer',
                            backgroundColor: index === activeSuggestionIndex ? '#f0f0f0' : 'transparent',
                          }}
                          onClick={() => handleSuggestionClick(suggestion)}  // Pass the whole suggestion object
                        >
                          {beforeMatch}<span style={{ fontWeight: 'bold', color: 'blue' }}>{matchText}</span>{afterMatch}
                        </li>
                      );
                    })}
                  </ul>
                )}
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Start Date"
                  className="form-control me-2"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="End Date"
                  className="form-control"
                />
                <Button variant="outline-success" onClick={handleSearch}>
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
                        fontSize: '18px',
                        marginRight: '10px',
                        textTransform: 'uppercase',
                        border: 'none',
                      }}
                      onClick={handleProfileClick}
                    >
                      {userDetails ? getInitials(userDetails.firstname, userDetails.lastname) : '...'}
                    </Button>
                    <Button className="btn-logout me-2" onClick={openLogoutModal}>
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

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4>Search Results:</h4>
          <ul>
            {searchResults.map((product) => (
              <li key={product.id}>
                <h5>{product.name}</h5>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={closeLogoutModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeLogoutModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmLogout}>
            Log out
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default NavigationBar;
