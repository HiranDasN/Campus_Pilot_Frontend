import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import signupimg from '../images/adminsignup.gif';
import { registerAPI } from '../services/allAPI';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

function Register() {
  const [adminData, setAdminData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const { username, email, password } = adminData;

    if (!username || !email || !password) {
      Swal.fire({
        title: 'Warning',
        text: 'Please Fill the Form Completely !!',
        icon: 'warning'
      });
    } else {
      const result = await registerAPI(adminData);
      console.log(result.data);
      if (result.status === 200) {
        Swal.fire({
          title: 'Success',
          text: `${result.data.username} is Successfully Registered`,
          icon: 'success'
        });
        setAdminData({
          username: '',
          email: '',
          password: ''
        });
        navigate('/loginSelect');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result.response.data
        });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <br />
      <div style={{ minHeight: '100vh', background: '#f4f4f4' }} id='regdiv' className="d-flex align-items-center justify-content-center">

        <div className="container cardshd p-3 mb-5 bg-white rounded border border-primary">
          <Container className="mt-5">
            <Row>
              <Col xs={12} md={6}>
                <div className="registration-image ms-2">
                  <img
                    src={signupimg}
                    alt="Registration"
                    className="img-fluid"
                  />
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="registration-form me-2">
                  <h2 className="text-center mb-4">Register your Account</h2>
                  <Form>
                    <Form.Group className="mb-3" controlId="username">
                      <Form.Label>User Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your username"
                        name="username"
                        value={adminData.username}
                        onChange={(e) => setAdminData({ ...adminData, username: e.target.value })}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email address"
                        name="email"
                        value={adminData.email}
                        onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <div className="password-field d-flex">
                        <Form.Control
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          name="password"
                          value={adminData.password}
                          onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                        />
                        <Button style={{background:'#f4f4f4'}} className='ms-1' variant="link" onClick={togglePasswordVisibility}>
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                      </div>
                    </Form.Group>

                    <div className='d-flex align-items-center flex-column mt-4'>
                      <Button variant="primary" onClick={handleRegister} className='btn' type="submit">
                        Sign Up
                      </Button>
                    </div>

                    <p className="mt-3 text-center">
                      Already a User? Click Here To{' '}
                      <Link style={{ color: 'blue' }} to={'/loginSelect'}>
                        Login
                      </Link>
                    </p>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Register;
