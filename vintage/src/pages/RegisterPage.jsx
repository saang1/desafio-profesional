// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/AuthService'; // Assuming you have a checkEmailExists function
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [country, setCountry] = useState('');
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validateForm = () => {
        if (!validateEmail(username)) {
            toast.error('Please enter a valid email address.');
            return false;
        }
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long.');
            return false;
        }
        if (!firstname) {
            toast.error('First Name is required.');
            return false;
        }
        if (!lastname) {
            toast.error('Last Name is required.');
            return false;
        }
        if (!country) {
            toast.error('Country is required.');
            return false;
        }
        return true;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false || !validateForm()) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        setValidated(true);

        try {
            // Check if email already exists
            // const emailExists = await checkEmailExists(username);
            // if (emailExists) {
            //     toast.error('Email already exists. Please use a different email.');
            //     return;
            // }

            // Proceed with registration
            await register(username, password, firstname, lastname, country);
            toast.success('Registration successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            console.error('Registration error:', err.response ? err.response.data : err.message);
            toast.error('Registration failed. Please try again.');
        }
    };

    return (
        <Container className="d-flex vh-100 justify-content-center align-items-center">
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <div className="border p-4 shadow-sm rounded">
                        <h2 className="text-center mb-4">Register</h2>
                        <Form noValidate validated={validated} onSubmit={handleRegister}>
                            <Form.Group controlId="formUsername" className="mb-4">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    isInvalid={validated && !validateEmail(username)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid email address.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-4">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    isInvalid={validated && password.length < 6}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Password must be at least 6 characters long.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formFirstname" className="mb-4">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter first name"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    required
                                    isInvalid={validated && !firstname}
                                />
                                <Form.Control.Feedback type="invalid">
                                    First Name is required.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formLastname" className="mb-4">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter last name"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    required
                                    isInvalid={validated && !lastname}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Last Name is required.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formCountry" className="mb-4">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                    isInvalid={validated && !country}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Country is required.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="dark" type="submit" className="btn-block mb-4 w-100">
                                Register
                            </Button>

                            <div className="text-center">
                                <p>Already have an account? <a href="/login">Login</a></p>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
};

export default Register;
