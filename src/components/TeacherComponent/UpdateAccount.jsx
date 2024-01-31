import React, { useContext, useEffect, useState } from 'react'
import { Container, Card, TextField, Button } from '@mui/material';
import Swal from 'sweetalert2';
import { editTeacherLoginAPI } from '../../services/allAPI';
import { tchrLogEditContext } from '../../context/ContextShare';
function UpdateAccount() {

  const {tchrLogEdit,setTchrLogEdit} = useContext(tchrLogEditContext)
    const [teacherLoginData, setTeacherLoginData] = useState({
        
        teacherEmail:'',
        teacherPswd:'',
      });

      
useEffect(()=>{
  setTeacherLoginData(JSON.parse(sessionStorage.getItem("existingTeacher")))
  console.log(teacherLoginData._id)
  
},[])
      const handleUpdate = async()=>{

        const {teacherEmail,teacherPswd} = teacherLoginData
      
          if(!teacherEmail || !teacherPswd ){
            Swal.fire({
              title: "Warning",
              text: "Please Fill the Form Completely !!",
              icon: "warning"
            });
          }
          else{
              const reqBody =new FormData()
              reqBody.append("teacherEmail",teacherEmail)
              reqBody.append("teacherPswd",teacherPswd)
             
      
          const token = sessionStorage.getItem("token")
                const reqHeader = {
                  "Content-Type" : "application/json",
                  "Authorization" : `Bearer ${token}`
                }
              const result = await editTeacherLoginAPI(teacherLoginData._id,reqBody,reqHeader)
              console.log(result);
              if(result.status===200){
                Swal.fire({
                  title:"Success" ,
                  text:"Account Updated Successfully",
                  icon: "success"
                });
                   setTchrLogEdit(result.data)
                  sessionStorage.setItem("existingTeacher",JSON.stringify(result.data))
      
              }
              else{
                  console.log(result.response.data);
              }
          }
      
      }
  return (
    <Container className="my-5">
<div className='cardshd'>
      <Card className="p-4">
        <h2 className="text-center mb-4">Update Account</h2>
        <form>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            placeholder="Enter new email"
            name="email"
            value={teacherLoginData.teacherEmail}
            onChange={e=>setTeacherLoginData({...teacherLoginData,teacherEmail:e.target.value})}
            className="mb-3"
          />
  
          <TextField
            fullWidth
            label="Password"
            type="password"
            placeholder="Enter new password"
            name="password"
            value={teacherLoginData.teacherPswd}
            onChange={e=>setTeacherLoginData({...teacherLoginData,teacherPswd:e.target.value})}
            className="mb-3"
          />
  
          <div className="d-flex justify-content-center mt-4">
          <button type="button" onClick={handleUpdate} class="btn btn-info">Update</button>
          </div>
        </form>
      </Card>
</div>
  </Container>
  );
}

export default UpdateAccount