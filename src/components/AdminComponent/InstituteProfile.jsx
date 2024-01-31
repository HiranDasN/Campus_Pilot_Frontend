import React, { useContext, useEffect, useState } from 'react'
import Collapse from 'react-bootstrap/Collapse';
import { BASE_URL } from '../../services/baseurl';
import { editInstituteResponseContext } from '../../context/ContextShare';

function InstituteProfile() {

  const [open, setOpen] = useState(true);
  const {editInstituteResponse,setEditInstituteResponse} = useContext(editInstituteResponseContext)
  const [allAdminInstitute,setAllAdminInstitute] = useState({})

  useEffect(()=>{
    setAllAdminInstitute(JSON.parse(sessionStorage.getItem("existingAdmin")))
    
  },[allAdminInstitute,editInstituteResponse])


  return (
    <>
    
    <div className='card cardshd rounded p-5'>
      <div className="d-flex justify-content-between ">
        <h2>Institute Profile</h2>
        <button onClick={() => setOpen(!open)} style={{marginTop:'-8px'}} className="btn btn-outline-info">
        <i class="fa-solid fa-angles-down"></i>
        </button>
      </div>
      <Collapse in={open}>
        <div className="row justify-content-center mt-3" style={{marginBottom:'-40px'}}>
         
          <div className="mx-auto mt-2" style={{ width: '300px', height: '200px' }}>
        <img
          src={`${BASE_URL}/uploads/${allAdminInstitute.schoolImage}`}
          className="d-block mx-auto rounded"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          alt="Institute Logo"
        />
      </div>
         
          <div className="mt-4 mb-1  text-center">
            <h6 className='form-control-static'>Institute Name: {allAdminInstitute.instituteName}</h6>
          </div>
          <div className="mt-3 mb-1  text-center">
            <h6 className='form-control-static'>Phone Number: {allAdminInstitute.phoneNumber} </h6>
          </div>
          <div className="mt-3 mb-1 text-center">
            <h6 className='form-control-static'>Email Address: {allAdminInstitute.schoolEmail}</h6>
          </div>
          <div className="mt-3 mb-2 text-center">
            <h6 className='form-control-static'>Location: {allAdminInstitute.location}</h6>
          </div>
        </div>
      </Collapse>
    </div>
    </>
  )
}

export default InstituteProfile