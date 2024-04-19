import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import backgroundImage from './Bgimage.jpg';
import { Link } from 'react-router-dom';
import './login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown((prevState) => !prevState);
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
  
    // Check form validity
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:1234/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }
      
      setShowSuccessMessage(true);
      setTimeout(() => {
        localStorage.setItem('userData', JSON.stringify(data?.data));
        if (data?.data?.isAdmin) {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      }, 2000);
    } catch (err) {
      setError(err.message);
      setShowSuccessMessage(false);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData') || '')
      : {};
    if (userData?.username) {
      localStorage.removeItem('userData');
    }
  }, []);

  return (
    <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Card className="login-card">
              <Card.Body>
                <Card.Title className="text-center mb-4">Login</Card.Title>
                {error && <Alert variant="danger">{error}</Alert>}
                {showSuccessMessage && (
                  <Alert variant="success" className="text-center">
                    Login successful!
                  </Alert>
                )}
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      isInvalid={validated && !email}
                    />
                    <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <div className="password-toggle-group" style={{ position: 'relative' }}>
                      <Form.Control
                        type={passwordShown ? 'text' : 'password'}
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isInvalid={validated && !password}
                      />
                      <span
                        className="password-toggle-icon"
                        onClick={togglePasswordVisibility}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          cursor: 'pointer',
                        }}
                      >
                        {passwordShown ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                    <Form.Control.Feedback type="invalid">Please provide a password.</Form.Control.Feedback>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100 mb-3">
                    Login
                  </Button>
                  <div className="text-center">
                    <span className="create-account">
                      Don't have an account? <Link to="/register">Create One</Link>
                    </span>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
