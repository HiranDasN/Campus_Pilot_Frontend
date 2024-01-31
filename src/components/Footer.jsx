import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Footer.css';

function Footer() {
  const linkStyle = {
    textDecoration: 'none',
  };

  return (
    <footer className="bg-dark py-4">
      <Container className="px-md-3">
        <Row className="text-center text-md-start mb-3 gx-3">
          <Col xs={12} md={4}>
            <h5 className='text-light'>CampusPilot</h5>
            <p className='ptag mt-3'>
              CampusPilot is a school system management website that helps streamline administrative tasks,
              manage student and teacher details, and enhance overall efficiency in educational institutions.
            </p>
          </Col>
          <Col xs={12} md={2}>
            <h5 className='text-light'>Quick Links</h5>
            <ul className="list-unstyled mt-3">
              <li><a href="/" className='atag' style={linkStyle}>Home</a></li>
              <li><a href="/aboutus" className='atag' style={linkStyle}>About Us</a></li>
              <li><a href="/register" className='atag' style={linkStyle}>Get Started</a></li>
              <li><a href="/contact" className='atag' style={linkStyle}>Contact</a></li>
             
            </ul>
          </Col>
          <Col xs={12} md={2}>
            <h5 className='text-light'>Terms</h5>
            <ul className="list-unstyled mt-3">
              <li><a href="#terms" style={linkStyle} className='atag'>Terms of Service</a></li>
              <li><a href="#privacy" style={linkStyle} className='atag'>Privacy Policy</a></li>
              <li><a href="#services" style={linkStyle} className='atag'>Services</a></li>
              <li><a href="https://www.howtogeek.com/434340/how-to-troubleshoot-web-pages-that-wont-load/" className='atag' style={linkStyle}>Help</a></li>
              
            </ul>
          </Col>
          <Col xs={12} md={4}>
            <h5 className='text-light'>Contact Us</h5>
            <div className='mt-3'>
              <a href="#facebook" className='text-light' style={linkStyle}>
                <i className="fab fa-facebook-f fa-2x me-3"></i>
              </a>
              <a href="#twitter" className='text-light' style={linkStyle}>
                <i className="fab fa-twitter fa-2x me-3"></i>
              </a>
              <a href="#google" className='text-light' style={linkStyle}>
                <i className="fab fa-google fa-2x me-3"></i>
              </a>
              <a href="#youtube" className='text-light' style={linkStyle}>
                <i className="fab fa-youtube fa-2x"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
      <div>
      <Container>
          <Row className="text-center">
            <Col>
              <p className='text-light mb-0'>&copy; 2023 CampusPilot. All rights reserved ®.</p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
