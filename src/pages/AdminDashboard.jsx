import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { allClassesAPI, allStudentsAPI, allTeachersAPI } from '../services/allAPI';
import { BASE_URL } from '../services/baseurl';
import CountUp from 'react-countup';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d'; 
import './AdminDashboard.css';

Highcharts3D(Highcharts);

function AdminDashboard () {
  const [studentSearchKey, setStudentSearchKey] = useState("");
  const [teacherSearchKey, setTeacherSearchKey] = useState("");
  const [classSearchKey, setClassSearchKey] = useState("");

  const [totalClasses, setTotalClasses] = useState({});
  const [totalTeachers, setTotalTeachers] = useState({});
  const [totalStudents, setTotalStudents] = useState({});
  const [newAdmission, setNewAdmission] = useState({});
  const [date, setDate] = useState(new Date());
  const [barChartConfig, setBarChartConfig] = useState({});
  const [pieChartConfig, setPieChartConfig] = useState({});
  const [selectedEvents, setSelectedEvents] = useState([]);
  
  
  const [totalTeacherSalaryExpense, setTotalTeacherSalaryExpense] = useState(0);
  const [totalStudentTuitionFee, setTotalStudentTuitionFee] = useState(0);
  const [totalClasses1, setTotalClasses1] = useState([]);
  const [totalTeachers1, setTotalTeachers1] = useState([]);
  const [totalStudents1, setTotalStudents1] = useState([]);

  const getAllStudents = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      const result = await allStudentsAPI(studentSearchKey, reqHeader);
      setTotalStudents(result.data);
      setTotalStudents1(result.data);
      setNewAdmission(result.data[result.data.length - 1]);
    }
  };

  const getAllTeachers = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      const result = await allTeachersAPI(teacherSearchKey, reqHeader);
      setTotalTeachers(result.data);
      setTotalTeachers1(result.data);
    }
  };

  const getAllClass = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      const result = await allClassesAPI(classSearchKey, reqHeader);
      setTotalClasses(result.data);
      setTotalClasses1(result.data)
    }
  };

  useEffect(() => {
    getAllStudents();
    getAllTeachers();
    getAllClass();
  }, []);

  useEffect(() => {
    setBarChartConfig({
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Total Counts',
      },
      xAxis: {
        categories: ['Total Students', 'Total Teachers', 'Total Classes'],
      },
      yAxis: {
        title: {
          text: 'Count',
        },
      },
      series: [
        {
          name: 'Count',
          data: [
            totalStudents?.length || 0,
            totalTeachers?.length || 0,
            totalClasses?.length || 0,
          ],
        },
      ],
    });
    

    setPieChartConfig({
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Total Counts',
      },
      series: [
        {
          name: 'Count',
          data: [
            { name: 'Total Students', y: totalStudents?.length || 0 },
            { name: 'Total Teachers', y: totalTeachers?.length || 0 },
            { name: 'Total Classes', y: totalClasses?.length || 0 },
          ],
        },
      ],
    });
    

    
  
  }, [totalStudents.length, totalTeachers.length, totalClasses.length]);


  const fetchEventsForDate = (selectedDate) => {
    const events = [
      { date: '2024-01-20', time: '10:00 AM', title: 'Staff Meeting' },
      { date: '2024-01-20', time: '2:00 PM', title: 'Parent-Teacher Meeting' },
      { date: '2024-01-20', time: '4:00 PM', title: 'School Assembly' },
    ];

    const filteredEvents = events.filter(
      (event) => new Date(event.date).toDateString() === selectedDate.toDateString()
    );

    setSelectedEvents(filteredEvents);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    fetchEventsForDate(newDate);
  };

  
  const calculateTotalTeacherSalaryExpense = () => {
    let totalSalary = 0;
    totalTeachers1.forEach((teacher) => {
      totalSalary += teacher.monthlySalary;
    });
    setTotalTeacherSalaryExpense(totalSalary);
  };

  const calculateTotalStudentTuitionFee = () => {
    let totalTuitionFee = 0;
    totalClasses1.forEach((classData) => {
      const classStudents = totalStudents1.filter((student) => student.selectedClass === classData.className);
      totalTuitionFee += classStudents.length * classData.tuitionFee;
    });
    setTotalStudentTuitionFee(totalTuitionFee);
  };

  useEffect(() => {
    calculateTotalTeacherSalaryExpense();
    calculateTotalStudentTuitionFee();
  }, [totalTeachers1, totalStudents1, totalClasses1]);

  const get3DColumnChartOptions = () => {
    return {
      chart: {
        type: 'column',
        options3d: {
          enabled: true,
          alpha: 10,
          beta: 25,
          depth: 70,
          viewDistance: 25,
        },
      },
      title: {
        text: 'Monthly Financial Overview',
      },
      xAxis: {
        categories: ['Total Teacher Salary Expense', 'Total Student Tuition Fee'],
      },
      yAxis: {
        title: {
          text: 'Amount',
        },
      },
      series: [
        {
          name: 'Monthly Expense',
          data: [
            totalTeacherSalaryExpense || 0,
            totalStudentTuitionFee || 0,
          ],
        },
      ],
    };
  };
  
  




  return (
    <div style={{background: '#f4f4f4'}}>
      <br />
      <br />
      <br />
      <h1 className='text-center mb-3'>Welcome to Admin Dashboard</h1>
      <div style={{ minHeight: 'calc(100vh - 56px)', padding: '20px'}}>
        <Container fluid>
          <Row xs={1} md={2} lg={3} className="g-4">
            <Col>
             <a href='/admin/allstudents' style={{textDecoration:'none'}}>
                <Card className='btn  text-center text-light rounded cardhvr' style={{ backgroundColor: 'steelblue' }}>
                  <Card.Body>
                    <h4 className='p-3'>Total Students</h4>
                    <h3>
                      <CountUp start={0} end={totalStudents.length} duration={5} separator="," />
                    </h3>
                  </Card.Body>
                </Card>
             </a>
            </Col>
            <Col>
              <a href='/admin/allteachers' style={{textDecoration:'none'}}>
                <Card className='btn  text-center text-light rounded cardhvr' style={{ backgroundColor: 'indianred' }}>
                  <Card.Body>
                    <h4 className='p-3'>Total Teachers</h4>
                    <h3>
                      <CountUp start={0} end={totalTeachers.length} duration={5} separator="," />
                    </h3>
                  </Card.Body>
                </Card>
              </a>
            </Col>
            <Col>
              <a href='/admin/allclasses' style={{textDecoration:'none'}}>
                <Card className='btn  text-center text-light rounded cardhvr' style={{ backgroundColor: 'darkmagenta' }}>
                  <Card.Body>
                    <h4 className='p-3'>Total Classes</h4>
                    <h3>
                      <CountUp start={0} end={totalClasses.length} duration={5} separator="," />
                    </h3>
                  </Card.Body>
                </Card>
              </a>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <Card className="cardshd rounded">
                <Card.Body>
                  <h4>School Overview</h4>
                  <HighchartsReact highcharts={Highcharts} options={barChartConfig} />
                </Card.Body>
              </Card>
            </Col>
          </Row>

          


      <Row className="mt-5">
       <Col md={4} xs={12} lg={4}>
        <Card className='cardshd rounded align-items-center d-flex justify-content-center '>
          <Card.Body >
            <h5 className='text-center'>Calendar</h5>
            <Calendar className='rounded' onChange={handleDateChange} value={date} />

          </Card.Body>
        </Card>
        </Col>

      <Col md={4} xs={12} lg={4} className=''>
        <Card className='cardshd rounded align-items-center d-flex justify-content-center'>
          <Card.Body>
            <h5>Events for {date.toDateString()}</h5>
            <ul>
              {selectedEvents.length > 0 ? (
                selectedEvents.map((event, index) => (
                  <li key={index}>
                    <strong>{event.time}</strong> - {event.title}
                  </li>
                ))
              ) : (
                <p className='text-danger'>No events for selected date</p>
              )}
            </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} xs={12} lg={4}>
  <Card className="h-100 cardshd rounded">
    <Card.Body>
      <h4 className="mb-4 text-center">New Admission</h4>
      {newAdmission && Object.keys(newAdmission).length > 0 ? (
        <>
          <div className="text-center">
            <img src={`${BASE_URL}/uploads/${newAdmission.studentImage}`} alt="Student Profile" className="rounded-circle mb-3" width="200" height="200" />
          </div>
          <h5 className='text-center mb-3 mt-2'>Registration ID: {newAdmission.registrationNumber}</h5>
          <h5 className='text-center mb-3'>Student Name: {newAdmission.studentName}</h5>
          <h5 className='text-center'>Class: {newAdmission.selectedClass}</h5>
        </>
      ) : (
        <h5 className='text-center text-danger '>No new admissions yet.</h5>
      )}
    </Card.Body>
  </Card>
</Col>

      </Row>


      <Row className="mt-5" md={2} lg={2} xl={2}>
            <Col>
              <Card className="cardshd rounded">
                <Card.Body>
                  <h4>School Overview</h4>
                  <HighchartsReact highcharts={Highcharts} options={pieChartConfig} />
                </Card.Body>
              </Card>
            </Col>
                
            <Col>
              <Card className="cardshd rounded">
                <Card.Body>
                  <h4>Financial Overview</h4>
                  <HighchartsReact highcharts={Highcharts} options={get3DColumnChartOptions()} />
                </Card.Body>
              </Card>
            </Col>

        
      </Row>


        </Container>
      </div>
    </div>


  );
};

export default AdminDashboard;
