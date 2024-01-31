import React from 'react'
import { Row, Col } from 'react-bootstrap';
import UpdateStudentAcc from '../components/StudentComponent/UpdateStudentAcc'
import Delete_Student_Acc from '../components/StudentComponent/Delete_Student_Acc'

function StudentAccount() {
  return (

    <div style={{ background: '#f4f4f4'}}>

        <div style={{ minHeight: '100vh' }}>

    <div className='container'>
    <br />
    <h1 className='mt-5 text-center pt-5' style={{ color: 'black', fontWeight: 'bold' }}>
        Account Settings
    </h1>
    </div>

    <Row className='container-fluid'>

    <Col md={8}>
        <UpdateStudentAcc/>
    </Col>

    <Col md={4}>
        <Delete_Student_Acc/>
    </Col>

    </Row>

    <hr className='mt-5' style={{ border: '1px solid #ddd' }} />

    </div>
        
    </div>

    )
}

export default StudentAccount