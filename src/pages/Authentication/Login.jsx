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
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false); 

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown => !passwordShown);
  };
  

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
  
    if (!form.checkValidity()) {
      form.reportValidity(); // Report validity to show individual field errors
      return;
    }
  
    try {
      const response = await fetch('https://enigmaescape-backend.onrender.com/auth/login', {
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
  
      setShowSuccessMessage(true); // Show success message
      setTimeout(() => {
        console.log("---------data", data);
        localStorage.setItem('userData', JSON.stringify(data?.data))
        if (data?.data?.isAdmin) {
          navigate('/admin/dashboard'); // Redirect to dashboard after showing the success message
        } else {
          navigate('/'); 
        }
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      setError(err.message);
      setShowSuccessMessage(false); // Ensure success message is not shown in case of error
    }
  };
  
useEffect(()=>{
  const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") || "") : {}
  if(userData?.username){
    localStorage.removeItem("userData")
  }
},[])
  return (
    <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Login</Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              {showSuccessMessage && <Alert variant="success">Login successful!</Alert>}
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="password-toggle-group"
                     style={{
                      position: 'relative',
                    }}>
                  <Form.Control 
                    type={passwordShown ? "text" : "password"}
                    placeholder="Password" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                  />
                   <span className="password-toggle-icon" onClick={togglePasswordVisiblity}
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

                  <Form.Control.Feedback type="invalid">
                    Please provide a password.
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Login
                </Button>
                <div className="text-center mt-3">
<span className="create-account">Don't have an account? <Link to="/register">Create One</Link></span>
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
