import React, { useContext, useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { deleteStudentAPI} from '../../services/allAPI';
import Swal from 'sweetalert2';
import { studLogEditContext } from '../../context/ContextShare';
import AOS from 'aos';
import 'aos/dist/aos.css';
function Delete_Student_Acc() {

  const {studLogEdit,setStudLogEdit} = useContext(studLogEditContext)


  const [StudentLoginInfo, setStudentLoginInfo] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(()=>{
    AOS.init({duration:'1000' , delay:'100'});
  },[])
  useEffect(() => {
    const existingStudent = JSON.parse(sessionStorage.getItem("existingStudent"));
    setStudentLoginInfo(existingStudent);
  }, [studLogEdit]);

  const navigate = useNavigate()

  const handleDeleteLogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingStudent")


    navigate('/')
  }

  const handleDelete = async(id)=>{
    const isConfirmed = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (isConfirmed.isConfirmed){  

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
        text:`Account Deleted Successfully`,
        icon: "success"
      });
      handleDeleteLogout();

    }
    else{
      console.log(result.response.data);
    }
  }
  }
  return (
    <Container className="my-5">
    <div data-aos="fade-up-left" className="card cardshd p-4 rounded">
      <h2 className="text-center mb-4">Account Details</h2>
      <Row className="mb-3 ms-5">
        <Col md={4}>
          <label>Email:</label>
        </Col>
        <Col md={8}>
          <p>{StudentLoginInfo.studentEmail}</p>
        </Col>
      </Row>
      <Row className="mb-3 ms-5">
        <Col md={4}>
          <label>Password:</label>
        </Col>
        <Col md={8}>
          <div className="password-field d-flex">
            <p>{showPassword ? StudentLoginInfo.studentPswd : '••••••••'}</p>
            <Button style={{marginTop:'-18px'}} variant="link" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </div>
        </Col>
      </Row>
      <div className="d-flex justify-content-center mt-4">
        <Button onClick={()=>handleDelete(StudentLoginInfo._id)}  variant="danger">Delete Account</Button>
      </div>
    </div>
  </Container>
  )
}

export default Delete_Student_Acc