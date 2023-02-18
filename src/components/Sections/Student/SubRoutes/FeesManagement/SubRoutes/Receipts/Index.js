import React, { useEffect } from 'react'
import {useNavigate} from "react-router-dom"

import { Row, Col, Table, Button } from 'antd';
import Icon from '@mdi/react';
import {
  mdiCardsOutline,
  mdiFileDocumentMultipleOutline,
  mdiCommentTextOutline,
  mdiDeleteOutline,
  mdiAccountCircle
} from '@mdi/js';
import "./Index.scss"
// Import dummy svg images
// import PaymentOpt from "../../images/PaymentOpt.svg"

// const [tableData, setTableData] = useState([])
const Items = [
  { title: 'Payment', link: 'payment', icon: mdiCardsOutline },
  { title: 'Receipts', link: 'receipts', icon: mdiFileDocumentMultipleOutline },
  { title: 'Payment Complaint', link: 'complaint', icon: mdiCommentTextOutline },
]

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Button style={{border: 'solid 1px #4B4DED'}}>
        DETAILS
      </Button>
    ),
  },
];

const data = []
for (let i = 0; i < 60; i++) {
  data.push(
    {
      key: i,
      date: '15/12/2022',
      amount: '#120,000',
      description: 'Full School fees Payment',
    }
  )
}
// useEffect(() => {
//   const data = []
//   for (let i = 0; i < 20; i++) {
//     data.push(
//       {
//         key: i,
//         date: '15/12/2022',
//         amount: '#120,000',
//         description: 'Full School fees Payment',
//       }
//     )
//   }

//   setTableData(data)
// })


const Receipts = () => {
 
  const navigate = useNavigate();

  return (
    <div>
      <Row wrap justify="space-around" className="SubWrapper">
        {Items.map((item, i) => {
          return (
            <Col onClick={()=>navigate('/student/fees/'+item.link)} key={i} className={"Box " + (i === 1 ? "Active" : "")} xs={6}>
              <div className='Icon'>
                <Icon path={item.icon}
                  title={item.title}
                  size={1}
                />
              </div>
              <div className="Title">{item.title}</div>
            </Col>
          )
        })}
      </Row>
      <Row justify="center" className="Content">
        <Col xs={24} sm={20} md={20}>
          <h5 className='Heading'>All Receipts</h5>
        </Col>
        <Col xs={24} sm={20} md={20}>
          <Table className='RTable' columns={columns} dataSource={data} />
        </Col>
      </Row>
    </div>
  )
}

export default Receipts