import React from 'react'
import { Col, Row } from 'react-bootstrap';
import TeacherAdd from '../components/AdminComponent/TeacherAdd';
function AddTeacher() {
  return (
    <div className="d-flex" style={{minHeight: '100vh'}}>
    <Row className="w-100" >
      <Col md={4}>
        
       
      </Col>
      <Col md={4}>
      <TeacherAdd/>
      </Col>
      <Col md={4}>
       
      </Col>
    </Row>
  </div>
  )
}

export default AddTeacher