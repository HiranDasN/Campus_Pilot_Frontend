import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import logo from '../images/school-logo-design-template-vector-8933643-2270015779-removebg-preview.png';
import AdminSidebar from './AdminSidebar';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { AdminHeaderContentContext, StudentHeaderContentContext, TeacherHeaderContentContext, editInstituteResponseContext, isAuthTokenContext, isTeacherAuthTokenContext } from '../context/ContextShare';
import { BASE_URL } from '../services/baseurl';
import TeacherSidebar from './TeacherComponent/TeacherSidebar';
import StudentSidebar from './StudentComponent/StudentSidebar';

function Header() {
  const {TeacherHeadercontent,setTeacherHeaderContent} = useContext(TeacherHeaderContentContext)
  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState(false);


  
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const {studentHeadercontent,setStudentHeaderContent} = useContext(StudentHeaderContentContext)


  const {editInstituteResponse,setEditInstituteResponse} = useContext(editInstituteResponseContext)
  const [showButtons, setShowButtons] = useState(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)
  const {adminHeadercontent,setAdminHeaderContent} = useContext(AdminHeaderContentContext)

  const location = useLocation();

  const [isHomeLink, setIsHomeLink] = useState(false);
  const [allAdminInstitute,setAllAdminInstitute] = useState({})
  const [teacherInfo,setTeacherInfo] = useState({})
  const [StudentInfo,setStudentInfo] = useState({})




  const shouldDisplayLink = (path) => location.pathname !== path;

  const isLoginSelectPage = location.pathname === '/loginSelect';


  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("existingAdmin");
    setIsAuthToken(false);
    navigate('/');
  };
  
  const handleTeacherLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("existingTeacher");
    navigate('/');

  };

  

  const handleStudentLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("existingStudent");
    navigate('/');

  };

  useEffect(() => {
    const existingAdmin = JSON.parse(sessionStorage.getItem("existingAdmin"));
    const token = sessionStorage.getItem("token");

    if (existingAdmin && token) {
      setIsAdminLoggedIn(true);
    } else {
      setIsAdminLoggedIn(false);
    }

    const isNotHomePage = location.pathname !== '/';
    setIsHomeLink(!isNotHomePage);

    setShowButtons(isHomeLink || isAdminLoggedIn);
  }, [location.pathname, isAdminLoggedIn]);

  useEffect(() => {
    const isHomePage = location.pathname === '/';
    const isAboutUs = location.pathname === '/aboutus';
    const isContact = location.pathname === '/contact';
    setShowButtons(isHomePage || isAboutUs || isContact);
  }, [location.pathname]);

  useEffect(()=>{
    setAllAdminInstitute(JSON.parse(sessionStorage.getItem("existingAdmin")))
    
  },[editInstituteResponse,adminHeadercontent])

  useEffect(()=>{
    setTeacherInfo(JSON.parse(sessionStorage.getItem("existingTeacher")))
    
  },[TeacherHeadercontent])


  useEffect(()=>{
    setStudentInfo(JSON.parse(sessionStorage.getItem("existingStudent")))
    
  },[studentHeadercontent])

  

  useEffect(() => {
    const existingTeacher = JSON.parse(sessionStorage.getItem("existingTeacher"));
    const token = sessionStorage.getItem("token");

    if (existingTeacher && token) {
      setIsTeacherLoggedIn(true);
    } else {
      setIsTeacherLoggedIn(false);
    }

  }, [location.pathname, isTeacherLoggedIn]);


  useEffect(() => {
    const existingStudent  = JSON.parse(sessionStorage.getItem("existingStudent"));
    const token = sessionStorage.getItem("token");

    if (existingStudent && token) {
      setIsStudentLoggedIn(true);
    } else {
      setIsStudentLoggedIn(false);
    }

  }, [location.pathname, isStudentLoggedIn]);




  return (
    <>
      <Navbar
        bg="primary"
        className={`text-light p-1 ${isLoginSelectPage ? '' : 'fixed-top'}`}
        data-bs-theme="dark"
        expand="lg"
      >
        {isAdminLoggedIn && <AdminSidebar />}
        {isTeacherLoggedIn &&  <TeacherSidebar/>}
        {isStudentLoggedIn &&  <StudentSidebar/>}

        
        <Container>
          <Navbar.Brand href="/">
            <img alt="" src={logo} width="80" height="80" className="" /> CampusPilot
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {!isAdminLoggedIn && !isHomeLink && !isTeacherLoggedIn && !isStudentLoggedIn && (
                <Nav.Link as={NavLink} to="/" exact>
                  Home
                </Nav.Link>
              )}

              {!isAdminLoggedIn && shouldDisplayLink('/aboutus') && !isTeacherLoggedIn && !isStudentLoggedIn && (
                <Nav.Link as={Link} to="/aboutus">
                  About
                </Nav.Link>
              )}

              {!isAdminLoggedIn && shouldDisplayLink('/contact') && !isTeacherLoggedIn && !isStudentLoggedIn && (
                <Nav.Link href="/contact">Contact</Nav.Link>
              )}

              {!isAdminLoggedIn && !isTeacherLoggedIn && !isStudentLoggedIn && (
                <Nav.Link href="https://www.howtogeek.com/434340/how-to-troubleshoot-web-pages-that-wont-load/">
                  Help
                </Nav.Link>
              )}
            </Nav>
            {showButtons && !isAdminLoggedIn && (
              <Nav>
                <Button style={{ backgroundColor: 'white', borderRadius: '50px', padding: '3px 30px', marginRight: '10px' }}>
                  <Nav.Link href="/register" className="text-dark p-2"><i className="fa-solid fa-user-plus me-2"></i>Sign Up</Nav.Link>
                </Button>
                <br />
                <Button style={{ backgroundColor: 'white', borderRadius: '50px', padding: '3px 30px' }}>
                  <Nav.Link href="/loginSelect" className="text-dark p-2"><i className="fa-solid fa-user-lock me-2"></i>Login</Nav.Link>
                </Button>
              </Nav>
            )}

{isAdminLoggedIn && (
        <Nav className="ms-auto">
          <Dropdown align="end">
              <div className='d-flex align-items-center justify-content-center'>
                <img src={allAdminInstitute?.schoolImage?`${BASE_URL}/uploads/${allAdminInstitute?.schoolImage}`:"https://tse4.mm.bing.net/th?id=OIP.7lxwb-0xAbuhHtcD_Q5Z9gHaHa&pid=Api&P=0&h=220"} alt="no image" className="rounded me-3" width="60" height="50" />
                <h5 className='text-light pt-2'>{allAdminInstitute?.instituteName?allAdminInstitute?.instituteName:"Institute Name"}</h5>
                <Dropdown.Toggle variant="link"className='pt-3 ps-3' id="account-dropdown" style={{ textDecoration: 'none' ,color:'white' ,fontSize:'22px' }} bsPrefix=""></Dropdown.Toggle>
              </div>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/admin/admininfo">
                <i className="fas fa-cogs me-2"></i>Account Settings
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/admin/schoolinfo">
                <i className="fa-solid fa-building-columns me-2"></i>Institute Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-2"></i>Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
            )}


        {isTeacherLoggedIn && (<Nav className="ms-auto">
          <Dropdown align="end">
              <div className='d-flex align-items-center justify-content-center'>
                <div className='rounded-circle overflow-hidden mx-auto  me-3 p-1'  style={{height:'50px', width:'50px'}}><img src={`${BASE_URL}/uploads/${teacherInfo?.teacherImage}`} alt="no image" height={'100%'} width={'100%'}  className='rounded-circle'  /></div>
                <h5 className='text-light pt-2'>{teacherInfo?.teacherName}</h5>
                <Dropdown.Toggle variant="link"className='pt-3 ps-3' id="account-dropdown" style={{ textDecoration: 'none' ,color:'white' ,fontSize:'22px' }} bsPrefix=""></Dropdown.Toggle>
              </div>
            <Dropdown.Menu >
              <Dropdown.Item as={Link} to="/teacher/teacherinfo">
                <i className="fas fa-cogs me-2"></i>Account Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleTeacherLogout}>
                <i className="fas fa-sign-out-alt me-2"></i>Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>)}


        {isStudentLoggedIn && (<Nav className="ms-auto">
          <Dropdown align="end">
              <div className='d-flex align-items-center justify-content-center'>
                <div className='rounded-circle overflow-hidden mx-auto  me-3 p-1' style={{height:'50px', width:'50px'}}><img src={`${BASE_URL}/uploads/${StudentInfo?.studentImage}`} alt="no image" height={'100%'} width={'100%'}  className='rounded-circle'  /></div>
                <h5 className='text-light pt-2'>{StudentInfo?.studentName}</h5>
                <Dropdown.Toggle variant="link"className='pt-3 ps-3' id="account-dropdown" style={{ textDecoration: 'none' ,color:'white' ,fontSize:'22px' }} bsPrefix=""></Dropdown.Toggle>
              </div>
            <Dropdown.Menu >
              <Dropdown.Item as={Link} to="/student/studentinfo">
                <i className="fas fa-cogs me-2"></i>Account Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleStudentLogout}>
                <i className="fas fa-sign-out-alt me-2"></i>Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>)}


          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ paddingTop: '80px' }}>
      </div>
    </>
  );
}

export default Header;
