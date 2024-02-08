import React, { useContext, useEffect, useState } from 'react'
import { Button, Offcanvas, Collapse, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAdminDetils } from '../../services/allAPI';
import { BASE_URL } from '../../services/baseurl';
import { isTeacherAuthTokenContext } from '../../context/ContextShare';

function TeacherSidebar() {
  const [adminGet,setAdminGet] = useState([])


    const [showSidebar, setShowSidebar] = useState(false);

  const handleSidebarToggle = () => setShowSidebar(!showSidebar);

  const navigate = useNavigate()

  const handleLogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingTeacher")
    navigate('/')

  }

  const getadminInfo = async()=>{
    
    
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }

      const result = await getAdminDetils(reqHeader)
      console.log(result.data);
      setAdminGet(result.data[0])
    } 
}

useEffect(()=>{
  getadminInfo()
},[])
  return (
    <>
    <div>
      <Button variant="primary" onClick={handleSidebarToggle}>
        <i className="fa-solid fa-bars fa-2x"></i>
      </Button>

      <Collapse in={showSidebar}>
        <div>
          <Offcanvas style={{width:'280px'}} show={showSidebar} onHide={() => setShowSidebar(false)} placement="start">
            <Offcanvas.Header  closeButton>
              <Offcanvas.Title><i className="fa-solid fa-user-gear me-2"></i>Teacher Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
           
            <div className="align-items-center justify-content-center d-flex">
                  <img  src={`${BASE_URL}/uploads/${adminGet.schoolImage}`} alt="no school" className="rounded" width="200" height="120" />
  
            </div>                    <h5 className='text-center mt-3'>{adminGet.instituteName}</h5>
            
              <Nav className="flex-column ">
                <Nav.Link href="/teacherdashboard"><i className="fa-solid fa-house-lock me-2"></i>Dashboard</Nav.Link>
                <Nav.Link href="/teacher/teacherinfo"><i className="fa-solid fa-gear me-2"></i>Account Settings</Nav.Link>
                <Nav.Link onClick={handleLogout}><i className="fa-solid fa-sign-out me-2"></i>Logout</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </Collapse>
    </div>
  </>
  )
}

export default TeacherSidebar