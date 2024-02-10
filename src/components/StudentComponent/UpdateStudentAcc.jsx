import React, { useContext, useEffect, useState } from 'react'
import { Container, Card, TextField, Button } from '@mui/material';
import { editStdLoginAPI } from '../../services/allAPI';
import Swal from 'sweetalert2';
import { studLogEditContext } from '../../context/ContextShare';import AOS from 'aos';
import 'aos/dist/aos.css';

function UpdateStudentAcc() {

  const {studLogEdit,setStudLogEdit} = useContext(studLogEditContext)

    const [studentLoginData, setStudentLoginData] = useState({
        
        studentEmail:'',
        studentPswd:'',
      });

      useEffect(()=>{
        AOS.init({duration:'1000' , delay:'100'});
      },[])  
      
useEffect(()=>{
  setStudentLoginData(JSON.parse(sessionStorage.getItem("existingStudent")))
  console.log(studentLoginData._id);
  
},[])
      const handleUpdate = async()=>{

        const {studentEmail,studentPswd} = studentLoginData
      
          if(!studentEmail || !studentPswd ){
            Swal.fire({
              title: "Warning",
              text: "Please Fill the Form Completely !!",
              icon: "warning"
            });
          }
          else{
              const reqBody =new FormData()
              reqBody.append("studentEmail",studentEmail)
              reqBody.append("studentPswd",studentPswd)
             
      
          const token = sessionStorage.getItem("token")
                const reqHeader = {
                  "Content-Type" : "application/json",
                  "Authorization" : `Bearer ${token}`
                }
              const result = await editStdLoginAPI(studentLoginData._id,reqBody,reqHeader)
              console.log(result);
              if(result.status===200){
                Swal.fire({
                  title:"Success" ,
                  text:"Account Updated Successfully",
                  icon: "success"
                });
                setStudLogEdit(result.data)
                  sessionStorage.setItem("existingStudent",JSON.stringify(result.data))
      
              }
              else{
                  console.log(result.response.data);
              }
          }
      
      }
  return (

    <Container className="my-5">
   <div data-aos="fade-up-right" className='cardshd'>
      <Card className="p-4 ">
        <h2 className="text-center mb-4">Update Account</h2>
        <form>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            placeholder="Enter new email"
            name="email"
            value={studentLoginData.studentEmail}
            onChange={e=>setStudentLoginData({...studentLoginData,studentEmail:e.target.value})}
            className="mb-3"
          />
  
          <TextField
            fullWidth
            label="Password"
            type="password"
            placeholder="Enter new password"
            name="password"
            value={studentLoginData.studentPswd}
            onChange={e=>setStudentLoginData({...studentLoginData,studentPswd:e.target.value})}
            className="mb-3"
          />
  
          <div className="d-flex justify-content-center mt-4">
          <button type="button" onClick={handleUpdate} class="btn btn-info">Update</button>
          </div>
        </form>
      </Card>
   </div>
  </Container>

    )
}

export default UpdateStudentAcc