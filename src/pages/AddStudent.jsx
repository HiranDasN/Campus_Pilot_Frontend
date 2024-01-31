import React from 'react'
import { Col, Row } from 'react-bootstrap';
import StudentAdd from '../components/AdminComponent/StudentAdd';
function AddStudent() {
  return (
    <div className="d-flex" style={{minHeight: '100vh'}}>
    <Row className="w-100">
      <Col md={4}>
        
       
      </Col>
      <Col md={4}>
       <StudentAdd/>
      </Col>
      <Col md={4}>
       
      </Col>
    </Row>
  </div>
  )
}

export default AddStudent