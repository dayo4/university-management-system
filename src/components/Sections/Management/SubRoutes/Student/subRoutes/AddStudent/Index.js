import { useState, useEffect } from "react";
import "./Index.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { message, Button, Select, Row, Col, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

import {
  mdiArrowLeft,
  mdiCheckAll,
} from '@mdi/js';
import Icon from "@mdi/react";

const AddStudent = () => {
  let navigate = useNavigate();

  const [allData, setAllData] = useState({
    fname: '',
    mname: '',
    lname: '',
    levelid: '',
    admission_type: '',
    matricno: '',
    phone: '',
    facultyid: '',
    hostel:'',
    deptid: '',
    mail: '',
    pword: '',
  });

  const [apptoken, setpptoken] = useState(process.env.REACT_APP_UMS_TOKEN);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [loading, setLoading] = useState(false);
  const [levelList, setlevelList] = useState([]);
  const [listFaculty, setListFaculties] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);
  const [disableDeptInput, setDisableDeptInput] = useState(true);


  // PRE LOADER LOADING STYLE
  // const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  // MY USE EFFECTS
  useEffect(() => {
    getLevels();
    getFaculties();

    const storedData = JSON.parse(localStorage.getItem("studentTemp1"))
    if(storedData)
      setAllData({...storedData})
  }, []);

  // GETTING LIST OF LEVELS
  const getLevels = async () => {
    const levelData = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
    };

    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/general/listLevels`, levelData)
      .then((res) => {
        if (res.data.success == false) {
          setlevelList([]);
        } else {
          setlevelList(res.data);
        }
      })

      .catch((err) => {
        console.log(err);
      });
  };

  // END

  // GETTING LIST OF FACULTIES
  const getFaculties = async () => {
    const facultyData = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
    };

    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/general/listFaculties`, facultyData)
      .then((res) => {
        if (res.data.success == false) {
          setListFaculties([]);
        } else {
          setListFaculties(res.data.data);
        }
      })

      .catch((err) => {
        // console.log(err);
      });
  };

  // END

  // GETTING LIST OF DEPARTMEMT
  const getDepartments = async (facultyid) => {

    const deptData = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
      facultyid: facultyid,
    };

    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/general/listDepts`, deptData)
      .then((res) => {
        if (res.success === false) {
          setListDepartment([]);
          setDisableDeptInput(true)
        } else {
          setListDepartment(res.data.data);
          setDisableDeptInput(false)
        }
      })

      .catch((err) => {
        // console.log(err);
      });
  };

  // END

  // ADDING NEW STUDENT
  const addNewStudent = async () => {

    setLoading(true);

    const data = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
      ...allData
      // features: {
      //   Dashboard: accessDash,
      //   Finance: accessFniance,
      //   Memo: accessMemo,
      // },
    };

    localStorage.setItem("studentTemp1", JSON.stringify(allData))

    await axios

      .post(` ${process.env.REACT_APP_UMS_BASE}/management/addStudent`, data)

      .then((res) => {
        console.log(res)
        if (res.data.success === true) {
          message.success(res.data.message);
          setLoading(false);
          navigate(`/management/student/overview`);
        } else {
          setLoading(false);
          message.info(`${res.data.message} Please check form again..`);
        }
      })
      .catch((err) => {
        setLoading(false);
        message.warning(err.message);
      });
  };

  /* Steps Data */
  const [currentStep, setCurrentStep] = useState(0);
  const nextStep = () => {
    setCurrentStep(1);

  };
  const prevStep = () => {
    setCurrentStep(0);
  };

  function onFacultyChange(value) {
    console.log(value)
    setStudentData({ facultyid: value })
    getDepartments(value)
  }

  function onDeptChange(value) {
    setStudentData({ deptid: value })
  }
  function onAdmissionChange(value) {
    setStudentData({ admission_type: value })
  }
  function onHostelChange(value) {
    setStudentData({ hostel: value })
  }
  function onLevelChange(value) {
    setStudentData({ levelid: value })
  }

  function setStudentData(data/* object containing data to spread */) {
    setAllData({
      ...allData,
      ...data
    })
  }

  return (
    <div className="AddStudent">
      <Row justify={'start'} align={'middle'} className="Heading">
        <Icon 
        className="BackIcon" 
        path={mdiArrowLeft} 
        style={{ marginRight: '30px' }} 
        size={1} 
        onClick={() => navigate("/management/student/overview")}/>
        <h5 style={{ marginBottom: '0px' }}>Add New Student</h5>
      </Row>

      <Row justify={{ xs: 'center', md: 'space-around' }}>
            <Col xs={20} sm={16} md={10} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>First Name</h6>
              <Input value={allData.fname} type='text' onChange={(e) => setStudentData({ fname: e.target.value })} placeholder="First Name" />
            </Col>
            <Col xs={20} sm={16} md={10} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Middle Name</h6>
              <Input value={allData.mname} type='text' onChange={(e) => setStudentData({ mname: e.target.value })} placeholder="Middle Name" />
            </Col>
            <Col xs={20} sm={16} md={10} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Last Name</h6>
              <Input value={allData.lname} type='text' onChange={(e) => setStudentData({ lname: e.target.value })} placeholder="Last Name" />
            </Col>
            <Col xs={20} sm={16} md={10} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Matric Number</h6>
              <Input value={allData.matricno} type='number' onChange={(e) => setStudentData({ matricno: e.target.value })} placeholder="Matric Number" />
            </Col>
            <Col xs={20} sm={16} md={10} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Phone Number</h6>
              <Input value={allData.phone} type='number' onChange={(e) => setStudentData({ phone: e.target.value })} placeholder="09001234567" />
            </Col>
            <Col xs={20} sm={16} md={10} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Faculty</h6>
              <Select
                showSearch
                style={{
                  width: '100%'
                }}
                placeholder="Select A Faculty"
                optionFilterProp="children"
                onChange={onFacultyChange}
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={listFaculty.map((fac) => {
                  return {
                    value: fac.id,
                    label: fac.faculty,
                  }
                })}
              />
            </Col>
            <Col xs={20} sm={16} md={10} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Department</h6>
              <Select
                disabled={disableDeptInput}
                showSearch
                style={{
                  width: '100%'
                }}
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                onChange={onDeptChange}
                placeholder={disableDeptInput ? "You Must Select A Faculty" : "Select A Department"}
                options={listDepartment ? listDepartment.map((dept) => {
                  return {
                    value: dept.id,
                    label: dept.dept,
                  }
                }) : []}
              />
            </Col>
        <Col xs={20} sm={16} md={10} style={{ marginTop: '10px' }}>
          <h6 className='SubHead'>Select Admission Type</h6>
          <Select
            showSearch
            style={{
              width: '100%'
            }}
            onChange={onAdmissionChange}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            placeholder="Undergraduate"
            options={[
              {
                value: 'Undergraduate',
                label: 'Undergraduate',
              },
              {
                value: 'Postgraduate',
                label: 'Postgraduate',
              },
            ]}
          />
        </Col>
        <Col xs={20} sm={16} md={10} style={{ marginTop: '10px' }}>
          <h6 className='SubHead'>Select Hostel</h6>
          <Select
            showSearch
            style={{
              width: '100%'
            }}
            onChange={onHostelChange}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            placeholder="Select A Hostel"
            options={[
              {
                value: '3',
                label: 'Geto',
              },
              {
                value: '4',
                label: 'CJS',
              },
            ]}
          />
        </Col>
        <Col xs={20} sm={16} md={10} style={{ marginTop: '10px' }}>
          <h6 className='SubHead'>Level</h6>
          <Select
            style={{
              width: '100%'
            }}
            onChange={onLevelChange}
            placeholder="Select Staff Level"
            options={[
              {
                value: '3',
                label: '100',
              },
              {
                value: '4',
                label: '200',
              }
            ]}
          />
        </Col>
        <Col xs={20} sm={16} md={10} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Email</h6>
              <Input value={allData.mail} onChange={(e) => setStudentData({ mail: e.target.value })} type='email' placeholder="example@wetmail.com" />
            </Col>
            <Col xs={20} sm={16} md={10} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Password</h6>
              <Input.Password
              value={allData.pword}
                onChange={(e) => setStudentData({ pword: e.target.value })}
                required
              />
            </Col>
      </Row>

      <Row justify="space-between" className='Actions'>
        <span></span>
        <Button
          type="primary"
          icon={<Icon path={mdiCheckAll}
            size={1}
          />}
          loading={loading}
          onClick={() => addNewStudent()}
          >Submit</Button>
      </Row>

    </div>
  );
};

export default AddStudent;
