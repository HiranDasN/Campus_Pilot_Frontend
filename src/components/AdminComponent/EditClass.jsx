import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row ,Col } from 'react-bootstrap'
import { TextField,MenuItem} from '@mui/material';
import { allTeachersAPI, editClassAPI } from '../../services/allAPI';
import Swal from 'sweetalert2';
import { editClassResponseContext } from '../../context/ContextShare';
function EditClass({classupdate}) {

  const{editClassResponse,setEditClassResponse} = useContext(editClassResponseContext)
  const [teacherSearchKey,setTeacherSearchKey] = useState("")
  const [allClassTchrget,setAllClassTchrGet] = useState([])
  const [show, setShow] = useState(false);

  const [classAdd, setClassAdd] = useState({
    id:classupdate._id,
    className:classupdate.className,
    tuitionFee:classupdate.tuitionFee,
    classTeacher:classupdate.classTeacher
  });
  console.log(classAdd);
    
  const handleClose1 =()=> {
    setClassAdd({
      id: classupdate._id,
      className:classupdate.className ,
      tuitionFee:classupdate.tuitionFee,
      classTeacher:classupdate.classTeacher
    })
  }


    
    const handleClose = () => { setShow(false);
      handleClose1() }
    const handleShow = () => setShow(true);

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


  const handleUpdate = async()=>{

    const {className,tuitionFee,classTeacher,id} = classAdd

      if(!className || !tuitionFee || !classTeacher ){
        Swal.fire({
          title: "Warning",
          text: "Please Fill the Form Completely !!",
          icon: "warning"
        });
      }
      else{
          const reqBody =new FormData()
          reqBody.append("className",className)
          reqBody.append("tuitionFee",tuitionFee)
          reqBody.append("classTeacher",classTeacher)
         

      const token = sessionStorage.getItem("token")
            const reqHeader = {
              "Content-Type" : "application/json",
              "Authorization" : `Bearer ${token}`
            }
          const result = await editClassAPI(id,reqBody,reqHeader)
          console.log(result);
          if(result.status===200){
            Swal.fire({
              title:"Success" ,
              text:"Class Updated Successfully",
              icon: "success"
            });
              handleClose()
              setEditClassResponse(result.data)
          }
          else{
              console.log(result.response.data);
          }
      }

      }


  useEffect(()=>{
    getAllClassTeachers()
  },[])
  
  return (
    <div>
         <button onClick={handleShow} className='btn btn-success rounded'> <i className="fa-solid fa-pen-to-square"></i></button>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
        >
        <Modal.Header closeButton>
        <Modal.Title ><h3 className='d-flex justify-content-center align-items-center'>Class Details</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
        <Col className='d-flex justify-content-center align-items-center flex-column'>
            
        <div className="mb-3 w-50">
          <TextField fullWidth label="Class Name" type='text' variant="outlined" value={classAdd.className} onChange={e=>setClassAdd({...classAdd,className:e.target.value})} />
        </div>

        <div className="mb-3 w-50">
          <TextField fullWidth label="Monthly Tuition Fees" type='number' variant="outlined" value={classAdd.tuitionFee} onChange={e=>setClassAdd({...classAdd,tuitionFee:e.target.value})} />
        </div>

        <div className="mb-3 w-50">
        <TextField
                fullWidth
                select
                type='text'
                label="Select Class Teacher"
                name="classTeacher"
                variant="outlined"
                value={classAdd.classTeacher} 
                onChange={e=>setClassAdd({...classAdd,classTeacher:e.target.value})}
               
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

export default EditClass