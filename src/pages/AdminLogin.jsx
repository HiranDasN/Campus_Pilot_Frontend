import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import adminImage from '../images/software-engineer.png';
import { loginAPI } from '../services/allAPI';
import Swal from 'sweetalert2';
import { AdminHeaderContentContext, isAdminDeletedContext, isAuthTokenContext } from '../context/ContextShare';

function AdminLogin() {

  const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)
  const {adminHeadercontent,setAdminHeaderContent} = useContext(AdminHeaderContentContext)
  const [adminLog, setAdminLog] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); 
  console.log(adminLog);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = adminLog;

    if (!email || !password) {
      Swal.fire({
        title: "Warning",
        text: "Please Fill the Form Completely !!",
        icon: "warning",
      });
    } else {
      const result = await loginAPI(adminLog);
      console.log(result);

      if (result.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Login Successful",
          icon: "success",
        });
        setAdminHeaderContent(true)
        setIsAuthToken(true)
        

        sessionStorage.setItem("existingAdmin", JSON.stringify(result.data.existingAdmin));
        sessionStorage.setItem("token", result.data.token);

        setAdminLog({
          email: "",
          password: "",
        });

        navigate('/admindashboard');
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.response.data,
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
      <div style={{ minHeight: '100vh', background: '#f4f4f4' }} className="d-flex align-items-center justify-content-center">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={4}>
              <div className="container cardshd p-4 mb-5 bg-white rounded">
                <div className="text-center">
                  <Image src={adminImage} alt="Admin" className="rounded-circle mb-3" width="120" height="120" />
                </div>
                <h2 className="text-center mb-4">Admin Login</h2>
                <Form>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your Email"
                      name="email"
                      value={adminLog.email}
                      onChange={(e) => setAdminLog({ ...adminLog, email: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <div className="password-field d-flex">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        name="password"
                        value={adminLog.password}
                        onChange={(e) => setAdminLog({ ...adminLog, password: e.target.value })}
                      />
                      <Button className='ms-1' style={{background:'#f4f4f4'}} variant="link" onClick={togglePasswordVisibility}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </div>
                  </Form.Group>

                  <div className='d-flex align-items-center flex-column mt-4'>
                    <Button  variant="primary" type="submit" onClick={handleLogin}>
                      Login
                    </Button>
                    <p className='mt-3'>Not an Admin? <Link style={{ color: 'blue' }} to={'/register'}>Register here</Link> </p>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default AdminLogin;
