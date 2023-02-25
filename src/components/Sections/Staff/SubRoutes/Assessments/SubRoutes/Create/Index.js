import React, { useEffect, useState } from 'react'
import { Row, Col, Select, Button, Input, message, Upload } from 'antd';
const { TextArea } = Input;

// import { useNavigate } from "react-router-dom";

import Icon from '@mdi/react';
import {
  mdiCheckAll, mdiUpload
} from '@mdi/js';
import "./Index.scss"
import axios from 'axios';



const CreateAssessments = () => {
  const [courseList, setCourseList] = useState([]);
  const [apptoken, setpptoken] = useState(process.env.REACT_APP_UMS_TOKEN);

  // const navigate = useNavigate();
  useEffect(() => {
    getCourses();
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

  const onChange = (e) => {
    // console.log('Change:', e.target.value);
  };

  const uploadProps = {
    name: 'assessment',
    action: 'https://www.random.com',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };


  return (
    <div>
      <Row justify="center" className="CreateCourse">
        <Col xs={24} sm={20}>
          <h5 className='Heading'>Create Assessment</h5>
        </Col>
        <Col xs={24} sm={20} md={16} style={{ marginTop: '10px' }}>
          <h6 className='SubHead'>All Available Courses</h6>
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
            options={courseList.map((crs) => {
              return {
                value: crs.id,
                label: crs.course,
              }
            })}
          />
        </Col>
        <Col xs={24} sm={20} md={16} style={{ marginTop: '30px' }}>
          {/* <h6 className='SubHead'>All Available Courses</h6> */}
          <TextArea
            showCount
            maxLength={10000}
            style={{
              height: 120,
              resize: 'none',
            }}
            onChange={onChange}
            placeholder="Start typing your assessment..."
          />
        </Col>

        <Col xs={24} sm={20} md={16}>
          {/* <h6 className='SubHead'>All Available Courses</h6> */}
          <Row justify={'center'} align='middle'>

            <Upload className='UploadBtn' {...uploadProps}>
              <Button icon={<Icon path={mdiUpload}
                title="upload"
                style={{ marginRight: '3px' }}
                size={1}
              />}>Upload Files</Button>
            </Upload>
          </Row>
        </Col>

        <Col xs={24}>
          <Row justify="space-between" className='Actions'>
            <span></span>
            <Button
              type="primary"
              icon={<Icon path={mdiCheckAll}
                title="confirm"
                style={{ marginRight: '3px' }}
                size={1}
              />}
            >Add</Button>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default CreateAssessments