import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, TextField, Button, Typography, Input } from '@mui/material';
import Swal from 'sweetalert2';
import { updateProfileAPI } from '../../services/allAPI';
import { BASE_URL } from '../../services/baseurl';
import { editInstituteResponseContext } from '../../context/ContextShare';
import AOS from 'aos';
import 'aos/dist/aos.css';
function ProfileUpdate() {
  

  const [isUpdate,setIsUpdate] = useState(false)
  const {editInstituteResponse,setEditInstituteResponse} = useContext(editInstituteResponseContext)

  const [adminProfile,setAdminProfile] = useState({
    username:"",
    email:"",
    password:"",
    schoolImage:"",
    instituteName:"",
    phoneNumber:"",
    schoolEmail:"",
    location:""
  })

  const [existingImage,setExistingImage]= useState("")
  const [preview,setPreview]=useState("")
  console.log(adminProfile);
  useEffect(()=>{
    const admin = JSON.parse(sessionStorage.getItem("existingAdmin"))
   setAdminProfile({...adminProfile,username:admin.username,email:admin.email,password:admin.password,schoolImage:"",instituteName:admin.instituteName,phoneNumber:admin.phoneNumber,schoolEmail:admin.schoolEmail,location:admin.location})
   setExistingImage(admin.schoolImage)
 },[isUpdate])

 useEffect(()=>{
   if(adminProfile.schoolImage){
     console.log(URL.createObjectURL(adminProfile.schoolImage));
     setPreview(URL.createObjectURL(adminProfile.schoolImage));
   }
   else{
      setPreview("")
     
   }
 },[adminProfile.schoolImage])


 const handleProfileUpdate = async()=>{
   const {username,email,password,schoolImage,instituteName,phoneNumber,schoolEmail,location} = adminProfile

   if(!schoolImage || !instituteName || !phoneNumber || !schoolEmail || !location){

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      Swal.fire({
        title: "Warning",
        text: "Please enter a valid 10-digit phone number.",
        icon: "warning"
      });
      return;
    }

    Swal.fire({
      title: "Warning",
      text: "Please Fill the Form Completely !!",
      icon: "warning"
    });
   }
   else{
     const reqBody = new FormData()
     reqBody.append("username",username)
     reqBody.append("email",email)
     reqBody.append("password",password)
     preview?reqBody.append("schoolImage",schoolImage):reqBody.append("schoolImage",existingImage)
     reqBody.append("instituteName",instituteName)
     reqBody.append("phoneNumber",phoneNumber)
     reqBody.append("schoolEmail",schoolEmail)
     reqBody.append("location",location)

     const token = sessionStorage.getItem("token")

     if(preview){
       const reqHeader ={
         "Content-Type":"multipart/form-data",
         "Authorization":`Bearer ${token}`
     }
     const result = await updateProfileAPI(reqBody,reqHeader)
     console.log(result);
     if(result.status ==200){
      Swal.fire({
        title:"Success" ,
        text:"Institute Profile Updated  Successfully",
        icon: "success"
      });
       setIsUpdate(true)
       sessionStorage.setItem("existingAdmin",JSON.stringify(result.data))
       setEditInstituteResponse(result.data)
     }
     else{
       console.log(result.response.data);
     }
     }
     else{
       const reqHeader ={
         "Content-Type":"application/json",
         "Authorization":`Bearer ${token}`
     } 
     const result = await updateProfileAPI(reqBody,reqHeader)
     console.log(result);
     if(result.status ==200){
      Swal.fire({
        title:"Success" ,
        text:"Institute Profile Updated  Successfully",
        icon: "success"
      });       
      setIsUpdate(true)
       sessionStorage.setItem("existingAdmin",JSON.stringify(result.data))
       setEditInstituteResponse(result.data)
     }
     else{
       console.log(result.response.data);
     }
     }

   }

 }


 useEffect(()=>{
  AOS.init({duration:'1000' , delay:'100'});
},[])

  return (
    <>

      <div data-aos="fade-up-right" className='cardshd container rounded' style={{background: 'white'}}>
          <Typography className='pt-2' variant="h4" component="h2" align="center" gutterBottom>
            Update Institute Profile
          </Typography>
    
          <form >
            <Grid container spacing={2} justifyContent="center">
              
              <Grid item xs={12}>
                <label htmlFor="logo" style={{ marginBottom: '1', display: 'block' }}>
                  Institute Logo
                </label>
                <Input
                  type="file"
                  id="logo"
                  name="schoolImage"
                  accept="image/*"
                  fullWidth
      
                  onChange={(e)=>setAdminProfile({...adminProfile,schoolImage:e.target.files[0]})}
                />
              </Grid>
    
              
              <Grid item xs={12}>
                <TextField
                  label="Institute Name"
                  variant="outlined"
                  type='text'
                  fullWidth
                  name="instituteName"
                  value={adminProfile.instituteName}
                  onChange={(e)=>setAdminProfile({...adminProfile,instituteName:e.target.value})}
                />
              </Grid>
    
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  type='number'
                  fullWidth
                  name="phoneNumber"
                  value={adminProfile.phoneNumber}
                  onChange={(e)=>setAdminProfile({...adminProfile,phoneNumber:e.target.value})}                />
              </Grid>
    
             
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type='email'
                  name="schoolEmail"
                  value={adminProfile.schoolEmail}
                  onChange={(e)=>setAdminProfile({...adminProfile,schoolEmail:e.target.value})}                />
              </Grid>
    
              
              <Grid item xs={12}>
                <TextField
                  label="Location"
                  variant="outlined"
                  fullWidth
                  type='text'
                  name="location"
                  value={adminProfile.location}
                  onChange={(e)=>setAdminProfile({...adminProfile,location:e.target.value})}                />
              </Grid>
    
              
              <Grid item xs={12} align="center">
              <button type="button" onClick={handleProfileUpdate} class="btn btn-info mb-4">Update</button>
              </Grid>
            </Grid>
          </form>
      </div>
    </>
  );
}

export default ProfileUpdate;
