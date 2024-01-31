import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ClassAdd from '../components/AdminComponent/ClassAdd';
function AddClasses() {
  

  return (
    <div className="d-flex" style={{minHeight: '100vh'}}>
    <Row className="w-100">
      <Col md={4}>
        
       
      </Col>
      <Col md={4}>
       <ClassAdd/>
      </Col>
      <Col md={4}>
       
      </Col>
    </Row>
  </div>
  );
}

export default AddClasses;
