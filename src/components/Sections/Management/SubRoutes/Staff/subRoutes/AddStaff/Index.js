import { useState, useEffect } from "react";
import "./Index.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message, Button, Spin, Steps, Select, Row, Col, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import {
  mdiArrowLeft,
  mdiArrowRight,
  mdiCheckAll,
} from '@mdi/js';

import Icon from "@mdi/react";
const Newstaff = () => {
  const [allData, setAllData] = useState({
    fname: '',
    mname: '',
    lname: '',
    level: '',
    phone: '',
    facultyid: '',
    jobPos:'',
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
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const navigate = useNavigate();

  // MY USE EFFECTS
  useEffect(() => {
    // getLevels();
    getFaculties();

    const storedData = JSON.parse(localStorage.getItem("staffTemp1"))
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
          setlevelList(res.data.data);
        }
      })

      .catch((err) => {
        console.log(err);
      });
  };

  // GETTING LIST OF FACULTIES
  const getFaculties = async () => {
    const facultyData = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
    };

    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/general/listFaculties`, facultyData)
      .then((res) => {
        if (res.data.success === false) {
          setListFaculties([]);
        } else {
          setListFaculties(res.data.data);
          console.log(res.data);
        }
      })

      .catch((err) => {
        // console.log(err);
      });
  };

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
        console.log(res);
        if (res.success === false) {
          setListDepartment([]);
          setDisableDeptInput(true)
        } else {
          setListDepartment(res.data.data);
          // if (listDepartment && listDepartment.length > 0) {
          setDisableDeptInput(false)
          // }
        }
      })

      .catch((err) => {
        // console.log(err);
      });
  };

  // const [accessDash, setAccessDash] = useState("0");
  // const [accessMemo, setAccessMemo] = useState("0");
  // const [accessFniance, setAccessFniance] = useState("0");

  // ADDING NEW STAFF
  const addNewStaff = async () => {

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

    localStorage.setItem("staffTemp1", JSON.stringify(allData))

    await axios

      .post(` ${process.env.REACT_APP_UMS_BASE}/management/addStaff`, data)

      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          message.success(res.data.message);
          setLoading(false);
          navigate(`/management/staff/overview`);
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
    setStaffData({ facultyid: value })
    getDepartments(value)
  }

  function onDeptChange(value) {
    setStaffData({ deptid: value })
  }
  function onPosChange(value) {
    setStaffData({ jobPos: value })
  }
  function onLevelChange(value) {
    setStaffData({ level: value })
  }

  function setStaffData(data/* object containing data to spread */) {
    setAllData({
      ...allData,
      ...data
    })
  }

  return (
    <div className="AddStaff">
      <Row justify={'start'} align={'middle'} className="Heading">
        <Icon
          className="BackIcon"
          path={mdiArrowLeft}
          size={1}
          onClick={() => navigate("/management/staff/overview")}
        />
        <h5 style={{ marginBottom: '0px' }}>Add New Staff</h5>
      </Row>
      <Row justify={'center'}>
        <Col xs={24} sm={22} md={20}>
          <Steps current={currentStep} items={[
            {
              title: 'Add Basic Details',
            },
            {
              title: 'Grant Privileges',
            },
          ]} style={{ margin: '30px 0px' }} />
        </Col>
      </Row>

      {
        currentStep === 0
          ?
          <Row justify={{ xs: 'center', md: 'space-around' }}>
            <Col xs={20} sm={16} md={10} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>First Name</h6>
              <Input value={allData.fname} type='text' onChange={(e) => setStaffData({ fname: e.target.value })} placeholder="First Name" />
            </Col>
            <Col xs={20} sm={16} md={10} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Middle Name</h6>
              <Input value={allData.mname} type='text' onChange={(e) => setStaffData({ mname: e.target.value })} placeholder="Middle Name" />
            </Col>
            <Col xs={20} sm={16} md={10} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Last Name</h6>
              <Input value={allData.lname} type='text' onChange={(e) => setStaffData({ lname: e.target.value })} placeholder="Last Name" />
            </Col>
            <Col xs={20} sm={16} md={10} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Phone Number</h6>
              <Input value={allData.phone} type='number' onChange={(e) => setStaffData({ phone: e.target.value })} placeholder="09001234567" />
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
                defaultValue={allData.facultyid ? allData.facultyid : null }
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
                defaultValue={allData.deptid ? allData.deptid : null }
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
              <h6 className='SubHead'>Job Position</h6>
              <Select
                showSearch
                style={{
                  width: '100%'
                }}
                onChange={onPosChange}
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                defaultValue={allData.jobPos ? allData.jobPos : null }
                placeholder="Select Job Position"
                options={[
                  {
                    value: '3',
                    label: 'Senior Lecturer',
                  },
                  {
                    value: '4',
                    label: 'Head of Department',
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
                defaultValue={allData.level ? allData.level : null }
                onChange={onLevelChange}
                placeholder="Select Staff Level"
                options={[
                  {
                    value: '3',
                    label: '10',
                  },
                  {
                    value: '4',
                    label: '11',
                  }
                ]}
              />
            </Col>
            <Col xs={20} sm={16} md={10} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Email</h6>
              <Input value={allData.mail} onChange={(e) => setStaffData({ mail: e.target.value })} type='email' placeholder="example@wetmail.com" />
            </Col>
            <Col xs={20} sm={16} md={10} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Password</h6>
              <Input.Password
              value={allData.pword}
                onChange={(e) => setStaffData({ pword: e.target.value })}
                required
              />
            </Col>
          </Row>
          :
          <Row justify={'center'}>
            <Col xs={24} sm={20} md={16}>
              <div id="PageAwaitingDesign">Awaiting Page Design</div>
            </Col>
          </Row>
      }
      <Row justify="space-between" className='Actions'>
        <span>
          {currentStep === 1
            ?
            <Button
              type="primary"
              icon={<Icon path={mdiArrowLeft}
                size={1}
              />}
              onClick={() => prevStep()}
            >Back</Button>
            : ""}
        </span>
        {currentStep === 1
          ?
          <Button
            type="primary"
            icon={<Icon path={mdiCheckAll}
              size={1}
            />}
            loading={loading}
            onClick={() => addNewStaff()}
          >Submit</Button>
          :
          <Button
            type="primary"
            icon={<Icon path={mdiArrowRight}
              size={1}
            />}
            onClick={() => nextStep()}
          >Next</Button>
        }
      </Row>

    </div>
  );
};

export default Newstaff;
