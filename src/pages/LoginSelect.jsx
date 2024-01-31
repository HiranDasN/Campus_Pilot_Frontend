import React from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import adminImage from '../images/software-engineer.png';
import studentImage from '../images/graduate.png';
import teacherImage from '../images/teacher.png';

function LoginSelect() {
  return (
    <>
      <div style={{ minHeight: '100vh', background: '#f4f4f4', marginTop:'-80px' }} className="d-flex align-items-center justify-content-center">
        <Container>
        <Row className="justify-content-center">
            <Col xs={12} className="text-center mb-5">
              <h1 className="display-4">Choose Your Login Role</h1>
              <p className="lead">Select the appropriate role to log in and access specific features.</p>
            </Col>
          </Row>
  
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={4}>
              <Card className="mb-4 text-center homeshd" border="primary">
                <div>
                  <Image src={adminImage} alt="Admin" className="rounded-circle mt-3" width="80" height="80" />
    
                </div>
                <Card.Body>
                  <Card.Title className="mb-4">Admin Login</Card.Title>
                  <Card.Text>
                    Access admin features and manage the system.
                    <br /> <br />
                  </Card.Text>
              <Link to={'/adminlogin'}>    <button type="button" class="btn btn-outline-primary">Admin Login</button></Link>
                </Card.Body>
              </Card>
            </Col>
  
            <Col xs={12} md={6} lg={4}>
              <Card className="mb-4 text-center homeshd" border="info" >
                <div>
                  <Image src={teacherImage} alt="Teacher" className="rounded-circle mt-3" width="80" height="80" />
    
                </div>              
                <Card.Body>
                  <Card.Title className="mb-4">Teacher Login</Card.Title>
                  <Card.Text>
                    Login as a teacher to access teacher-specific features.
                  </Card.Text>
                 <Link to={'/teacherlogin'}>  <button  type="button" class="btn btn-outline-info">Teacher Login</button></Link>
                </Card.Body>
              </Card>
            </Col>
  
            <Col xs={12} md={6} lg={4}>
              <Card className="mb-4 text-center homeshd" border="success" >
                <div>
                  <Image src={studentImage} alt="Student"  className="rounded-circle mt-3" width="80" height="80" />
                  </div>
                <Card.Body>
                  <Card.Title className="mb-4">Student Login</Card.Title>
                  <Card.Text>
                    Log in as a student to access student-specific features.
                  </Card.Text>
                 <Link to={'/studentlogin'}> <button type="button" class="btn btn-outline-success">Student Login</button></Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default LoginSelect;
