import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row ,Col } from 'react-bootstrap'
import { TextField, FormControl, InputLabel, Input, InputAdornment } from '@mui/material';
import { BASE_URL } from '../../services/baseurl';
import Swal from 'sweetalert2';
import { editTeacherAPI } from '../../services/allAPI';
import { editTeacherResponseContext } from '../../context/ContextShare';

function EditTeacher({teacherupdate}) {

  const{editTeacherResponse,setEditTeacherResponse} = useContext(editTeacherResponseContext)

  const [show, setShow] = useState(false);
  
  const [teacherAdd, setTeacherAdd] = useState({
    id:teacherupdate._id,
    teacherImage: "",  
    teacherName:teacherupdate.teacherName ,
    mobileNumber:teacherupdate.mobileNumber,
    monthlySalary:teacherupdate.monthlySalary 
  });

  console.log(teacherAdd);
  const [previewTeacher, setPreviewTeacher] = useState("");


    const handleClose = () => { setShow(false);
    handleClose1()}
    const handleShow = () => setShow(true);

    useEffect(()=>{
      if(teacherAdd.teacherImage){
        setPreviewTeacher(URL.createObjectURL(teacherAdd.teacherImage))
      }

    },[teacherAdd.teacherImage])

    const handleClose1 =()=> {
      setTeacherAdd({
        id: teacherupdate._id,
        teacherImage: "",  
        teacherName:teacherupdate.teacherName ,
        mobileNumber:teacherupdate.mobileNumber,
        monthlySalary:teacherupdate.monthlySalary 
      })
      setPreviewTeacher("")
    }

    const handleUpdate = async()=>{

      const {teacherImage,teacherName,mobileNumber,monthlySalary,id} = teacherAdd

      const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(mobileNumber)) {
      Swal.fire({
        title: "Warning",
        text: "Please enter a valid 10-digit phone number.",
        icon: "warning"
      });
      return;
    }
    
        if(!teacherName || !mobileNumber || !monthlySalary ){
          Swal.fire({
            title: "Warning",
            text: "Please Fill the Form Completely !!",
            icon: "warning"
          });
        }
        else{
            const reqBody =new FormData()
            previewTeacher?reqBody.append("teacherImage",teacherImage):reqBody.append("teacherImage",teacherupdate.teacherImage)
            reqBody.append("teacherName",teacherName)
            reqBody.append("mobileNumber",mobileNumber)
            reqBody.append("monthlySalary",monthlySalary)
           

        const token = sessionStorage.getItem("token")
        if(previewTeacher){
            const reqHeader = {
                "Content-Type" : "multipart/form-data",
                "Authorization" : `Bearer ${token}`
            }
            const result = await editTeacherAPI(id,reqBody,reqHeader)
            console.log(result);
            if(result.status===200){
              Swal.fire({
                title:"Success" ,
                text:"Teacher Updated Successfully",
                icon: "success"
              });
                handleClose()
                setEditTeacherResponse(result.data)
            }
            else{
                console.log(result.response.data);
            }
        }
        else{ 
            const reqHeader = {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
              }
              const result = await editTeacherAPI(id,reqBody,reqHeader)
              console.log(result);
              if(result.status === 200){
                Swal.fire({
                  title:"Success" ,
                  text:"Teacher Updated Successfully",
                  icon: "success"
                });
                handleClose()
                setEditTeacherResponse(result.data)
            }
            else{
                console.log(result.response.data);
            }
        }

    }

    }
  return (

    <div>
    <button onClick={handleShow} className='btn btn-info rounded'> <i className="fa-solid fa-pen-to-square"></i></button>

   <Modal
   show={show}
   onHide={handleClose}
   backdrop="static"
   keyboard={false}
   size='lg'
   centered
   >
   <Modal.Header closeButton>
   <Modal.Title ><h3 className='d-flex justify-content-center align-items-center'>Teacher Details</h3></Modal.Title>
   </Modal.Header>
   <Modal.Body>
   <Row className='container'>
   <Col md={6} className='d-flex justify-content-center align-items-center flex-column'>
         <label htmlFor="image" className='text-center'>
                <input id="image" type="file" style={{display:"none"}} onChange={e=>setTeacherAdd({...teacherAdd,teacherImage:e.target.files[0]})}   />
                <img  width={'300px'} height={'300px'} src={previewTeacher?previewTeacher:`${BASE_URL}/uploads/${teacherupdate.teacherImage}`} alt="no image"  /> 
                <br />
                <br />
            </label>
        </Col>
   <Col md={6} className='d-flex justify-content-center align-items-center flex-column'>
       
   <div className="mb-3 w-100">
     <TextField fullWidth label="Teacher Name" type='text' variant="outlined" value={teacherAdd.teacherName} onChange={e=>setTeacherAdd({...teacherAdd,teacherName:e.target.value})} />
   </div>

   <div className="mb-3 w-100">
     <TextField fullWidth label="Mobile Number" type='number' variant="outlined" value={teacherAdd.mobileNumber} onChange={e=>setTeacherAdd({...teacherAdd,mobileNumber:e.target.value})} />
   </div>

   <FormControl fullWidth>
          <InputLabel htmlFor="monthlySalary">Monthly Salary</InputLabel>
          <Input
            id="monthlySalary"
            name="monthlySalary"
            type="number"
            value={teacherAdd.monthlySalary} 
            onChange={e=>setTeacherAdd({...teacherAdd,monthlySalary:e.target.value})}
            startAdornment={<InputAdornment position="start">₹</InputAdornment>}

          />
     </FormControl>
   </Col>

   </Row>
   </Modal.Body>
   <Modal.Footer className='d-flex justify-content-center align-items-center'>
   <Button variant="danger" onClick={handleClose1}>Cancel</Button>
   <Button variant="success" onClick={handleUpdate}  >Update</Button>
   </Modal.Footer>
   </Modal>
   </div>
  )
}

export default EditTeacher