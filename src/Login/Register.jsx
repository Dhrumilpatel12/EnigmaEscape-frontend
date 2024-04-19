// Register.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import backgroundImage from './Bgimage.jpg'; 
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState(' ');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div
      className="register-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Container>
        <Row className="justify-content-center align-items-center vh-100">
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card className="register-card">
              <Card.Body>
                <h2 className="text-center mb-4">Create an Account</h2>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicFirstName">
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="input-field"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicLastName">
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="input-field"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="input-field"
                    />
                    <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="input-field"
                    />
                    <Form.Control.Feedback type="invalid">Please provide a password.</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="input-field"
                    />
                    <Form.Control.Feedback type="invalid">Please retype your password.</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formBasicRole">
                    <Form.Control
                      as="select"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      className="input-field"
                    >
                      <option value="">Choose Role...</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </Form.Control>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="register-btn w-100">
                    Register
                  </Button>

                  <div className="text-center mt-3">
                    Already have an account? <Link to="/" className="text-primary">Login</Link>
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

export default Register;
