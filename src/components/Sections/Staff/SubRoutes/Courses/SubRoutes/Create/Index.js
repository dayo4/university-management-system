import React, { useEffect, useState } from 'react'
import { Row, Col, Select, Button } from 'antd';
// import { useNavigate } from "react-router-dom";

import Icon from '@mdi/react';
import {
  mdiCheckAll
} from '@mdi/js';
import "./Index.scss"



const CreateCourses = () => {

  return (
    <div>
      <Row justify="center" className="CreateCourse">
        <Col xs={24} sm={20}>
          <h5 className='Heading'>Create Course</h5>
        </Col>
        <Col xs={24} sm={20}>
          <Row justify={'space-between'}>
            <Col xs={24} style={{ marginTop: '10px' }}>
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
            <Col xs={5} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Course Unit</h6>
              <Select
                style={{
                  width: '100%'
                }}
                placeholder="Select Course Unit"
                options={[
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
                options={[
                  {
                    value: '3',
                    label: 'req 1',
                  },
                  {
                    value: '4',
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
            <Col xs={14} sm={8} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Department</h6>
              <Select
                style={{
                  width: '100%'
                }}
                placeholder="Select Department"
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
              <Select
                style={{
                  width: '100%'
                }}
                placeholder="Select Date"
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
            <Col xs={8} md={8} style={{ marginTop: '10px' }}>
              <h6 className='SubHead'>Session</h6>
              <Select
                style={{
                  width: '100%'
                }}
                placeholder="Select Session"
                options={[
                  {
                    value: '3',
                    label: '2023/2024',
                  },
                  {
                    value: '4',
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
            >Add</Button>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default CreateCourses