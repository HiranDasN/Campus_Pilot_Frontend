import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { editAdminLogResponseContext, isAdminDeletedContext, isAuthTokenContext} from '../../context/ContextShare';
import { deleteAdminAPI } from '../../services/allAPI';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';
function DeleteAdmin() {

  const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)


  const [adminLoginInfo, setAdminLoginInfo] = useState({});
  const { editAdminLogResponse, setEditAdminLogResponse } = useContext(editAdminLogResponseContext);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const existingAdmin = JSON.parse(sessionStorage.getItem("existingAdmin"));
    setAdminLoginInfo(existingAdmin);
  }, [editAdminLogResponse]);

  useEffect(()=>{
    AOS.init({duration:'1000' , delay:'100'});
  },[])
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate()

  const handleDeleteLogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingAdmin")
    setIsAuthToken(false)

    navigate('/')
  }

  const handleDelete = async (id) => {
    const isConfirmed = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (isConfirmed.isConfirmed) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      const result = await deleteAdminAPI(id, reqHeader);
      console.log(result);

      if (result.status === 200) {
        Swal.fire({
          title: 'Success',
          text: 'Admin Removed Successfully',
          icon: 'success',
        });
        handleDeleteLogout();
      } else {
        console.log(result.response.data);
      }
    }
    
  };

  return (
    <Container className="my-5">
      <div data-aos="fade-up-left" className="card cardshd p-4 rounded">
        <h2 className="text-center mb-4">Account Details</h2>
        <Row className="mb-3 ms-5">
          <Col md={4}>
            <label>Email:</label>
          </Col>
          <Col md={8}>
            <p>{adminLoginInfo.email}</p>
          </Col>
        </Row>
        <Row className="mb-3 ms-5">
          <Col md={4}>
            <label>Password:</label>
          </Col>
          <Col md={8}>
            <div className="password-field d-flex">
              <p>{showPassword ? adminLoginInfo.password : '••••••••'}</p>
              <Button style={{marginTop:'-18px'}} variant="link" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
          </Col>
        </Row>
        <div className="d-flex justify-content-center mt-4">
          <Button onClick={()=>handleDelete(adminLoginInfo._id)} variant="danger">Delete Account</Button>
        </div>
      </div>
    </Container>
  );
}

export default DeleteAdmin;
