import React, { useEffect, useState } from 'react'
import {  Button, Col, message, Row, Table } from 'antd';
import AppLoader from "../../../../../Loader";
import { Link, useNavigate } from "react-router-dom";

import Icon from '@mdi/react';
import {
  mdiPencilOutline,
  mdiDeleteOutline,
  mdiAccountCircle,
  mdiNoteEdit,
  mdiUpload,
  mdiFilter,
  mdiAccountMultiplePlusOutline
} from '@mdi/js';
import "./Index.scss"



const ResultsHistory = () => {
  const [ploading, setploading] = useState(false);

  /*  Table Colomns  */
  const tableColumns = [
    {
      title: 'S/N',
      dataIndex: 'sn',
      key: 'sn',
    },
    {
      title: 'Course Code',
      dataIndex: 'ccode',
      key: 'ccode',
    },
    {
      title: 'Course Title',
      dataIndex: 'ctitle',
      key: 'ctitle',
      sorter: true
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Grade Score',
      dataIndex: 'gradescore',
      key: 'gradescore',
    },
    {
      title: 'Weight Score',
      dataIndex: 'weightscore',
      key: 'weightscore',
    },
  ];

  const tableData = []
  for (let i = 0; i < 8; i++) {
    tableData.push(
      {
        sn: i+1,
        ccode: 'Acc 10'+i,
        ctitle: 'Cost Accounting 10'+i,
        unit: '3',
        gradescore: ['C', 'B', 'A', 'D', 'E'][Math.floor(Math.random() * 5)],
        weightscore: ['18', '15', '25', '10'][Math.floor(Math.random() * 4)],
      }
    )
  }

  return (
    <div>
      {ploading ? (
        <AppLoader nameloader={"Staff"} loading={ploading} />
      ) : (
        <Row justify={'center'} className="Resumption">
          <Col xs={24} sm={22}>
          <Row>
            <h6 className='Heading'>Results History</h6>
          </Row>

          <Row  className="Info">
            <h6>2018/2019 First Semester</h6>
            <h6>Current CGPA: 3.80</h6>
            <h6>Current Class: 2/1</h6>
          </Row>
          <Row justify={'center'} style={{marginBottom:'30px'}}>
            <Col xs={24}>
              <Table className='ResultTable' columns={tableColumns} dataSource={tableData} />
            </Col>
          </Row>

          <Row  className="Info">
            <h6>2018/2019 Second Semester</h6>
            <h6>Current CGPA: 3.70</h6>
            <h6>Current Class: 2/1</h6>
          </Row>
          <Row justify={'center'} style={{marginBottom:'30px'}}>
            <Col xs={24}>
              <Table className='ResultTable' columns={tableColumns} dataSource={tableData} />
            </Col>
          </Row>

          <Row  className="Info">
            <h6>2019/2020 First Semester</h6>
            <h6>Current CGPA: 3.70</h6>
            <h6>Current Class: 2/1</h6>
          </Row>
          <Row justify={'center'} style={{marginBottom:'30px'}}>
            <Col xs={24}>
              <Table className='ResultTable' columns={tableColumns} dataSource={tableData} />
            </Col>
          </Row>

          </Col>
        </Row>
      )}
    </div>
  )
}

export default ResultsHistory