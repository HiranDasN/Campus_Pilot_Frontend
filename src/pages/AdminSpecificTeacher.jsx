import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';
import {  allClassesAPI, allTeachersAPI } from '../services/allAPI';
import { useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
function AdminSpecificTeacher() {

    
  const { teachername } = useParams();

  const [teacherInfo, setTeacherInfo] = useState({});

  const [teacherClass, setTeacherClass] = useState([]);

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

      const result = await allClassesAPI('', reqHeader);
      setTeacherClass(result.data.filter(classInfo => classInfo.classTeacher.toLowerCase() === teachername.toLowerCase()));
    }
  };

  useEffect(() => {
    getAllClass();
  }, []);


  const getAllTeachers = async () => {
   
      if (sessionStorage.getItem("token")) {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }

        const result = await allTeachersAPI('', reqHeader)
        const filteredTeacher = result.data.filter(teacher => teacher.teacherName.toLowerCase() === teachername.toLowerCase());
        setTeacherInfo(filteredTeacher[0] || {});
        console.log(teacherInfo);
    }
  }

  useEffect(() => {
    getAllTeachers()
  }, [teachername]);


  return (

    <div  style={{background: '#f4f4f4'}}>
      <br />
      <br />
      
      <div className="container">    
       
        <div className='container mt-2 mb-5'>
          <div className='row'>
            <div className='col-lg-4'></div>
  
            <div className='col-lg-4'>
            <Card data-aos="zoom-in" className="h-100 cardshd rounded">
              <Card.Body>
                <h3 className="mb-4 text-center">Teacher Details</h3>
                
                  <div>
                    <div className="text-center">
                      <img src={`${BASE_URL}/uploads/${teacherInfo?.teacherImage}`} alt="Teacher Profile" className="rounded-circle mb-3" width="200" height="200" />
                    </div>
                    <h4 className='text-center mb-3 text-danger'>{teacherInfo?.teacherName} </h4>
                    <h5 className='text-center  mb-4 mt-2'>Class: {teacherClass.length > 0 ? teacherClass[0].className : 'Not Assigned'}</h5>
                    <h5 className='text-center mb-4 mt-2'>Salary: ₹ {teacherInfo?.monthlySalary}</h5>
                    <h5 className='text-center mb-4 mt-2'>Email Id: {teacherInfo?.teacherEmail}</h5>
                    <h5 className='text-center mb-4 mt-2'>Joining Date: {teacherInfo?.joiningDate}</h5>
                    <h5 className='text-center mb-4 mt-2'>Phone: +91 {teacherInfo?.mobileNumber}</h5>
  
  
  
                  </div>
  
              </Card.Body>
            </Card>
            </div>
  
            <div className='col-lg-4'></div>
          </div>
         </div>

         <br />
  
      </div>
    </div>

    )
}

export default AdminSpecificTeacher