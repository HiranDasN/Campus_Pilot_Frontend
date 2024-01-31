import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function ContactSupport() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(formData);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    
  };

  return (
    <div className="p-5 cardshd" style={{background: '#f4f4f4'}}>
      <Container>
        <div className='border border-primary shadow rounded bg-light' style={{paddingBottom:'15px',paddingTop:'20px',marginTop:'-15px'}}>
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6}>
                <h2 className="text-center mb-4">Contact Support</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
    
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
    
                  <Form.Group className="mb-3" controlId="subject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the subject of your inquiry"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
    
                  <Form.Group className="mb-3" controlId="message">
                    <Form.Label>Your Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Type your message here"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
    
                  <div className="d-flex justify-content-center mt-4">
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>

       
        <Row className="mt-5">
          <Col>
            <h2 className="text-center mb-4">Contact Us</h2>
            <p className="text-center">
              If you have any questions, concerns, or need further assistance, our dedicated support team is here to help.
            </p>
            <div className="text-center mt-4">
              <p>Email: support@campuspilot.com</p>
              <p>Phone: +1 (123) 456-7890</p>
              <p>Address: 123 Campus St, Education City, EC 12345</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactSupport;
