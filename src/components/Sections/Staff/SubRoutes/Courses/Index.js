import React, { useEffect, useState } from 'react'
import { Row, Col, Table, Button } from 'antd';
// import { useNavigate } from "react-router-dom";

import Icon from '@mdi/react';
import {
  mdiCheckAll
} from '@mdi/js';
import "./Index.scss"



const Courses = ({setBreadCrumb}) => {
  useEffect(() => {
    setBreadCrumb()
  })

  // const navigate = useNavigate();

  /* Table checkbox select algo */
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

  /*  Table Colomns  */
  const tableColumns = [
    {
      title: '',
      dataIndex: 'select',
      key: 'select',
    },
    {
      title: 'Course Code',
      dataIndex: 'course_code',
      key: 'course code',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Course Title',
      dataIndex: 'course_title',
      key: 'course title',
    },
  ];

  /* Table Data */
  const tableData = []
  for (let i = 0; i < 90; i++) {
    tableData.push(
      {
        key: i,
        course_code: 'MTS 101',
        unit: '4',
        course_title: 'Software ENgineering',
      }
    )
  }


  return (
    <div>
      <Row justify="center" className="Content">
        <Col xs={24} sm={20} md={20}>
          <h5 className='Heading'>Courses Registration</h5>
        </Col>
        <Col xs={24} sm={20} md={20}>
          <Table rowSelection={rowSelection} className='CTable' columns={tableColumns} dataSource={tableData} />
        </Col>
        <Col xs={24} sm={20} md={20}>
          <Row justify="space-between" className='Actions'>
            <span></span>
            <Button
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
    </div>
  )
}

export default Courses