import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import EditTeacher from '../components/AdminComponent/EditTeacher';
import { allTeachersAPI, deleteTeacherAPI } from '../services/allAPI';
import { BASE_URL } from '../services/baseurl';
import { editTeacherResponseContext } from '../context/ContextShare';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
function AllTeachers() {
  const{editTeacherResponse,setEditTeacherResponse} = useContext(editTeacherResponseContext)
const [allTchrget,setAllTchrGet] = useState([])

const [teacherSearchKey,setTeacherSearchKey] = useState("")
useEffect(()=>{
  AOS.init({duration:'1000' , delay:'100'});
},[])

const getAllTeachers = async()=>{
    
    
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }

      const result = await allTeachersAPI(teacherSearchKey,reqHeader)
      console.log(result.data);
      setAllTchrGet(result.data)
    } 
}

console.log(teacherSearchKey);

useEffect(()=>{
    getAllTeachers()
},[teacherSearchKey,editTeacherResponse])


const handleDelete = async (id) => {
  const isConfirmed = await Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  });

  if (isConfirmed.isConfirmed) {
    const token = sessionStorage.getItem('token');
    const reqHeader = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    try {
      const result = await deleteTeacherAPI(id, reqHeader);

      if (result.status === 200) {
        Swal.fire({
          title: 'Success',
          text: `Teacher ${result.data.teacherName} Removed Successfully`,
          icon: 'success',
        });
        getAllTeachers();
      } else {
        console.log(result.response.data);
      }
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  }
};
  return (
    <div className="container my-5" style={{ minHeight: '40vh' }}>
      <h1 className='text-center mb-4'>All Teachers</h1>

     
      <Row className="justify-content-center mb-3">
        <Col md={6}>
          <InputGroup className="mb-3 shadow">
            <FormControl
              placeholder="Find teachers"
              aria-label="Find teachers"
              aria-describedby="basic-addon2"
              value={teacherSearchKey}
              onChange={e=>setTeacherSearchKey(e.target.value)}
            />
            <Button variant="outline-secondary " id="button-addon2" className='ms-2'>
              <i className="fa-solid fa-search"></i>
            </Button>
          </InputGroup>
        </Col>
      </Row>

      
      <Row xs={1} md={2} lg={3} className='g-4'>
        {allTchrget?.length>0?
        allTchrget?.map((item)=>(<Col>
          <div className="container mt-3">
 <Link to={`/admin/teacherspecificdetails/${item.teacherName}`} style={{textDecoration:'none'}}>
    <div data-aos="zoom-in" className="btn card  rounded cardshd">
      <div className="text-center">
        <div className="rounded-circle overflow-hidden mx-auto mt-2" style={{ width: '200px', height: '200px' }}>
          <img
            src={`${BASE_URL}/uploads/${item.teacherImage}`}
            className="card-img d-block mx-auto"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            alt="Teacher Image"
          />
        </div>
      </div>
      <div className="card-body">
        <h4 className="card-title text-center text-primary">{item.teacherName}</h4>
        <h5 className="card-text text-center">Teacher</h5>
        <div className="d-flex justify-content-between align-items-center container">
          <EditTeacher teacherupdate ={item} />
          <button onClick={()=>handleDelete(item._id)} className="btn btn-danger rounded">
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
 </Link>
</div>

          </Col>))
          
        :
        <p className=' fs-4 text-danger text-center'>No Teachers Exist... Please Add</p>
        }
      </Row>
    </div>
  );
}

export default AllTeachers;
