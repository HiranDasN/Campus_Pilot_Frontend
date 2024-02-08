import React, { useContext, useEffect, useState } from 'react'
import { Row, Col,InputGroup, FormControl, Button } from 'react-bootstrap';
import EditStudent from '../components/AdminComponent/EditStudent';
import { allStudentsAPI, deleteStudentAPI } from '../services/allAPI';
import { BASE_URL } from '../services/baseurl';
import {  editStudentResponseContext } from '../context/ContextShare';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

function Student_SpecificView() {
  const [allStudentget,setAllStudentGet] = useState([])
  const [studentSearchKey,setStudentSearchKey] = useState("")
  const {editStudentResponse,setEditStudentResponse} = useContext(editStudentResponseContext)
  const { classname } = useParams();

  const getAllStudents = async()=>{
    
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }

      const result = await allStudentsAPI (studentSearchKey,reqHeader)
      console.log(result.data);
      const filteredStudents = result.data.filter(student => student.selectedClass.toLowerCase() === classname.toLowerCase());
      setAllStudentGet(filteredStudents);

    } 
}
console.log(editStudentResponse);
console.log(studentSearchKey);
useEffect(()=>{
  getAllStudents()
},[studentSearchKey,editStudentResponse])


const handleDelete = async(id)=>{
  const token = sessionStorage.getItem("token")
  const reqHeader = {
    "Content-Type" : "application/json",
    "Authorization" : `Bearer ${token}`
  }
  const result = await deleteStudentAPI(id,reqHeader)
  console.log(result);
  if(result.status === 200){
    Swal.fire({
      title:"Success" ,
      text:`Student ${result.data.studentName}  Removed Successfully`,
      icon: "success"
    });
    getAllStudents()
  }
  else{
    console.log(result.response.data);
  }
}

  return (
    <div className="container my-5" style={{ minHeight: '40vh' }}>
      <h1 className='text-center mb-4'>All Students</h1>


      <Row className="justify-content-center mb-3">
        <Col md={6}>
          <InputGroup className="mb-3 shadow">
            <FormControl
              placeholder="Find students"
              aria-label="Find students"
              aria-describedby="basic-addon2"
              value={studentSearchKey}
              onChange={e=>setStudentSearchKey(e.target.value)}
            />
            <Button variant="outline-secondary" id="button-addon2" className='ms-2'>
              <i className="fa-solid fa-search"></i>
            </Button>
          </InputGroup>
        </Col>
      </Row>
    

      <Row xs={1} md={2} lg={3} className='g-4'>
       
         {allStudentget?.length>0?
         allStudentget?.map((item)=>(<Col>
          <div className="container mt-3">
      <div className="card rounded cardshd">
      <div className="text-center">
         <div className='rounded-circle overflow-hidden mx-auto mt-2' style={{ width: '200px', height: '200px' }}>
         <img
          src={`${BASE_URL}/uploads/${item.studentImage}`}
          className="card-img d-block mx-auto"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          alt="Teacher Image"
        />
         </div>
      </div>
        <div className="card-body">
          <h4 className="card-title text-center text-primary">{item.studentName}</h4>
          <h5 className="card-text text-center ">{item.registrationNumber}</h5>
          <h5 className="card-text text-center text-primary">{item.selectedClass}</h5>
         
        </div>
      </div>
    </div>
          </Col>))
         
         :
         <p className=' fs-4 text-danger text-center'>No Students Exist... Please Add</p>

          }
      </Row>
    </div>
  )
}

export default Student_SpecificView