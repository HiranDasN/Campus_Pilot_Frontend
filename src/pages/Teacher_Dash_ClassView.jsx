import React, { useEffect, useState } from 'react';
import { allClassesAPI, allStudentsAPI } from '../services/allAPI';
import { Button, Col, FormControl, InputGroup, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

function Teacher_Dash_ClassView() {
    const [allClsget, setAllClsGet] = useState([]);
    const [classSearchKey, setClassSearchKey] = useState("");
    const [allStudentget, setAllStudentGet] = useState([]);
    const { classname } = useParams();

    const getAllClass = async () => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token");

            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };

            const result = await allClassesAPI(classSearchKey, reqHeader);
            const filteredClass = result.data.filter(classes => classes.className.toLowerCase() === classname.toLowerCase());
            setAllClsGet(filteredClass);
        }
    };

    useEffect(() => {
        getAllClass();
    }, [classSearchKey, classname]);

    const getAllStudents = async () => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token");
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };

            const result = await allStudentsAPI('', reqHeader);
            setAllStudentGet(result.data);
        }
    };

    useEffect(() => {
        getAllStudents();
    }, []);

    return (
        <div className="container my-5" style={{ minHeight: '40vh' }}>
            <h1 className='text-center mb-4'>Your Classes</h1>
            <Row className="justify-content-center mb-3">
                <Col md={6}>
                    <InputGroup className="mb-3 shadow">
                        <FormControl
                            placeholder="Find Classes"
                            aria-label="Find Classes"
                            aria-describedby="basic-addon2"
                            value={classSearchKey}
                            onChange={e => setClassSearchKey(e.target.value)}
                        />
                        <Button variant="outline-secondary" id="button-addon2" className='ms-2'>
                            <i className="fa-solid fa-search"></i>
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
            <Row xs={1} md={2} lg={3} className='g-4 d-flex align-items-center justify-content-center'>
                {allClsget?.length > 0 ?
                    allClsget?.map((item) => {
                        const classStudents = allStudentget.filter(student => student.selectedClass.toLowerCase() === item.className.toLowerCase());
                        const studentCount = classStudents.length;

                        return (
                            <Col key={item._id}>
                                <div className="container mt-3 w-100">
                                    <div className="card w-100 rounded cardhvr" style={{ backgroundColor: 'steelblue' }}>
                                        <div className="card-body">
                                            <h3 className="card-title text-center text-light">{item.className}</h3>
                                            <div className="d-flex justify-content-between align-items-center container mt-4">
                                                <h3 className="card-text text-center pt-3 text-light" style={{ fontSize: '34px' }}>{studentCount}</h3>
                                                <i className="fa-solid fa-user-graduate fa-2x text-light"></i>
                                            </div>
                                            <h4 className='text-light ms-2' style={{ float: 'left' }}>Student</h4>
                                        
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        );
                    }) :
                    <p className=' fs-4 text-danger text-center'>No Classes Exist... Please Add</p>
                }
            </Row>
        </div>
    )
}

export default Teacher_Dash_ClassView;
