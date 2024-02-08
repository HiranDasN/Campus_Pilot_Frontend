import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../services/baseurl';
import { Card } from 'react-bootstrap';
import { allClassesAPI } from '../services/allAPI';
import { Link } from 'react-router-dom';

function StudentDashboard() {

  const [StudentInfo,setStudentInfo] = useState({})

  const [studentClass, setStudentClass] = useState([]);


 


  useEffect(() => {
    setStudentInfo(JSON.parse(sessionStorage.getItem("existingStudent")));
    
    async function fetchStudentClass() {
      if (sessionStorage.getItem("token")) {
        const token = sessionStorage.getItem("token");
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };

        try {
          const result = await allClassesAPI('', reqHeader);
          setStudentClass(result.data.filter(classInfo => classInfo.className === StudentInfo.selectedClass));
        } catch (error) {
          console.error("Error fetching student's class:", error);
        }
      }
    }

    fetchStudentClass();
  }, [studentClass]);
  return (

    <div  style={{background: '#f4f4f4'}}>
      <br />
      <br />

    <div className="container mt-5">
      <h2>Welcome <span className='text-success'>{StudentInfo?.studentName}</span> to Student Dashboard</h2>
      

      <div className="row mt-4 text-center">
          <div className="col-md-6">
            <div className="card p-2 cardshd " >
              <div className="card-body">
                <h3 className="card-title mb-4">Class Information</h3>
                <h5 className="card-text mb-3">You can view information about your Class.</h5>
                <Link to={`/student/studentclass/${StudentInfo?.selectedClass}`} className="btn btn-primary">View Class</Link>
              </div>
            </div>
          </div>
  
          <div className="col-md-6">
            <div className="card p-2 cardshd">
              <div className="card-body">
                <h3 className="card-title mb-4">Class Teacher</h3>
                <h5 className="card-text mb-3">Check  information about your Class Teacher.</h5>
                <Link to={`/student/classTeacher/${StudentInfo?.selectedClass}`} className="btn btn-primary">View Class Teacher</Link>
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
                <h3 className="mb-4 text-center">Student Details</h3>
                
                  <div>
                    <div className="text-center">
                      <img src={`${BASE_URL}/uploads/${StudentInfo?.studentImage}`} alt="Teacher Profile" className="rounded-circle mb-3" width="200" height="200" />
                    </div>
                    <h4 className='text-center mb-3 text-danger'>{StudentInfo?.studentName} </h4>
                    <h5 className='text-center mb-4 mt-2'>Reg.No: {StudentInfo?.registrationNumber}</h5>
                    <h5 className='text-center  mb-4 mt-2'>Class: {StudentInfo?.selectedClass}</h5>
                    <h5 className='text-center mb-4 mt-2'>Date Of Admission: {StudentInfo?.admissionDate}</h5>
                    <h5 className='text-center mb-4 mt-2'>Tuition Fees: ₹ {studentClass.length > 0 ? studentClass[0].tuitionFee : 'Not Assigned'}</h5>
                    <h5 className='text-center mb-4 mt-2'>Email Id: {StudentInfo?.studentEmail}</h5>
  
  
  
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

export default StudentDashboard;
