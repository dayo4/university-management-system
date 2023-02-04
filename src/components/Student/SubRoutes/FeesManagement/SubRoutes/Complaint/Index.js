import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

import { Row, Col, Button, Input, Image } from 'antd';
const { TextArea } = Input;

import Icon from '@mdi/react';
import {
  mdiCardsOutline,
  mdiFileDocumentMultipleOutline,
  mdiCommentTextOutline,
  mdiAttachment,
  mdiSend,
  mdiDeleteOutline,
  mdiAccountCircle,
} from '@mdi/js';
import "./Index.scss"
// Import dummy svg images
import Complaint from "../../images/Complaint.svg"

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
      <Button>
        DETAILS
      </Button>
    ),
  },
];

const data = []
for (let i = 0; i < 20; i++) {
  data.push(
    {
      key: i,
      date: '15/12/2022',
      amount: '#120,000',
      description: 'Full School fees Payment',
    }
  )
}

const onChange = (e) => {
  // console.log('Change:', e.target.value);
};

const Home = () => {
  const navigate = useNavigate();

  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    send()

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);
  };

  function send() {
    return
  }

  // Render
  return (
    <div>
      <Row wrap justify="space-around" className="SubWrapper">
        {Items.map((item, i) => {
          return (
            <Col onClick={() => navigate('/student/fees/' + item.link)} key={i} className={"Box " + (i === 2 ? "Active" : "")} xs={6}>
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
          <h5 className='Heading'>New Complaint</h5>
        </Col>
        <Col xs={24} sm={20} md={20} className='Body'>
          <Row justify="center">
            <Col>
              <Image
                preview={false}
                width={'320px'}
                src={Complaint}
              />
            </Col>
          </Row>

          <TextArea
            showCount
            maxLength={1000}
            style={{
              height: 120,
              resize: 'none',
            }}
            onChange={onChange}
            placeholder="Start typing your complaints..."
          />

          <Row justify="space-between" className='Actions'>
            <span className='Attach'>
              <Icon path={mdiAttachment}
                title="attachment"
                className='Icon'
                size={1}
              />
              Attach Files
            </span>
            <Button
              type="primary"
              icon={<Icon path={mdiSend}
                title="send"
                className='Icon'
                size={1}
              />}
              loading={loadings[1]}
              onClick={() => enterLoading(1)}
            >Send</Button>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Home