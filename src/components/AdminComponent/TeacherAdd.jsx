import React, { useEffect, useState } from 'react';
import { TextField, FormControl, InputLabel, Input, InputAdornment } from '@mui/material';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { registerTeacherAPI } from '../../services/allAPI';

function TeacherAdd() {
  const [previewTeacher, setPreviewTeacher] = useState("");
  const [token, setToken] = useState("");

  const [teacherAdd, setTeacherAdd] = useState({
    teacherImage: "",
    teacherName: "",
    teacherEmail: "",
    teacherPswd: "",
    mobileNumber: "",
    joiningDate: "",
    monthlySalary: ""
  });

  useEffect(() => {
    if (teacherAdd.teacherImage) {
      setPreviewTeacher(URL.createObjectURL(teacherAdd.teacherImage));
    }
  }, [teacherAdd.teacherImage]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, []);

  const handleClose1 = () => {
    setTeacherAdd({
      teacherImage: "",
      teacherName: "",
      teacherEmail: "",
      teacherPswd: "",
      mobileNumber: "",
      joiningDate: "",
      monthlySalary: ""
    });
    setPreviewTeacher("");
  };

  const handleTchrAdd = async (e) => {
    e.preventDefault();

    const { teacherImage, teacherName, teacherEmail, teacherPswd, mobileNumber, joiningDate, monthlySalary } = teacherAdd;

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(mobileNumber)) {
      Swal.fire({
        title: "Warning",
        text: "Please enter a valid 10-digit phone number.",
        icon: "warning"
      });
      return;
    }

    if (!teacherImage || !teacherName || !teacherEmail || !teacherPswd || !mobileNumber || !joiningDate || !monthlySalary) {
      Swal.fire({
        title: "Warning",
        text: "Please Fill the Form Completely !!",
        icon: "warning"
      });
    } else {
      const reqBody = new FormData();
      reqBody.append("teacherImage", teacherImage);
      reqBody.append("teacherName", teacherName);
      reqBody.append("teacherEmail", teacherEmail);
      reqBody.append("teacherPswd", teacherPswd);
      reqBody.append("mobileNumber", mobileNumber);
      reqBody.append("joiningDate", joiningDate);
      reqBody.append("monthlySalary", monthlySalary);

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        };

        const result = await registerTeacherAPI(reqBody, reqHeader);
        console.log(result);

        if (result.status === 200) {
          console.log(result.data);
          Swal.fire({
            title: "Success",
            text: "Teacher Added Successfully",
            icon: "success"
          });

          handleClose1();
        } else {
          console.log(result.response.data);
        }
      }
    }
  };

  return (
    <div className='mt-5 cardshd p-4 rounded mb-5'>
      <h3 className="mb-4">Add Teacher</h3>
      <form>
        <InputLabel className='mb-1' htmlFor="teacherImage">Teacher Image</InputLabel>
        <input
          type="file"
          name="teacherImage"
          onChange={(e) => setTeacherAdd({ ...teacherAdd, teacherImage: e.target.files[0] })}
          accept="image/*"
          className="mb-3"
        />

        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          type='text'
          name="teacherName"
          value={teacherAdd.teacherName}
          onChange={(e) => setTeacherAdd({ ...teacherAdd, teacherName: e.target.value })}
          className="mb-3"
        />

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          name="teacherEmail"
          value={teacherAdd.teacherEmail}
          onChange={(e) => setTeacherAdd({ ...teacherAdd, teacherEmail: e.target.value })}
          className="mb-3"
        />

        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          name="teacherPswd"
          value={teacherAdd.teacherPswd}
          onChange={(e) => setTeacherAdd({ ...teacherAdd, teacherPswd: e.target.value })}
          className="mb-3"
        />

        <TextField
          label="Mobile Number"
          variant="outlined"
          fullWidth
          type="number"
          name="mobileNumber"
          value={teacherAdd.mobileNumber}
          onChange={(e) => setTeacherAdd({ ...teacherAdd, mobileNumber: e.target.value })}
          className="mb-3"
        />

        <FormControl fullWidth className='mb-3 mt-3'>
          <InputLabel htmlFor="joindate">Joining Date</InputLabel>
          <Input
            id="joindate"
            type="date"
            name="joiningDate"
            value={teacherAdd.joiningDate}
            onChange={(e) => setTeacherAdd({ ...teacherAdd, joiningDate: e.target.value })}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
          />
        </FormControl>

        <FormControl fullWidth className='mb-3 mt-3'>
          <InputLabel htmlFor="monthlySalary">Monthly Salary</InputLabel>
          <Input
            id="monthlySalary"
            name="monthlySalary"
            type="number"
            value={teacherAdd.monthlySalary}
            onChange={(e) => setTeacherAdd({ ...teacherAdd, monthlySalary: e.target.value })}
            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
          />
        </FormControl>
      </form>

      <div className='d-flex justify-content-center'>
        <Button onClick={handleTchrAdd} className='mt-4' variant="info">Add Teacher</Button>
      </div>
    </div>
  );
}

export default TeacherAdd;
