import React from 'react'
import { Row, Col } from 'antd';
// import { useNavigate } from "react-router-dom";

import Icon from '@mdi/react';
import {
  mdiCardsOutline,
  mdiFileDocumentMultipleOutline,
  mdiCommentTextOutline,
  mdiDeleteOutline,
  mdiAccountCircle
} from '@mdi/js';
import "./Index.scss"



const Home = () => {
  // const navigate = useNavigate();
  const attendance = []
  for (let i = 0; i < 10; i++) {
    attendance.push({ title: 'Lecture-' + i, status: String(Math.ceil(Math.random() * 100)) + '%' })
  }


  return (
    <Row wrap justify="center" className="AttenWrapper">
      {attendance.map((item, i) => {
        return (
          <Col xs={24} sm={20} md={13}>
            <div key={i} className="List">
              <div className='Title'>
                {item.title}
              </div>
              <div className="Status">{item.status}</div>
            </div>
          </Col>
        )
      })}
    </Row>
  )
}

export default Home