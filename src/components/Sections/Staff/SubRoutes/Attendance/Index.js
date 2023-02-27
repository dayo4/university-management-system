import React, { useEffect, useState } from 'react'
import { Row, Col, Table, Button, Select, message } from 'antd';
// import { useNavigate } from "react-router-dom";
import AppLoader from "../../../../../Loader";

import Icon from '@mdi/react';
import {
  mdiCheckAll
} from '@mdi/js';
import "./Index.scss"
import axios from 'axios';



const Attendance = () => {

  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ploading, setploading] = useState(false);
  const [apptoken, setpptoken] = useState(process.env.REACT_APP_UMS_TOKEN);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [currentSelectedCourse, setCurrentSelectedCourse] = useState('');
  const [courseList, setCourseList] = useState([]);
  const [studentList, setStudentList] = useState([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  useEffect(() => {
    getCourses();
    fetchStudents()
  }, []);

  const getCourses = async () => {
    const { usertoken } = JSON.parse(localStorage.getItem("userData"))

    const data = {
      apptoken: apptoken,
      usertoken: usertoken,
    };

    usertoken,
      await axios
        .post(`${process.env.REACT_APP_UMS_BASE}/general/listCourses`, data)
        .then((res) => {
          console.log(res)
          if (res.data.success == false) {
            message.error('unable to get course!')
          } else {
            setCourseList(res.data.data);
          }

        })

        .catch((err) => {
          console.log(err);
          setTimeout(() => {
            getCourses();
          }, 20000);
        });
  };

  const fetchStudents = async () => {
    const studentData = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
    };

    setploading(true)
    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/general/listAllStudents`, studentData)
      .then((res) => {
        // console.log(res)
        if (res.data.success === false) {
          message.error('unable to get data!')
        } else {
          const studs = res.data.data
          const tableData =
            studs.map((stud) => {
              return {
                key: stud.id,
                name: stud.fname + ' ' + stud.lname,
                level: '400',
                matric_no: stud.matricno,
              }
            })

          setStudentList(tableData);
        }

        setploading(false);
      })

      .catch((err) => {
        setploading(false)
        setTimeout(() => {
          fetchStudents();
        }, 20000);
      });
  };

  const takeAttendance = async () => {
    const attendanceData = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
      courseId: currentSelectedCourse,
      student: selectedRowKeys
    };

    setLoading(true);
    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/staff/takeAttendance`, attendanceData)
      .then((res) => {
        // console.log(res)
        if (res.data.success === false) {
          message.error('unable to complete operation!!')
        } else {
          message.success('Attendance Created!')
          setSelectedRowKeys([])
        }

        setLoading(false);
      })

      .catch((err) => {
        message.error('unable to complete operation!!')
        setLoading(false)
      });
  };

  function onCourseChange(courseId) {
    setSelectedRowKeys([])
    setCurrentSelectedCourse(courseId)
    fetchStudents()
  }

  /*  Table Colomns  */
  const tableColumns = [
    {
      title: 'Select',
      dataIndex: 'select',
      key: 'select',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Matric No.',
      dataIndex: 'matric_no',
      key: 'matric no',
    },
  ];

  return (
    <Row justify="center" className="Content">
      <Col xs={24} md={20}>
        <h6 className='Heading'>Manage Attendance</h6>
      </Col>
      <Col xs={24} md={20} style={{ margin: '20px 0' }}>
        <h6 className='SubHead'>Select Course</h6>
        <Select
          showSearch
          style={{
            width: '100%'
          }}
          placeholder="Select A Course"
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          onChange={onCourseChange}
          defaultValue={'1'}
          options={courseList.map((crs) => {
            return {
              value: crs.id,
              label: crs.course,
            }
          })}
        />
      </Col>
      <Col xs={24} md={20}>
        <h6 className='SubHead'>Select Students For Attendance</h6>
        {ploading ? (
          <AppLoader nameloader={"Students"} loading={ploading} />
        ) : (
          <Table rowSelection={rowSelection} className='CTable' columns={tableColumns} dataSource={studentList} />
        )}
      </Col>
      <Col xs={24} md={20}>
        <Row justify="space-between" className='Actions'>
          <span></span>
          <Button
            onClick={() => takeAttendance()}
            loading={loading}
            type="primary"
            icon={<Icon path={mdiCheckAll}
              title="confirm"
              style={{ marginRight: '3px' }}
              size={1}
            />}
          >Apply</Button>
        </Row>
      </Col>
    </Row>
  )
}
export default Attendance