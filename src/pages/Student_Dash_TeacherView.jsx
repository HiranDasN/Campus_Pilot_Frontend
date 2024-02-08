import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';
import { allClassesAPI, allTeachersAPI } from '../services/allAPI';
import { useParams } from 'react-router-dom';

function Student_Dash_TeacherView() {

  const { classname } = useParams();

  const [allClsget, setAllClsGet] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState({});

  const getAllClass = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      const result = await allClassesAPI('', reqHeader);
      const filteredClass = result.data.filter(classes => classes.className.toLowerCase() === classname.toLowerCase());
      setAllClsGet(filteredClass);
    }
  };

  useEffect(() => {
    getAllClass();
  }, [classname]);


  const getAllTeachers = async () => {
    if (allClsget.length > 0) {
      if (sessionStorage.getItem("token")) {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }

        const result = await allTeachersAPI('', reqHeader)
        const filteredTeacher = result.data.filter(teacher => teacher.teacherName.toLowerCase() === allClsget[0]?.classTeacher.toLowerCase());
        setTeacherInfo(filteredTeacher[0] || {});
      }
    }
  }

  useEffect(() => {
    getAllTeachers()
  }, [allClsget]);


  return (
    <div style={{ background: '#f4f4f4' }}>
      <br />
      <br />

      <div className="container">
        <h2 className='mb-5 text-center'>Class Teacher</h2>

        <div className='container mt-5 mb-5'>
          <div className='row'>
            <div className='col-lg-4'></div>

            <div className='col-lg-4'>
              <Card className="h-100 cardshd rounded">
                <Card.Body>

                  <div>
                    <div className="text-center">
                      <img src={`${BASE_URL}/uploads/${teacherInfo?.teacherImage}`} alt="Teacher Profile" className="rounded-circle mb-3" width="200" height="200" />
                    </div>
                    <h4 className='text-center mb-3 text-danger'>{teacherInfo?.teacherName} </h4>
                    <h5 className='text-center mb-4 mt-2'>Email Id: {teacherInfo?.teacherEmail}</h5>
                    <h5 className='text-center mb-4 mt-2'>Joining Date: {teacherInfo?.joiningDate}</h5>
                    <h5 className='text-center mb-4 mt-2'>Phone: +91 {teacherInfo?.mobileNumber}</h5>
                  </div>

                </Card.Body>
              </Card>
            </div>

            <div className='col-lg-4'></div>
          </div>
        </div>

        <br />

      </div>
    </div>
  );
}

export default Student_Dash_TeacherView;
