import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';
import { allClassesAPI } from '../services/allAPI';
import { Link } from 'react-router-dom';


function TeacherDashboard() {

  const [teacherInfo,setTeacherInfo] = useState({})
  const [teacherClass, setTeacherClass] = useState([]);


 


  useEffect(() => {
    setTeacherInfo(JSON.parse(sessionStorage.getItem("existingTeacher")));
    
    async function fetchTeacherClass() {
      if (sessionStorage.getItem("token")) {
        const token = sessionStorage.getItem("token");
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };

        try {
          const result = await allClassesAPI('', reqHeader);
          setTeacherClass(result.data.filter(classInfo => classInfo.classTeacher === teacherInfo.teacherName));
        } catch (error) {
          console.error("Error fetching teacher's class:", error);
        }
      }
    }

    fetchTeacherClass();
  }, [teacherClass]);

  

  return (
    
    <div  style={{background: '#f4f4f4'}}>
      <br />
      <br />
      
      <div className="container">
        <h2 className='mb-5'>Welcome <span className='text-success'>{teacherInfo?.teacherName}</span> to Teacher Dashboard</h2>
  
       
  
        <div className="row mt-4 text-center">
          <div className="col-md-6">
            <div className="card p-2 cardshd " >
              <div className="card-body">
                <h3 className="card-title mb-4">Class Information</h3>
                <h5 className="card-text mb-3">You can view information about the classes you are teaching here.</h5>
                <Link to={`/teacher/teacherclass/${teacherClass[0]?.className}`} className="btn btn-primary">View Classes</Link>
              </div>
            </div>
          </div>
  
          <div className="col-md-6">
            <div className="card p-2 cardshd">
              <div className="card-body">
                <h3 className="card-title mb-4">Students</h3>
                <h5 className="card-text mb-3">Check and manage information about your students.</h5>
                <Link  to={`/teacher/teacherstudent/${teacherClass[0]?.className}`} className="btn btn-primary">View Students</Link>
              </div>
            </div>
          </div>
        </div>
  
    
       
        <div className='container mt-5 mb-5'>
          <div className='row'>
            <div className='col-lg-4'></div>
  
            <div className='col-lg-4'>
            <Card className="h-100 cardshd rounded">
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
    
  );
}

export default TeacherDashboard;
