import React, { useEffect, useState } from 'react'
import { Row, Col, Select, Button, DatePicker, Input, message } from 'antd';
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import Icon from '@mdi/react';
import {
  mdiCheckAll
} from '@mdi/js';
import "./Index.scss"

const CreateCourses = () => {
  const [courseList, setCourseList] = useState([]);
  const [newCourseData, setNewCourseData] = useState({
    courseTitle: '',
    courseCode: '',
    unit: '',
    requirement: '',
    deptid: '',
    level: '',
    sessionid: '',
  });
  const [loading, setLoading] = useState(false);
  const [apptoken, setpptoken] = useState(process.env.REACT_APP_UMS_TOKEN);

  useEffect(() => {
    getCourses();
  }, []);

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
  };


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
            console.log(res.data.data)
            setCourseList(res.data.data);
          }

          console.log(courseList)
        })

        .catch((err) => {
          console.log(err);
          setTimeout(() => {
            getCourses();
          }, 20000);
        });
  };

  const addCourse = async () => {
    setLoading(true);
    const { usertoken } = JSON.parse(localStorage.getItem("userData"))

    const data = {
      apptoken: apptoken,
      usertoken: usertoken,
      ...newCourseData
      // features: {
      //   Dashboard: accessDash,
      //   Finance: accessFniance,
      //   Memo: accessMemo,
      // },
    };


    usertoken,
      await axios
        .post(`${process.env.REACT_APP_UMS_BASE}/general/addCourse`, data)
        .then((res) => {
          setLoading(false);
          if (res.data.success == false) {
            message.info(`${res.data.message} Please check form again..`);
          } else {
            console.log(res.data.data)
            message.success(res.data.message);
          }

        })

        .catch((err) => {
          message.warning(err.message);
        });
  };

  /* Alterations handler functions */
  function onUnitChange(value) {
    setCourseData({ unit: value })
  }
  function onLevelChange(value) {
    setCourseData({ level: value })
  }
  function onDeptChange(value) {
    setCourseData({ deptid: value })
  }
  function onReqChange(value) {
    setCourseData({ requirement: value })
  }

  function setCourseData(data/* object containing data to spread */) {
    setNewCourseData({
      ...newCourseData,
      ...data
    })
  }

  return (
    <div>
      <Row justify="center" className="CreateCourse">
        <Col xs={24} sm={20}>
          <h5 className='Heading'>Create Course</h5>
        </Col>
        <Col xs={24} sm={20}>
          <Row justify={'space-between'}>
            <Col xs={24} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Check All Available Courses</h6>
              <Select
                showSearch
                style={{
                  width: '100%'
                }}
                placeholder="List Of All Courses"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={courseList.map((crs) => {
                  return {
                    value: crs.id,
                    label: crs.course,
                  }
                })}
              />
            </Col>
            <Col xs={24} sm={16} md={10} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Course Title</h6>
              <Input type='text' onChange={(e) => setCourseData({ courseTitle: e.target.value })} placeholder="Course Title" />
            </Col>
            <Col xs={24} sm={16} md={10} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Course Code</h6>
              <Input type='text' onChange={(e) => setCourseData({ courseCode: e.target.value })} placeholder="Course Code" />
            </Col>
            <Col xs={5} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Course Unit</h6>
              <Select
                style={{
                  width: '100%'
                }}
                placeholder="Select Course Unit"
                onChange={onUnitChange}
                options={[
                  {
                    value: '1',
                    label: '1',
                  },
                  {
                    value: '2',
                    label: '2',
                  },
                  {
                    value: '3',
                    label: '3',
                  },
                  {
                    value: '4',
                    label: '4',
                  }
                ]}
              />
            </Col>
            <Col xs={24} sm={16} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Course Requirement</h6>
              <Select
                style={{
                  width: '100%'
                }}
                placeholder="Select"
                onChange={onReqChange}
                options={[
                  {
                    value: 'req1',
                    label: 'req 1',
                  },
                  {
                    value: 'req2',
                    label: 'req 2',
                  }
                ]}
              />
            </Col>
            <Col xs={4} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Level</h6>
              <Select
                style={{
                  width: '100%'
                }}
                placeholder="Select Level"
                onChange={onLevelChange}
                options={[
                  {
                    value: '100',
                    label: '100',
                  },
                  {
                    value: '200',
                    label: '200',
                  },
                  {
                    value: '300',
                    label: '300',
                  },
                  {
                    value: '400',
                    label: '400',
                  },
                ]}
              />
            </Col>
            <Col xs={14} sm={8} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Department</h6>
              <Select
                style={{
                  width: '100%'
                }}
                placeholder="Select Department"
                onChange={onDeptChange}
                options={[
                  {
                    value: '3',
                    label: 'Accounting',
                  },
                  {
                    value: '4',
                    label: 'Computer Science',
                  }
                ]}
              />
            </Col>
            <Col xs={8} md={5} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Date</h6>
              <DatePicker onChange={onDateChange} />
            </Col>
            <Col xs={8} md={8} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Session</h6>
              <Select
                style={{
                  width: '100%'
                }}
                placeholder="Select Session"
                options={[
                  {
                    value: '1',
                    label: '2023/2024',
                  },
                  {
                    value: '2',
                    label: '2024/2025',
                  }
                ]}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={20}>
          <Row justify="space-between" className='Actions'>
            <span></span>
            <Button
              type="primary"
              icon={<Icon path={mdiCheckAll}
                title="confirm"
                style={{ marginRight: '3px' }}
                size={1}
              />}
              loading={loading}
              onClick={() => addCourse()}
            >Add</Button>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default CreateCourses