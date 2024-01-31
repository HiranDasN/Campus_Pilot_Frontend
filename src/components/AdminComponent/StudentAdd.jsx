import React, { useEffect, useState } from 'react';
import {  TextField, Select, MenuItem, InputLabel, FormControl, Input ,InputAdornment } from '@mui/material';
import { Button } from 'react-bootstrap';
import { allClassesAPI, registerStudentAPI } from '../../services/allAPI';
import Swal from 'sweetalert2';
function StudentAdd() {
  const [previewStudent, setPreviewStudent] = useState("");
  const [classSearchKey,setClassSearchKey] = useState("")
  const [token,setToken] = useState("")
  
  const [studentData, setStudentData] = useState({
      studentImage:"",
      studentName:"",
      registrationNumber:"",
      studentEmail:"",
      studentPswd:"",
      selectedClass:"",
      admissionDate:""
  });
  console.log(studentData);

  const [allClsgetMenu,setAllClsgetMenu] = useState([])

  const getAllClassMenu = async()=>{

    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")

      const reqHeader={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }

      const result = await allClassesAPI(classSearchKey,reqHeader)
      console.log(result.data);
      setAllClsgetMenu(result.data)
    }

   
  }

  useEffect(() => {
    if (studentData.studentImage) {
      setPreviewStudent(URL.createObjectURL(studentData.studentImage));
    }
  }, [studentData.studentImage]);


  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
    else{
      setToken("")
    }
  },[])

  console.log(previewStudent);

  const handleClose3 =()=>{
    setStudentData({
      studentImage:"",
      studentName:"",
      registrationNumber:"",
      studentEmail:"",
      studentPswd:"",
      selectedClass:"",
      admissionDate:""
    })
    setPreviewStudent("")
  }



  const handleStudAdd = async(e)=>{
    e.preventDefault();

    const {studentImage,studentName,registrationNumber,studentEmail,studentPswd,selectedClass,admissionDate} = studentData

    if(!studentData.studentImage || !studentData.studentName || !studentData.registrationNumber || !studentData.studentEmail || !studentData.studentPswd || !studentData.selectedClass || !studentData.admissionDate){
      Swal.fire({
        title: "Warning",
        text: "Please Fill the Form Completely !!",
        icon: "warning"
      });
    }
    else{

      const reqBody = new FormData()
     reqBody.append("studentImage",studentImage)
     reqBody.append("studentName",studentName)
     reqBody.append("registrationNumber",registrationNumber)
     reqBody.append("studentEmail",studentEmail)
     reqBody.append("studentPswd",studentPswd)
     reqBody.append("selectedClass",selectedClass)
     reqBody.append("admissionDate",admissionDate)


     if(token){ 
      const reqHeader = {
      "Content-Type":"multipart/form-data",
      "Authorization":`Bearer ${token}`
     }

     const result = await registerStudentAPI(reqBody,reqHeader)
     console.log(result);

     if(result.status === 200){
      console.log(result);
      Swal.fire({
        title:"Success" ,
        text:"Student Added Successfully",
        icon: "success"
      });
      
      handleClose3()
     }
     else{
      console.log(result.response.data);
     }

    }




    }

  }



  
  useEffect(()=>{
    getAllClassMenu()
  },[])





  return (
    <div className='cardshd mt-5 p-4 rounded mb-5' style={{  padding: '20px' }}>
    <h3>Add Student</h3>
    <form>
    <InputLabel className='mb-1' htmlFor="studentImage">Student Image</InputLabel>
      <input
        type="file"
        name="studentImage"
        onChange={(e) => setStudentData({ ...studentData, studentImage: e.target.files[0] })}
        accept="image/*"
      />

      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        type='text'
        name="studentName"
        value={studentData.studentName}
        onChange={(e) => setStudentData({ ...studentData, studentName: e.target.value })}
      />

      <TextField
        label="Registration Number"
        variant="outlined"
        fullWidth
        margin="normal"
        type='number'
        name="registrationNumber"
        value={studentData.registrationNumber}
        onChange={(e) => setStudentData({ ...studentData, registrationNumber: e.target.value })}
      />

        <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            name="studentEmail"
            value={studentData.studentEmail}
            onChange={(e) => setStudentData({ ...studentData, studentEmail: e.target.value })}

            className="mb-3"
          />

          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            name="studentPswd"
            value={studentData.studentPswd}
            onChange={(e) => setStudentData({ ...studentData, studentPswd: e.target.value })}

            className="mb-3"
          />

      
        
        <TextField
          fullWidth
          select
          label="Select Student Class"
          name="Select Class"
          type='text'
          variant="outlined"
          value={studentData.selectedClass}
          onChange={(e) => setStudentData({ ...studentData, selectedClass: e.target.value })}
        >
          <MenuItem >
            <em>-- Select Class --</em>
          </MenuItem>

          {allClsgetMenu?.length>0?
          allClsgetMenu?.map((item)=>( <MenuItem value={item.className}>{item.className}</MenuItem>))
           :
           <MenuItem className='text-danger'>No Classses Found</MenuItem>

            }

        </TextField>
      

      <FormControl fullWidth className='mb-3 mt-3'>
      <InputLabel htmlFor="joindate">Admission Date</InputLabel>
      <Input
        id="joindate"
        type="date"
        name="admissionDate"
        value={studentData.admissionDate} 
        onChange={(e) => setStudentData({ ...studentData, admissionDate: e.target.value })}

        startAdornment={<InputAdornment position="start"></InputAdornment>}
      />
      </FormControl>

<div className='justify-content-center align-items-center d-flex'><Button onClick={handleStudAdd} className='mt-4 mb-4 ' variant="info" >Add Student</Button></div>
    </form>
  </div>
  );
}

export default StudentAdd;
