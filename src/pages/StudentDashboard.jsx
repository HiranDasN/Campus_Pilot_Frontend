import React from 'react';

function StudentDashboard() {
  return (
    <div className="container mt-5">
      <h2>Welcome to Student Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Courses</h5>
              <p className="card-text">Explore and enroll in your courses here.</p>
              <a href="/courses" className="btn btn-primary">Explore Courses</a>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Assignments</h5>
              <p className="card-text">View and submit assignments for your courses.</p>
              <a href="/assignments" className="btn btn-primary">View Assignments</a>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Grades</h5>
              <p className="card-text">Check your grades and performance in courses.</p>
              <a href="/grades" className="btn btn-primary">View Grades</a>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Profile</h5>
              <p className="card-text">View and update your profile information.</p>
              <a href="/profile" className="btn btn-primary">View Profile</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
