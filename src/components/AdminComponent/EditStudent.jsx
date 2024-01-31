import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row ,Col } from 'react-bootstrap'
import { TextField,MenuItem} from '@mui/material';
import { allClassesAPI, editStudentAPI } from '../../services/allAPI';
import { BASE_URL } from '../../services/baseurl';
import Swal from 'sweetalert2';
import { editStudentResponseContext } from '../../context/ContextShare';

function EditStudent({studentupdate}) {

  const [allClassget,setAllClassGet] = useState([])
  const [classSearchKey,setClassSearchKey] = useState("")
  const [show, setShow] = useState(false);
  const {editStudentResponse,setEditStudentResponse} = useContext(editStudentResponseContext)

  const [studentData, setStudentData] = useState({
    id:studentupdate._id,
    studentImage:"",
    studentName:studentupdate.studentName,
    registrationNumber:studentupdate.registrationNumber,
    selectedClass:studentupdate.selectedClass
  });

const [previewStudent, setPreviewStudent] = useState("");

useEffect(()=>{
  if(studentData.studentImage){
    setPreviewStudent(URL.createObjectURL(studentData.studentImage))
  }

},[studentData.studentImage])

const handleClose1 =()=> {
  setStudentData({
    id:studentupdate._id,
    studentImage:"",
    studentName:studentupdate.studentName,
    registrationNumber:studentupdate.registrationNumber,
    selectedClass:studentupdate.selectedClass
  })
  setPreviewStudent("")
}
  
    const handleClose = () => { setShow(false);
    handleClose1() }
    const handleShow = () => setShow(true);

    const getAllClass = async()=>{

      if(sessionStorage.getItem("token")){
        const token = sessionStorage.getItem("token")
        const reqHeader = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
  
        const result = await allClassesAPI(classSearchKey,reqHeader)
        console.log(result.data);
        setAllClassGet(result.data)
      } 
  }
console.log( studentData);

  useEffect(()=>{
    getAllClass()
  },[])


  const handleUpdate = async()=>{

    const {studentImage,studentName,registrationNumber,selectedClass,id} = studentData

      if(!studentName || !registrationNumber || !selectedClass ){
        Swal.fire({
          title: "Warning",
          text: "Please Fill the Form Completely !!",
          icon: "warning"
        });
      }
      else{
          const reqBody =new FormData()
          previewStudent?reqBody.append("studentImage",studentImage):reqBody.append("studentImage",studentupdate.studentImage)
          reqBody.append("studentName",studentName)
          reqBody.append("registrationNumber",registrationNumber)
          reqBody.append("selectedClass",selectedClass)
         

      const token = sessionStorage.getItem("token")
      if(previewStudent){
          const reqHeader = {
              "Content-Type" : "multipart/form-data",
              "Authorization" : `Bearer ${token}`
          }
          const result = await editStudentAPI(id,reqBody,reqHeader)
          console.log(result);
          if(result.status===200){
            Swal.fire({
              title:"Success" ,
              text:"Student Updated Successfully",
              icon: "success"
            });
              handleClose()
              setEditStudentResponse(result.data)
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
            const result = await editStudentAPI(id,reqBody,reqHeader)
            console.log(result);
            if(result.status === 200){
              Swal.fire({
                title:"Success" ,
                text:"Student Updated Successfully",
                icon: "success"
              });
              handleClose()
              setEditStudentResponse(result.data)
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
   <Modal.Title ><h3 className='d-flex justify-content-center align-items-center'>Student Details</h3></Modal.Title>
   </Modal.Header>
   <Modal.Body>
   <Row className='container'>
   <Col md={6} className='d-flex justify-content-center align-items-center flex-column'>
         <label htmlFor="image" className='text-center'>
                <input id="image" type="file" style={{display:"none"}}  onChange={e=>setStudentData({...studentData,studentImage:e.target.files[0]})}  />
                <img className='rounded' width={'300px'} height={'300px'} src={previewStudent?previewStudent:`${BASE_URL}/uploads/${studentupdate.studentImage}`} alt="no image"  />
            </label>
        </Col>
   <Col md={6} className='d-flex justify-content-center align-items-center flex-column'>
       
   <div className="mb-3 w-100">
     <TextField fullWidth label="Student Name" type='text' variant="outlined" value={studentData.studentName} onChange={e=>setStudentData({...studentData,studentName:e.target.value})} />
   </div>

   <div className="mb-3 w-100">
     <TextField fullWidth label="Registration Number" type='number' variant="outlined" value={studentData.registrationNumber} onChange={e=>setStudentData({...studentData,registrationNumber:e.target.value})}  />
   </div>

   <div className="mb-3 w-100">
   <TextField
                fullWidth
                select
                label="Select Class"
                name="class"
                type='text'
                variant="outlined"
                value={studentData.selectedClass} onChange={e=>setStudentData({...studentData,selectedClass:e.target.value})}
               
        >
          <MenuItem >
            <em>-- Select Class --</em>
          </MenuItem>
               
             {allClassget?.length>0?
             allClassget?.map((item)=>( <MenuItem value={item.className}>{item.className}</MenuItem>))
             :
             <MenuItem className='text-danger'>No Classes Found</MenuItem>
        }
               
              </TextField>
   </div>
   </Col>

   </Row>
   </Modal.Body>
   <Modal.Footer className='d-flex justify-content-center align-items-center'>
   <Button variant="danger" onClick={handleClose1} >Cancel</Button>
   <Button variant="success" onClick={handleUpdate} >Update</Button>
   </Modal.Footer>
   </Modal>
   </div>
  )
}

export default EditStudent