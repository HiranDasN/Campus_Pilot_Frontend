import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, TextField, Button } from '@mui/material';
import { editAdminLoginAPI } from '../../services/allAPI';
import Swal from 'sweetalert2';
import { editAdminLogResponseContext } from '../../context/ContextShare';
import AOS from 'aos';
import 'aos/dist/aos.css';
function UpdateAdmin() {

  const [adminLoginData, setAdminLoginData] = useState({
    email:'',
    password:'',
  });

  const {editAdminLogResponse,setEditAdminLogResponse} = useContext(editAdminLogResponseContext)
  
useEffect(()=>{
  setAdminLoginData(JSON.parse(sessionStorage.getItem("existingAdmin")))
  
},[])

useEffect(()=>{
  AOS.init({duration:'1000' , delay:'100'});
},[])

const handleUpdate = async()=>{

  const {email,password} = adminLoginData

    if(!email || !password ){
      Swal.fire({
        title: "Warning",
        text: "Please Fill the Form Completely !!",
        icon: "warning"
      });
    }
    else{
        const reqBody =new FormData()
        reqBody.append("email",email)
        reqBody.append("password",password)
       

    const token = sessionStorage.getItem("token")
          const reqHeader = {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
          }
        const result = await editAdminLoginAPI(reqBody,reqHeader)
        console.log(result);
        if(result.status===200){
          Swal.fire({
            title:"Success" ,
            text:"Admin Updated Successfully",
            icon: "success"
          });
            setEditAdminLogResponse(result.data)
            sessionStorage.setItem("existingAdmin",JSON.stringify(result.data))

        }
        else{
            console.log(result.response.data);
        }
    }

    }


  return (
    <Container className="my-5">
     <div data-aos="fade-up-right" className='cardshd'>
        <Card className="p-4">
          <h2 className="text-center mb-4">Update Admin</h2>
          <form>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              placeholder="Enter new email"
              name="email"
              value={adminLoginData.email}
              onChange={e=>setAdminLoginData({...adminLoginData,email:e.target.value})}
              className="mb-3"
            />
  
            <TextField
              fullWidth
              label="Password"
              type="password"
              placeholder="Enter new password"
              name="password"
              value={adminLoginData.password}
              onChange={e=>setAdminLoginData({...adminLoginData,password:e.target.value})}
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

export default UpdateAdmin;
