import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AboutUs() {
  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6}>
          <h2 className="mb-4">About CampusPilot</h2>
          <p>
            Welcome to CampusPilot, where education meets innovation. Our mission is to revolutionize the education
            sector by providing cutting-edge solutions for seamless school management. As a dynamic and forward-thinking
            platform, CampusPilot strives to redefine the educational experience for institutions, educators, and
            learners.
          </p>
          <p>
            With a commitment to excellence, CampusPilot is not just a management system but a catalyst for positive
            change in educational ecosystems. We empower schools, colleges, and universities to overcome challenges,
            enhance efficiency, and embrace the digital era of education.
          </p>
          <p>
            Our user-centric approach ensures that every feature is designed with the user in mind, making CampusPilot
            intuitive, reliable, and a true partner in the journey of education.
          </p>
          <Link to="/register">
            <Button variant="primary" className="mt-3">
              Get Started
            </Button>
          </Link>
        </Col>
        <Col md={6}>
          <img
            src="https://i0.wp.com/bcelearn.co.uk/wp-content/uploads/2020/11/adminbiz.jpg?fit=1024%2C683&ssl=1"
            alt="About CampusPilot"
            className="img-fluid rounded border border-primary"
          />
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h2 className="mb-4">Our Vision</h2>
          <p>
            At CampusPilot, our vision extends beyond being a software solution. We envision a global educational
            landscape where institutions seamlessly adapt to digital transformation, ensuring accessible, equitable, and
            quality education for all. Our goal is to be a catalyst for positive change, fostering an environment where
            innovation and learning go hand in hand.
          </p>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h2 className="mb-4">Why Choose CampusPilot?</h2>
          <p>
            Choosing CampusPilot is choosing a transformative journey in education. Here's why institutions around the
            world choose us:
          </p>
          <ul>
            <li>Comprehensive School Management System</li>
            <li>User-friendly Interface</li>
            <li>Efficient Student and Teacher Management</li>
            <li>Seamless Course Organization</li>
            <li>Interactive Learning Environment</li>
            <li>Real-time Analytics and Reporting</li>
            <li>24/7 Customer Support</li>
            <li>Continuous Innovation and Updates</li>
          </ul>
          <p>
            CampusPilot goes beyond conventional management systems, providing a holistic solution that adapts to the
            evolving needs of educational institutions.
          </p>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h2 className="mb-4">Our Team</h2>
          <p>
            Behind CampusPilot is a passionate and dedicated team committed to transforming education through
            innovation. Our diverse team brings together expertise in software development, education, and customer
            support, working collaboratively to shape the future of education.
          </p>
          <p>
            We believe in the potential of technology to enhance learning experiences, and our team is driven by the
            shared vision of making education accessible, engaging, and impactful for all.
          </p>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h2 className="mb-4">CampusPilot Community</h2>
          <p>
            CampusPilot is more than a platform; it's a community. Join a network of educational institutions,
            administrators, teachers, and students who are embracing the future of education. Share insights, learn from
            others, and be part of a community dedicated to shaping the next generation of learners.
          </p>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col className="text-center">
          <Link to="/register">
            <Button variant="primary">
              Sign Up Now
            </Button>
          </Link>
        </Col>
      </Row>

    </Container>
  );
}

export default AboutUs;
