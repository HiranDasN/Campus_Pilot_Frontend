import React from 'react'
import { Row, Col } from 'react-bootstrap';
import UpdateAccount from '../components/TeacherComponent/UpdateAccount'
import ViewAccount from '../components/TeacherComponent/ViewAccount'

function TeacherAccountSettings() {
  return (
    <>
        <div style={{ background: '#f4f4f4', minHeight: '100vh', marginTop:'-32px' }}>

    <div className='container'>
    <br />
    <h1 className='mt-5 text-center pt-5' style={{ color: 'black', fontWeight: 'bold' }}>
        Account Settings
    </h1>
    </div>

    <Row className='container-fluid'>

    <Col md={8}>
        <UpdateAccount/>
    </Col>

    <Col md={4}>
        <ViewAccount/>
    </Col>

    </Row>

    <hr className='mt-5' style={{ border: '1px solid #ddd' }} />

    </div>
        
    </>

    )
}

export default TeacherAccountSettings