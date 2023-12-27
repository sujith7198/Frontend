import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';


function HOME() {
  const auth = useAuth();  // Initialize auth

    const navigate = useNavigate();  // Initialize navigate

  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    
    try {
      const response = await fetch('http://localhost:8080/adminhome', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful!');
        setLoginSuccess(true);
        setLoginError(''); 
        auth.setAuthToken(data.token); // Assuming the token is returned in the response
        navigate('/admin');
      } else {
        setLoginSuccess(false);
        setLoginError(data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginSuccess(false);
      setLoginError('Error during login.');
    }
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Welcome to Home</h2>
      <div style={{ width: '50%', textAlign: 'center', margin: 'auto',border: '2px solid blue', padding: '20px', borderRadius: '10px' ,boxShadow:"blue",boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)'  }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        {loginError && (
          <div className="alert alert-danger mt-3" role="alert">
            {loginError}
          </div>
        )}

        {loginSuccess && (
          <div className="alert alert-success mt-3" role="alert">
            Login successful!
          </div>
        )}
      </div>
    </>
  );
}

export default HOME;
