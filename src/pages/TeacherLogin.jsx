import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import teacherImage from '../images/teacher.png';
import Swal from 'sweetalert2';
import { TeacherLoginAPI } from '../services/allAPI';
import { TeacherHeaderContentContext, isTeacherAuthTokenContext } from '../context/ContextShare';

function TeacherLogin() {
  const {TeacherHeadercontent,setTeacherHeaderContent} = useContext(TeacherHeaderContentContext)
  const {isTeacherAuthToken,setIsteacherAuthToken} = useContext(isTeacherAuthTokenContext)
  const [teacherLog, setTeacherLog] = useState({
    email: '',
    password: '',
  });
  console.log(teacherLog);

  const [showPassword, setShowPassword] = useState(false); 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = teacherLog;

    if (!email || !password) {
      Swal.fire({
        title: "Warning",
        text: "Please Fill the Form Completely !!",
        icon: "warning",
      });
    } else {
      const result = await TeacherLoginAPI(teacherLog);
      console.log(result);

      if (result.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Login Successful",
          icon: "success",
        });
        setTeacherHeaderContent(true)
        setIsteacherAuthToken(true)
       
        

        sessionStorage.setItem("existingTeacher", JSON.stringify(result.data.existingTeacher));
        sessionStorage.setItem("token", result.data.token);

        setTeacherLog({
          email: "",
          password: "",
        });

        navigate('/teacherdashboard');
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
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <div className="container cardshd p-4 mb-5 bg-white rounded">
              <div className="text-center">
                <Image src={teacherImage} alt="Teacher" className="rounded-circle mb-3" width="120" height="120" />
              </div>
              <h2 className="text-center mb-4">Teacher Login</h2>
              <Form >
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your Email"
                    name="email"
                    value={teacherLog.email}
                    onChange={(e) => setTeacherLog({ ...teacherLog, email: e.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <div className="password-field d-flex">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      name="password"
                      value={teacherLog.password}
                      onChange={(e) => setTeacherLog({ ...teacherLog, password: e.target.value })}
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
                  <p className='mt-3'>Not a Teacher? <Link style={{ color: 'blue' }} to={'/loginSelect'}>Go back</Link> </p>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TeacherLogin;
