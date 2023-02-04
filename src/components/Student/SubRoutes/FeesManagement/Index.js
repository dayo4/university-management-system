import React from 'react'
import { Row, Col } from 'antd';
import { useNavigate } from "react-router-dom";

import Icon from '@mdi/react';
import {
  mdiCardsOutline,
  mdiFileDocumentMultipleOutline,
  mdiCommentTextOutline,
  mdiDeleteOutline,
  mdiAccountCircle
} from '@mdi/js';
import "./Index.scss"

const Items = [
  { title: 'Payment', link: 'payment', icon: mdiCardsOutline },
  { title: 'Receipts', link: 'receipts', icon: mdiFileDocumentMultipleOutline },
  { title: 'Print Receipts', link: '', icon: mdiFileDocumentMultipleOutline },
  { title: 'Payment Complaint', link: 'complaint', icon: mdiCommentTextOutline },
]

const Home = () => {
  const navigate = useNavigate();

  return (
    <Row wrap justify="center" className="EntryWrapper">
      {Items.map((item, i) => {
        return (
          <Col onClick={() => navigate('/student/fees/' + item.link)} key={i} className="Box" xs={10} sm={7}>
            <div className='Icon'>
              <Icon path={item.icon}
                title={item.title}
                size={2}
              />
            </div>
            <div className="Title">{item.title}</div>
          </Col>
        )
      })}
    </Row>
  )
}

export default Home