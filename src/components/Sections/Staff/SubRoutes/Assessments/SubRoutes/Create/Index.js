import React, { useEffect, useState } from 'react'
import { Row, Col, Select, Button, Input } from 'antd';
const { TextArea } = Input;

// import { useNavigate } from "react-router-dom";

import Icon from '@mdi/react';
import {
  mdiCheckAll, mdiUpload
} from '@mdi/js';
import "./Index.scss"



const CreateAssessments = () => {

  const onChange = (e) => {
    // console.log('Change:', e.target.value);
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
            options={[
              {
                value: '1',
                label: 'Cost Acounting 103',
              },
              {
                value: '2',
                label: 'Business Law 101',
              }
            ]}
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

            <div className='UploadBtn'>

              <Button icon={<Icon path={mdiUpload}
                title="upload"
                style={{ marginRight: '3px' }}
                size={1}
              />}>Upload Files</Button>
            </div>
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