import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User successfully signed up!');
        setSignupSuccess(true);
      } else {
        console.error('Error signing up:', response.statusText);
        setSignupSuccess(false);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setSignupSuccess(false);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Signup</h2>
      <div style={{ width: '60%', textAlign: 'center', margin: 'auto',border: '2px solid green', padding: '20px', borderRadius: '10px' ,boxShadow:"blue",boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)'}}>
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

        {signupSuccess && (
          <div className="alert alert-success mt-3" role="alert">
            You have been successfully signed up!
          </div>
        )}
      </div>
    </>
  );
}

export default Signup;
