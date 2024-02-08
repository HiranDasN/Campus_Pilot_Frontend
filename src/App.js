import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './pages/Register';
import LoginSelect from './pages/LoginSelect';
import ContactSupport from './pages/ContactSupport';
import AboutUs from './pages/AboutUs';
import AdminLogin from './pages/AdminLogin';
import StudentLogin from './pages/StudentLogin';
import TeacherLogin from './pages/TeacherLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProfile from './pages/AdminProfile';
import AdminAccountSetting from './pages/AdminAccountSetting';
import AllClasses from './pages/AllClasses';
import AllTeachers from './pages/AllTeachers';
import AllStudents from './pages/AllStudents';
import AddClasses from './pages/AddClasses';
import AddTeacher from './pages/AddTeacher';
import AddStudent from './pages/AddStudent';
import { useContext } from 'react';
import { isAdminDeletedContext, isAuthTokenContext, isStudentAuthTokenContext, isTeacherAuthTokenContext } from './context/ContextShare';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherAccountSettings from './pages/TeacherAccountSettings';
import StudentDashboard from './pages/StudentDashboard';
import StudentAccount from './pages/StudentAccount';
import SpecificStudents from './pages/SpecificStudents';
import Teacher_Dash_ClassView from './pages/Teacher_Dash_ClassView';
import Teacher_Dash_StudentView from './pages/Teacher_Dash_StudentView';
import Student_Dash_ClassView from './pages/Student_Dash_ClassView';
import Student_SpecificView from './pages/Student_SpecificView';
import Student_Dash_TeacherView from './pages/Student_Dash_TeacherView';
import AdminSpecificTeacher from './pages/AdminSpecificTeacher';
import AdminSpecificStudent from './pages/AdminSpecificStudent';



function App() {

  const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)
  const {isTeacherAuthToken,setIsteacherAuthToken} = useContext(isTeacherAuthTokenContext)
  const {isStudentAuthToken,setIsStudentAuthToken} = useContext(isStudentAuthTokenContext)

  return (
    <div className="App">
    <Header/>
    <Routes>
      
    <Route path='/' element={<Home/>}/>
    <Route path='/loginSelect'  element={<LoginSelect/>}/>
    <Route path='/adminlogin' element={<AdminLogin/>} />
    <Route path='/studentlogin' element={<StudentLogin/>} />
    <Route path='/teacherlogin' element={<TeacherLogin/>} />
    <Route path='/register' element={<Register/>}/> 
    <Route path='/admindashboard' element={isAuthToken?<AdminDashboard/>:<Home/>}/>
    <Route path='/admin/schoolinfo' element={isAuthToken?<AdminProfile/>:<Home/>} />
    <Route path='/admin/admininfo' element={isAuthToken?<AdminAccountSetting/>:<Home/>}/>
    <Route path='/admin/allclasses' element={isAuthToken?<AllClasses/>:<Home/>}/>
    <Route path='/admin/addclasses' element={isAuthToken?<AddClasses/>:<Home/>}/>
    <Route path='/admin/allteachers' element={isAuthToken?<AllTeachers/>:<Home/>} />
    <Route path='/admin/addteacher' element={isAuthToken?<AddTeacher/>:<Home/>}/>
    <Route path='/admin/allstudents' element={isAuthToken?<AllStudents/>:<Home/>}/>
    <Route path='/admin/specificstudents/:classname' element={isAuthToken?<SpecificStudents/>:<Home/>}/>
    <Route path='/admin/addstudent' element={isAuthToken?<AddStudent/>:<Home/>}/>
    <Route path='/contact' element={<ContactSupport/>}  />
    <Route path='/aboutus' element={<AboutUs/>}/>
    <Route path='/admin/teacherspecificdetails/:teachername' element={isAuthToken?<AdminSpecificTeacher/>:<Home/>}/>
    <Route path='/admin/studentspecificdetails/:studentname' element={isAuthToken?<AdminSpecificStudent/>:<Home/>}/>


    <Route path='/teacherdashboard' element={isTeacherAuthToken?<TeacherDashboard/>:<Home/>}/>
    <Route path='/teacher/teacherinfo' element={isTeacherAuthToken?<TeacherAccountSettings/>:<Home/>}/>
    <Route path='/teacher/teacherclass/:classname' element={isTeacherAuthToken?<Teacher_Dash_ClassView/>:<Home/>}/>
    <Route path='/teacher/teacherstudent/:classname' element={isTeacherAuthToken?<Teacher_Dash_StudentView/>:<Home/>}/>




    <Route path='/studentdashboard' element={isStudentAuthToken?<StudentDashboard/>:<Home/>}/>
    <Route path='/student/studentinfo' element={isStudentAuthToken?<StudentAccount/>:<Home/>}/>
    <Route path='/student/studentclass/:classname' element={isStudentAuthToken?<Student_Dash_ClassView/>:<Home/>}/>
    <Route path='/student/specificstudents/:classname' element={isStudentAuthToken?<Student_SpecificView/>:<Home/>}/>
    <Route path='/student/classTeacher/:classname' element={isStudentAuthToken?<Student_Dash_TeacherView/>:<Home/>}/>

  
    </Routes>
    <Footer/>
    </div>
  );
}

export default App;
