import { useEffect, useState } from 'react'
import { Row, Col, Table, Button, Select } from 'antd';
// import { useNavigate } from "react-router-dom";

import Icon from '@mdi/react';
import {
  mdiCheckAll
} from '@mdi/js';
import "./Index.scss"



const Attendance = () => {

  // const navigate = useNavigate();
 
   /*  Table Colomns  */
   const tableColumns = [
     {
       title: 'NAME',
       dataIndex: 'name',
       key: 'name',
       sorter: true
     },
     {
       title: 'LEVEL',
       dataIndex: 'level',
       key: 'level',
     },
     {
       title: 'MATRIC NO.',
       dataIndex: 'matric_no',
       key: 'matric no',
     },
     {
      title: 'ACTION',
      key: 'action',
      render: (_, record) => (
        <Button style={{borderRight : 'solid 1px #d9d9d9'}}>
          REVIEW
        </Button>
      ),
    },
   ];
 
   /* Table Data */
   const tableData = []
   for (let i = 0; i < 90; i++) {
     tableData.push(
       {
         key: i,
         name: 'Adeola Mercy',
         level: '400',
         matric_no: '897890',
       }
     )
   }
 
 
   return (
     <div>
       <Row justify="center" className="Content">
       <Col xs={24} md={20}>
          <h5 className='Heading'>Review Assessments</h5>
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
         <Col xs={24} md={20}>
           <Table className='CTable' columns={tableColumns} dataSource={tableData} />
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