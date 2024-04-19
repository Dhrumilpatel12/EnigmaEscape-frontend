import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, TextField, Button, Link } from '@material-ui/core';
import backgroundImage from './Bgimage.jpg';
import "./Style.css";
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  link: {
    marginTop: theme.spacing(1),
    display: 'block',
    textAlign: 'center',
  },
}));

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className={classes.root}>
      <Container maxWidth="xs" className={classes.container}>
        <Typography variant="h4" className={classes.title}>
          Welcome Back
        </Typography>
        <form className={classes.form} noValidate validated={validated} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={classes.input}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.input}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Log in
          </Button>
          <Link href="/" variant="body2" className={classes.link}>
            Forgot password?
          </Link>
          <Typography variant="body2" className={classes.link}>
            Don't have an account? <Link href="/register" color="primary">Create One</Link>
          </Typography>
        </form>
      </Container>
    </div>
  );
};

export default Login;