import React, { useEffect, useState } from 'react'
import { Row, Col, Table, Button, Select, message } from 'antd';
// import { useNavigate } from "react-router-dom";

import Icon from '@mdi/react';
import {
  mdiCheckAll
} from '@mdi/js';
import "./Index.scss"
import axios from 'axios';



const Attendance = () => {

  // const navigate = useNavigate();
  const [apptoken, setpptoken] = useState(process.env.REACT_APP_UMS_TOKEN);
  const [courseList, setCourseList] = useState([]);

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

  /*  Table Colomns  */
  const tableColumns = [
    {
      title: '',
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

  /* Table Data */
  const tableData = []
  for (let i = 0; i < 90; i++) {
    tableData.push(
      {
        key: i,
        name: ['Adeola Mercy', 'Jide Taiwo', 'Adesola Romoke'][Math.floor(Math.random() * 3)],
        level: '400',
        matric_no: '897890',
      }
    )
  }


  return (
    <div>
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
            options={courseList.map((crs) => {
              return {
                value: crs.id,
                label: crs.course,
              }
            })}
          />
        </Col>
        <Col xs={24} md={20}>
          <Table rowSelection={rowSelection} className='CTable' columns={tableColumns} dataSource={tableData} />
        </Col>
        <Col xs={24} md={20}>
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
export default Attendance