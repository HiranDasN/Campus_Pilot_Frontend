import React, { useContext, useState } from 'react';
import { Button, Offcanvas, Collapse, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../context/ContextShare';

function AdminSidebar() {
  const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSidebarToggle = () => setShowSidebar(!showSidebar);

  const navigate = useNavigate()

  const handleLogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingAdmin")
    setIsAuthToken(false)

  
    navigate('/')
  }

  
  return (
    <>
      <div>
        <Button variant="primary" onClick={handleSidebarToggle}>
          <i className="fa-solid fa-bars fa-2x"></i>
        </Button>

        <Collapse in={showSidebar}>
          <div>
            <Offcanvas style={{width:'280px'}} show={showSidebar} onHide={() => setShowSidebar(false)} placement="start">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title><i className="fa-solid fa-user-gear me-2"></i>Admin Menu</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="flex-column">
                  <Nav.Link href="/admindashboard"><i className="fa-solid fa-house-lock me-2"></i>Dashboard</Nav.Link>

                  <NavDropdown title={<span><i className="fa-solid fa-gear me-2"></i>General Settings</span>} id="general-settings-dropdown">
                    <NavDropdown.Item href="/admin/schoolinfo"><i class="fa-solid fa-building-columns me-2"></i>Institute Profile</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/admininfo"><i className="fa-solid fa-cogs me-2"></i>Account Settings</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}><i className="fa-solid fa-sign-out me-2"></i>Logout</NavDropdown.Item>
                  </NavDropdown>


                  <NavDropdown title={<span><i className="fa-solid fa-briefcase me-2"></i>Teachers</span>} id="teachers-dropdown">
                    <NavDropdown.Item href="/admin/allteachers"><i className="fa-solid fa-list me-2"></i>All Teachers</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/addteacher"><i className="fa-solid fa-user-plus me-2"></i>Add Teacher</NavDropdown.Item>
                  </NavDropdown>

                  
                  <NavDropdown title={<span><i class="fa-solid fa-person-shelter me-2"></i>Classes</span>} id="teachers-dropdown">
                    <NavDropdown.Item href="/admin/allclasses"><i className="fa-solid fa-list me-2"></i>All Classes</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/addclasses"><i className="fa-solid fa-plus me-2"></i>Add Class</NavDropdown.Item>
                  </NavDropdown>


                  <NavDropdown title={<span><i className="fa-solid fa-user-graduate me-2"></i>Students</span>} id="students-dropdown">
                    <NavDropdown.Item href="/admin/allstudents"><i className="fa-solid fa-list me-2"></i>All Students</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/addstudent"><i className="fa-solid fa-user-plus me-2"></i>Add Student</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Offcanvas>
          </div>
        </Collapse>
      </div>
    </>
  );
}

export default AdminSidebar;
