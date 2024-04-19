import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import backgroundImage from './Bgimage.jpg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false); // New state for toggling password visibility
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false); // New state for toggling confirm password visibility
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown => !passwordShown);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(confirmPasswordShown => !confirmPasswordShown);
  };
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    if (!/\S+@\S+\.\S+/.test(emailValue)) {
      setEmailError('Email is invalid.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
    } else if (!/[a-zA-Z]/.test(value) || !/\d/.test(value) || !/\W/.test(value)) {
      setPasswordError('Password must include alphanumeric and special characters.');
    } else {
      setPasswordError('');
    }
  };

  // Validation for confirm password
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (password !== value) {
      setConfirmPasswordError('Passwords do not match.');
    } else {
      setConfirmPasswordError('');
    }
  };

  // Example validation for phone (You can add more specific checks here)
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    // Add your phone validation logic here (e.g., regex for phone format)
    // Placeholder for demonstration
    if (value.length < 10) {
      setPhoneError('Phone number is too short.');
    } else {
      setPhoneError('');
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false || emailError || passwordError) {
      event.stopPropagation();
      setValidated(true);
      setError('Please fix the errors in the form.');
      return;
    }

    const passwordErrors = [];
    if (!/.{8,}/.test(password)) {
      passwordErrors.push("Password must be at least 8 characters.");
    }
    if (!/[a-z]/.test(password)) {
      passwordErrors.push("Password must include at least one lowercase letter.");
    }
    if (!/[A-Z]/.test(password)) {
      passwordErrors.push("Password must include at least one uppercase letter.");
    }
    if (!/\d/.test(password)) {
      passwordErrors.push("Password must include at least one number.");
    }
    if (!/\W/.test(password)) {
      passwordErrors.push("Password must include at least one special character.");
    }
    if (password !== confirmPassword) {
      passwordErrors.push("Passwords do not match.");
    }
    if (passwordErrors.length > 0) {
      setError(passwordErrors.join(" "));
      return;
    }
    try {
      const response = await fetch('http://localhost:1234/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({
            username: firstName,
            lastname: lastName,
            email: email,
            password: password,
            phone: phone,
            role,
          }),
        });
    
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'Failed to register user');
        }
        console.log('User registered successfully');
        setRegistrationSuccess(true);
        setError('');
        setTimeout(() => {
          navigate('/login'); // Redirect to login
        }, 2000); // Redirect after success message
      }  catch (error) {
        console.error('Error registering user:', error);
        setError(error.message);
      }
    };
   
  return (
    <div
      className="register-container"
      style={{
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover', 
        minHeight: '100vh', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card style={{ borderRadius: '15px' }}>
              <Card.Body>
                <h2 className="text-center mb-4">Create an Account</h2>
                  {registrationSuccess && !error && (
                  <Alert variant="success">
                    Registration successful! Redirecting to login...
                  </Alert>
                )}
                {error && <Alert variant="danger">{error}</Alert>}

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
            isInvalid={!!emailError}
          />
          <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
        </Form.Group>

                  <Form.Group controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">Please provide a valid phone number.</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <div className="password-toggle-group"
                     style={{
                      position: 'relative',
                    }}>
                    <Form.Control   type={passwordShown ? "text" : "password"}  placeholder="Password" value={password} onChange={handlePasswordChange} isInvalid={!!passwordError} />
                    <span className="password-toggle-icon" onClick={togglePasswordVisiblity}
                    style={{
                      position: 'absolute',
                      right: '30px',
                      top: '45%',
                      transform: 'translateY(-90%)',
                      cursor: 'pointer',
                    }}
                    >
                        {passwordShown ? <FaEye /> : <FaEyeSlash />}
                      </span>
                      
                    <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
                    </div>
                  </Form.Group>
                  {/* Confirm Password Field */}
                  <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <div className="password-toggle-group"
                     style={{
                      position: 'relative',
                    }}>
                    <Form.Control  type={confirmPasswordShown ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} isInvalid={!!confirmPasswordError} />
                    <span className="password-toggle-icon" onClick={toggleConfirmPasswordVisibility}
                     style={{
                      position: 'absolute',
                      right: '30px',
                      top: '45%',
                      transform: 'translateY(-90%)',
                      cursor: 'pointer',
                    }}>
                        {confirmPasswordShown ? <FaEye /> : <FaEyeSlash />}
                      </span>
                     
                    <Form.Control.Feedback type="invalid">{confirmPasswordError}</Form.Control.Feedback>
                    </div>
                  </Form.Group>
                    
                  <Form.Group controlId="formBasicRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      as="select"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    >
                      <option value="">Choose...</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </Form.Control>
                  </Form.Group>

                  {error && <div className="text-danger">{error}</div>}

                  <Button variant="primary" type="submit" className="register-btn mt-2 w-100">
                    Register
                  </Button>

                 
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
