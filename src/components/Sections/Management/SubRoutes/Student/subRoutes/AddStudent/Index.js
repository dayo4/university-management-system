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

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [hostel, setHostel] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [faculty, setFaculty] = useState("");
  const [level, setLevel] = useState("");
  const [password, setPassword] = useState("");
  const [apptoken, setpptoken] = useState(process.env.REACT_APP_UMS_TOKEN);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [loading, setLoading] = useState(false);
  const [levelList, setlevelList] = useState([]);
  const [listFaculty, setListFaculty] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);
  const [phase1, setPhase1] = useState(true);
  const [phase2, setPhase2] = useState(false);

  // PRE LOADER LOADING STYLE
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  // MY USE EFFECTS
  useEffect(() => {
    getLevel();
    getFaculty();
    // getDepartment();
  }, []);

  // GETTING LIST OF LEVELS
  const getLevel = async () => {
    const levelData = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
    };

    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/v1/listLevels`, levelData)
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
  const getFaculty = async () => {
    const facultyData = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
    };

    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/v1/listFaculties`, facultyData)
      .then((res) => {
        if (res.data.success == false) {
          setListFaculty([]);
        } else {
          setListFaculty(res.data);
        }
      })

      .catch((err) => {
        // console.log(err);
      });
  };

  // END

  // GETTING LIST OF DEPARTMEMT
  const getDepartment = async (e) => {
    setFaculty(e);

    const levelData = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
      facultyid: e,
    };

    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/v1/listDepts`, levelData)
      .then((res) => {
        if (res.success == false) {
          setListDepartment([]);
          console.log(listDepartment);
        } else {
          setListDepartment(res.data.data);
        }
      })

      .catch((err) => {
        // console.log(err);
      });
  };

  // END

  // ADDING NEW STUDENT
  const addingNewStudent = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
      fname: name,
      lname: name,
      levelid: level,
      mname: name,
      phone: phoneNumber,
      facultyid: faculty,
      deptid: department,
      mail: email,
      pword: password,
    };

    await axios

      .post(` ${process.env.REACT_APP_UMS_BASE}/v1/newStudent`, data)

      .then((res) => {
        if (res.data.success === true) {
          message.success(res.data.message);
          setLoading(false);
          navigate(`/management
         /student`);
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

  const setidfac = (id, faculty) => {
    setLevel(id, faculty)
    console.log(level);
  }


  // END
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    // send()

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);
  };


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
          <h6 className='SubHead'>Full Name</h6>
          <Input type='text' onChange={(e) => setName(e.target.value)} placeholder="Surname - Middle Name - FirstName" />
        </Col>
        <Col xs={20} sm={16} md={10} style={{ marginTop: '10px' }}>
          <h6 className='SubHead'>Phone Number</h6>
          <Input type='number' onChange={(e) => setPhoneNumber(e.target.value)} placeholder="09001234567" />
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
            onChange={(e) => setFaculty(e.target.value)}
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={[
              {
                value: '1',
                label: 'Management Science',
              },
              {
                value: '2',
                label: 'Law',
              },
              {
                value: '3',
                label: 'Engineering',
              },
            ]}
          />
        </Col>
        <Col xs={20} sm={16} md={10} style={{ marginTop: '10px' }}>
          <h6 className='SubHead'>Department</h6>
          <Select
            showSearch
            style={{
              width: '100%'
            }}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Select Department"
            options={[
              {
                value: '3',
                label: 'Accounting',
              },
              {
                value: '4',
                label: 'Business Admin',
              },
              {
                value: '4',
                label: 'Banking And Finance',
              }
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
            onChange={(e) => setHostel(e.target.value)}
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
            onChange={(e) => setLevel(e.target.value)}
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
          <Input onChange={(e) => setEmail(e.target.value)} type='email' placeholder="example@wetmail.com" />
        </Col>
        <Col xs={20} sm={16} md={10} style={{ marginTop: '10px' }}>
          <h6 className='SubHead'>Password</h6>
          <Input.Password
            onChange={(e) => setPassword(e.target.value)}
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
          loading={loadings[1]}
          onClick={() => enterLoading(1)}
        >Submit</Button>
      </Row>

    </div>
  );
};

export default AddStudent;
