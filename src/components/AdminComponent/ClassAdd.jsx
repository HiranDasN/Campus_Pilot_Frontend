import React, { useEffect, useState } from 'react'
import { Container, TextField, MenuItem, Grid } from '@mui/material';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { allTeachersAPI, registerClassAPI } from '../../services/allAPI';

function ClassAdd() {
    
    const [token,setToken] = useState("")
    const [teacherSearchKey,setTeacherSearchKey] = useState("")
    
    const [allClassTchrget,setAllClassTchrGet] = useState([])

    const [classAdd, setClassAdd] = useState({
        className: "",
        tuitionFee: "",
        classTeacher: ""
      });
   

      console.log(classAdd);


      const getAllClassTeachers = async()=>{

        if(sessionStorage.getItem("token")){
          const token = sessionStorage.getItem("token")
          const reqHeader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
    
          const result = await allTeachersAPI(teacherSearchKey,reqHeader)
          console.log(result.data);
          setAllClassTchrGet(result.data)
        } 
    }


    useEffect(()=>{
      getAllClassTeachers()
    },[])

  

      useEffect(()=>{
        if(sessionStorage.getItem("token")){
          setToken(sessionStorage.getItem("token"))
        }
        else{
          setToken("")
        }
      },[])

      const handleClear =()=>{
        setClassAdd({
          className: "",
        tuitionFee: "",
        classTeacher: ""
        })
      }


      const handleClassAdd = async(e)=>{
        e.preventDefault()

        const {className,tuitionFee,classTeacher} = classAdd

        if(!className || !tuitionFee || !classTeacher){
          Swal.fire({
            title: "Warning",
            text: "Please Fill the Form Completely !!",
            icon: "warning"
          });
        }
        else{

          if(token){ 
            const reqHeader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
           }


          const result = await registerClassAPI(classAdd,reqHeader)
          console.log(result);

          if(result.status === 200){

            console.log(result.data);
            
            Swal.fire({
              title:"Success" ,
              text:"Class Added Successfully",
              icon: "success"
            });

            handleClear()
          }
          else{
            console.log(result.response.data);
          }
        }
      }
    };
  return (
    <div className='cardshd mt-5' style={{  padding: '16px' }}>
      <Container component="main">
      <h3>Add Class</h3>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Class Name"
                name="className"
                type='text'
                variant="outlined"
                value={classAdd.className}
                onChange={(e)=>setClassAdd({...classAdd,className:e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Monthly Tuition Fee"
                name="tuitionFee"
                type='number'
                variant="outlined"
                value={classAdd.tuitionFee}
                onChange={(e)=>setClassAdd({...classAdd,tuitionFee:e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Select Class Teacher"
                name="classTeacher"
                type='text'
                variant="outlined"
                value={classAdd.classTeacher}
                onChange={(e)=>setClassAdd({...classAdd,classTeacher:e.target.value})}
              >
                <MenuItem >
                  <em>-- Select Teacher --</em>
               </MenuItem>
               
                {allClassTchrget?.length>0?
                allClassTchrget?.map((item)=>(<MenuItem value={item.teacherName}>{item.teacherName}</MenuItem>))
                  :
                  <MenuItem className='text-danger'>No Teachers Found</MenuItem>
                }

              </TextField>
            </Grid>
          </Grid>
          <div className='justify-content-center align-items-center d-flex'><Button onClick={handleClassAdd}  className='mt-4 mb-4 ' variant="info" >Add Class</Button></div>
          
        </form>
      </Container>
    </div>
  );
}

export default ClassAdd