import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import EditClass from '../components/AdminComponent/EditClass';
import { allClassesAPI, allStudentsAPI, deleteClassAPI } from '../services/allAPI';
import { editClassResponseContext } from '../context/ContextShare';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
function AllClasses() {
  const [allStudentget, setAllStudentGet] = useState([]);

  const [studentSearchKey,setStudentSearchKey] = useState("")

  const { editClassResponse, setEditClassResponse } = useContext(editClassResponseContext);
  const [allClsget, setAllClsGet] = useState([]);
  const [classSearchKey, setClassSearchKey] = useState("");

  useEffect(()=>{
    AOS.init({duration:'1000' , delay:'100'});
  },[])

  const getAllClass = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      const result = await allClassesAPI(classSearchKey, reqHeader);
      console.log(result.data);
      setAllClsGet(result.data);
    }
  };

  console.log(classSearchKey);

  useEffect(() => {
    getAllClass();
  }, [classSearchKey, editClassResponse]);

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
        const result = await deleteClassAPI(id, reqHeader);

        if (result.status === 200) {
          Swal.fire({
            title: 'Success',
            text: 'Class Removed Successfully',
            icon: 'success',
          });
          getAllClass();
        } else {
          console.log(result.response.data);
        }
      } catch (error) {
        console.error('Error deleting class:', error);
      }
    }
  };

  const getAllStudents = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      const result = await allStudentsAPI(studentSearchKey,reqHeader);
      console.log(result.data);
      setAllStudentGet(result.data);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <div className="container my-5" style={{ minHeight: '40vh' }}>
      <h1 className='text-center mb-4'>All Classes</h1>
      <Row className="justify-content-center mb-3">
        <Col md={6}>
          <InputGroup className="mb-3 shadow">
            <FormControl
              placeholder="Find Classes"
              aria-label="Find Classes"
              aria-describedby="basic-addon2"
              value={classSearchKey}
              onChange={e => setClassSearchKey(e.target.value)}
            />
            <Button variant="outline-secondary" id="button-addon2" className='ms-2'>
              <i className="fa-solid fa-search"></i>
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className='g-4'>
        {allClsget?.length > 0 ?
          allClsget?.map((item) => {
            const classStudents = allStudentget.filter(student => student.selectedClass.toLowerCase() === item.className.toLowerCase());
            const studentCount = classStudents.length;

            return (
              <Col key={item._id}>
                <div className="container mt-3 w-100">
                <Link to={`/admin/specificstudents/${item.className}`} style={{textDecoration:'none'}}>
                  <div data-aos="zoom-in" className="btn card w-100 rounded cardhvr" style={{ backgroundColor: 'steelblue' }}>
                    <div className="card-body">
                      <h3 className="card-title text-center text-light">{item.className}</h3>
                      <div className="d-flex justify-content-between align-items-center container mt-4">
                        <h3 className="card-text text-center pt-3 text-light" style={{ fontSize: '34px' }}>{studentCount}</h3>
                          <i className="fa-solid fa-user-graduate fa-2x text-light"></i>
                      </div>
                      <h4 className='text-light ms-2' style={{ float: 'left' }}>Student</h4>
                      <div className="d-flex justify-content-between align-items-center container mt-5">
                        <EditClass classupdate={item} />
                        <button onClick={() => handleDelete(item._id)} className="btn btn-danger rounded">
                          <i className="fa-solid fa-trash "></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
              </Col>
            );
          }) :
          <p className=' fs-4 text-danger text-center'>No Classes Exist... Please Add</p>
        }
      </Row>
    </div>
  );
}

export default AllClasses;
