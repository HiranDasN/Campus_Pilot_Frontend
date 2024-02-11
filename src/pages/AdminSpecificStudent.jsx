import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';
import { allClassesAPI, allStudentsAPI } from '../services/allAPI';
import { useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
function AdminSpecificStudent() {

    const { studentname } = useParams();

    const [StudentInfo,setStudentInfo] = useState({})

    const [studentClass, setStudentClass] = useState([]);

    useEffect(()=>{
      AOS.init({duration:'1000' , delay:'100'});
    },[])

    const getAllStudents = async()=>{
    
        if(sessionStorage.getItem("token")){
          const token = sessionStorage.getItem("token")
          const reqHeader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
    
          const result = await allStudentsAPI ('',reqHeader)
          const filteredStudents = result.data.filter(student => student.studentName.toLowerCase() === studentname.toLowerCase());
          setStudentInfo(filteredStudents[0] || {})
    
        } 
    }

    useEffect(()=>{
        getAllStudents()
      },[])

      const getAllClass = async () => {
        if (sessionStorage.getItem("token")) {
          const token = sessionStorage.getItem("token");
    
          const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          };
    
          const result = await allClassesAPI('', reqHeader);
          console.log(result.data);
          setStudentClass(result.data.filter(classInfo => classInfo?.className === StudentInfo?.selectedClass));
        }
      };
    
      console.log(studentClass);
    
      useEffect(() => {
        getAllClass();
      });

  return (


    
    <div  style={{background: '#f4f4f4'}}>
      <br />
      <br />

    <div className="container">
     
       
        <div className='container mb-5'>
          <div className='row'>
            <div className='col-lg-4'></div>
  
            <div className='col-lg-4'>
            <Card data-aos="zoom-in" className="h-100 cardshd rounded">
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

    )
}

export default AdminSpecificStudent