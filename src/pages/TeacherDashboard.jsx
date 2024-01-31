import React from 'react';
import { Card } from 'react-bootstrap';

function TeacherDashboard() {
  return (
    <div className="container mt-5">
      <h2>Welcome to Teacher Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Class Information</h5>
              <p className="card-text">You can view information about the classes you are teaching here.</p>
              <a href="/class-information" className="btn btn-primary">View Classes</a>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Students</h5>
              <p className="card-text">Check and manage information about your students.</p>
              <a href="/students" className="btn btn-primary">View Students</a>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Attendance</h5>
              <p className="card-text">Take and manage attendance for your classes.</p>
              <a href="/attendance" className="btn btn-primary">Manage Attendance</a>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Assignments</h5>
              <p className="card-text">View and grade assignments submitted by your students.</p>
              <a href="/assignments" className="btn btn-primary">View Assignments</a>
            </div>
          </div>
        </div>
      </div>

      <Card className="h-100 shadow rounded">
    <Card.Body>
      <h4 className="mb-4 text-center">Teacher Details</h4>
      
        <>
          <div className="text-center">
            <img src="" alt="Student Profile" className="rounded-circle mb-3" width="200" height="200" />
          </div>
          <h5 className='text-center mb-3 mt-2'>Registration ID:</h5>
          <h5 className='text-center mb-3'>Student Name: </h5>
          <h5 className='text-center'>Class: </h5>
        </>

    </Card.Body>
  </Card>
    </div>
  );
}

export default TeacherDashboard;
