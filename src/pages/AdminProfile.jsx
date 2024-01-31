import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProfileUpdate from '../components/AdminComponent/ProfileUpdate';
import InstituteProfile from '../components/AdminComponent/InstituteProfile';

function AdminProfile() {

const [Usrnm,setUsrnm] = useState("")

  useEffect(()=>{
    setUsrnm(JSON.parse(sessionStorage.getItem("existingAdmin")).username)
  },[])
  console.log(Usrnm);
  return (
    <div style={{ background: '#f4f4f4'}}>

      <div className='container'>
        <h3 className='pt-5 ms-4' style={{ color: 'black', fontWeight: 'bold' }}>
          Welcome<span className='ms-2 text-success'>{Usrnm}</span>
        </h3>
      </div>

      <Row className='container-fluid mt-5'>
        <Col md={1} />
        <Col md={6}>
          <ProfileUpdate />
        </Col>

        <Col md={4}>
          <InstituteProfile />
        </Col>

      </Row>
      <hr />


    </div>
  );
}

export default AdminProfile;
