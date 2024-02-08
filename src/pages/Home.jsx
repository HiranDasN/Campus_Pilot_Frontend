import React, { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import studmng from '../images/Back-to-School-Sitting-at-Desk.jpeg'
import tchrmng from '../images/teacher-portrait1-1154934482.jpg'
import admn from '../images/R.png'
import carslimg from '../images/happykids.jpg'
import casrlimg2 from '../images/vasily-koloda-8CqDvPuo_kI-unsplash.jpg'
import carslimg3 from '../images/empty-classroom-due-coronavirus-pandemic.jpg'
import carslimg4 from '../images/photo-1573496130141-209d200cebd8.avif'
import carslimg5 from '../images/premium_photo-1661714193960-ae07c29f9c64.avif'
import { Link } from 'react-router-dom';
import { isStudentAuthTokenContext, isTeacherAuthTokenContext } from '../context/ContextShare';

function HomePage() {
  const {isTeacherAuthToken,setIsteacherAuthToken} = useContext(isTeacherAuthTokenContext)
  const {isStudentAuthToken,setIsStudentAuthToken} = useContext(isStudentAuthTokenContext)


  useEffect(()=>{
if (sessionStorage.getItem('token')) {
  setIsteacherAuthToken(true) 
}else
setIsteacherAuthToken(false) 

  },[])

  useEffect(()=>{
    if (sessionStorage.getItem('token')) {
      setIsStudentAuthToken(true) 
    }else
    setIsStudentAuthToken(false) 
    
      },[])
  return (
    <div>
      
      <div className="bg-primary text-light text-center py-5 mt-3">
        <Container>
          <h1 className="display-4 text-light">Welcome to CampusPilot</h1>
          <p className="lead">Empowering Education for a Bright Future</p>
        </Container>
      </div>

     
      <Container className="my-5">
        <Row className="text-center">
          <Col>
            <h2>Key Features</h2>
          </Col>
        </Row>
        <Row className="my-4">
          <Col md={4} className="mb-4">
            <Card className='card shadow border border-primary'>
              <Card.Img variant="top" src={studmng} width={"300px"} height={"300px"} />
              <Card.Body>
                <Card.Title className="text-center">Student Management</Card.Title>
                <Card.Text className="text-center">
                  Efficiently manage student profiles and academic records.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className='card shadow border border-primary'>
              <Card.Img variant="top" src={tchrmng} width={"300px"} height={"300px"}  />
              <Card.Body>
                <Card.Title className="text-center">Teacher Management</Card.Title>
                <Card.Text className="text-center">
                  Track teacher information, schedules, and performance evaluations.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
          <Card className='card shadow border border-primary'>
              <Card.Img variant="top" src={admn} width={"300px"} height={"300px"} />
              <Card.Body>
                <Card.Title className="text-center">School Administration</Card.Title>
                <Card.Text className="text-center">
                  Streamline administrative tasks and ensure efficient school operations.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <div className="bg-light text-center py-5">
        <Container>
          <h2>Ready to streamline your school's operations?</h2>
          <p>Join us now and experience the power of our School Management System.</p>
          <Link to={'/register'}><Button variant="primary">Get Started</Button></Link>
        </Container>
      </div>
      
      <div className="bg-light text-center py-5">
        <Container>
          <h2>Manage Your Campus</h2>
          <Carousel className='border cardshd border-primary w-100 h-75'>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={carslimg}
                alt="First slide"
              />
              
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={casrlimg2}
                alt="Second slide"
              />
             
            </Carousel.Item>
           
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={carslimg3}
                alt="Second slide"
              />
             
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src={carslimg4}
                alt="Second slide"
              />
             
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src={carslimg5}
                alt="Second slide"
              />
            
            </Carousel.Item>
          </Carousel>
        </Container>
      </div>

      
      <Container className="my-5">
        <Row className="text-center">
          <Col>
            <h2>What Our Users Say</h2>
          </Col>
        </Row>
        <Row className="my-4">
          <Col md={4} className="mb-4">
            <p className="lead">"CampusPilot has transformed the way we manage our school. It's intuitive and powerful!"</p>
            <p>- Principal Smith</p>
          </Col>
          <Col md={4} className="mb-4">
            <p className="lead">"The features provided by CampusPilot have made our administrative tasks much smoother."</p>
            <p>- Teacher Johnson</p>
          </Col>
          <Col md={4} className="mb-4">
            <p className="lead">"I love the simplicity and effectiveness of CampusPilot. It has saved us so much time and effort."</p>
            <p>- Parent Davis</p>
          </Col>
        </Row>
      </Container>

     
 
      <div className="bg-primary text-light text-center py-5">
        <Container>
          <h2>Contact Us</h2>
          <p>Have questions or need assistance? Reach out to our support team.</p>
          <Link to={'/contact'}><Button variant="light">Contact Support</Button></Link>
        </Container>
      </div>
    </div>
  );
}

export default HomePage;
