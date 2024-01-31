import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import userImage from '../images/graduate.png';
import Swal from 'sweetalert2';
import { StudentLoginAPI } from '../services/allAPI';
import { StudentHeaderContentContext, isStudentAuthTokenContext } from '../context/ContextShare';

function StudentLogin() {

  const {studentHeadercontent,setStudentHeaderContent} = useContext(StudentHeaderContentContext)
  const {isStudentAuthToken,setIsStudentAuthToken} = useContext(isStudentAuthTokenContext)
  

  const [StudentLog, setStudentLog] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false); 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = StudentLog;

    if (!email || !password) {
      Swal.fire({
        title: "Warning",
        text: "Please Fill the Form Completely !!",
        icon: "warning",
      });
    } else {
      const result = await StudentLoginAPI(StudentLog);
      console.log(result);

      if (result.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Login Successful",
          icon: "success",
        });

           setStudentHeaderContent(true)
           setIsStudentAuthToken(true)
       
        

        sessionStorage.setItem("existingStudent", JSON.stringify(result.data.existingStudent));
        sessionStorage.setItem("token", result.data.token);

        setStudentLog({
          email: "",
          password: "",
        });

        navigate('/studentdashboard');
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.response.data,
        });
      }
    }
  };
  return (
    <div style={{ minHeight: '100vh', background: '#f4f4f4' }} className="d-flex align-items-center justify-content-center">
      <Container style={{ width: '80%' }}>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <div className="container cardshd p-4 mb-5 bg-white rounded">
              <div className="text-center">
                <Image src={userImage} alt="User" className="rounded-circle mb-3" width="120" height="120" />
              </div>
              <h2 className="text-center mb-4">Student Login</h2>
              <Form >
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your Email"
                    name="email"
                    value={StudentLog.email}
                    onChange={(e) => setStudentLog({ ...StudentLog, email: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <div className="password-field d-flex">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      name="password"
                      value={StudentLog.password}
                      onChange={(e) => setStudentLog({ ...StudentLog, password: e.target.value })}
                      />
                    <Button className='ms-1' style={{background:'#f4f4f4'}} variant="link" onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </div>
                </Form.Group>

                <div className='d-flex align-items-center flex-column mt-4'>
                  <Button variant="primary" type="submit" onClick={handleLogin}>
                    Login
                  </Button>
                  <p className='mt-3'>Not a Student? <Link style={{ color: 'blue' }} to={'/loginselect'}>Go back</Link> </p>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default StudentLogin;
