// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/AuthService';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false); // State to manage form validation
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        // Check form validity using HTML5 validation and react-bootstrap's custom styles
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true); // Show validation UI on submit attempt
            return;
        }

        setValidated(true);

        try {
            const response = await login(username, password);
            

            if (response && response.token) {
                localStorage.setItem('authToken', response.token); // Store JWT token under correct key
                toast.success('Login successful! Redirecting to home...');
                setTimeout(() => {
                    navigate('/'); // Redirect to home page after successful login
                }, 3000);
            } else {
                toast.error('Login failed. No token received.');
            }
        } catch (err) {
            console.error('Login error:', err.response ? err.response.data : err.message);
            toast.error('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <Container className="d-flex vh-100 justify-content-center align-items-center">
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <div className="border p-4 shadow-sm rounded">
                        <h2 className="text-center mb-4">Login</h2>
                        <Form noValidate validated={validated} onSubmit={handleLogin}>
                            <Form.Group controlId="formUsername" className="mb-4">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    isInvalid={validated && !username}
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
                                    isInvalid={validated && !password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a password.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formRememberMe" className="mb-4">
                                <Form.Check
                                    type="checkbox"
                                    label="Remember me"
                                />
                            </Form.Group>

                            <Button variant="dark" type="submit" className="btn-block mb-4 w-100">
                                Sign in
                            </Button>

                            <div className="text-center">
                                <p>Not a member? <a href="/register">Register</a></p>
                                <p>or sign up with:</p>
                                <Button variant="link" className="btn-floating mx-1">
                                    <i className="fab fa-facebook-f"></i>
                                </Button>
                                <Button variant="link" className="btn-floating mx-1">
                                    <i className="fab fa-google"></i>
                                </Button>
                                <Button variant="link" className="btn-floating mx-1">
                                    <i className="fab fa-twitter"></i>
                                </Button>
                                <Button variant="link" className="btn-floating mx-1">
                                    <i className="fab fa-github"></i>
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
            <ToastContainer /> {/* ToastContainer for toast notifications */}
        </Container>
    );
};

export default Login;
