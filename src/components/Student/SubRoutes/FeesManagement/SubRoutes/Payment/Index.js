import React from 'react'
import {useNavigate} from "react-router-dom"

import { Row, Col } from 'antd';
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
import PaymentOpt from "../../images/PaymentOpt.svg"

const Items = [
  { title: 'Payment', link: 'payment', icon: mdiCardsOutline },
  { title: 'Receipts', link: 'receipts', icon: mdiFileDocumentMultipleOutline },
  { title: 'Payment Complaint', link: 'complaint', icon: mdiCommentTextOutline },
]

const Payment = ({setBreadCrumb}) => {
  setBreadCrumb()

  const navigate = useNavigate();


  return (
    <div>
      <Row wrap justify="space-around" className="SubWrapper">
        {Items.map((item, i) => {
          return (
            <Col onClick={()=>navigate('/student/fees/'+item.link)} key={i} className={"Box " + (i === 0 ? "Active" : "")} xs={6}>
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
          <h5 className='Heading'>Payment Options</h5>
        </Col>
        <Col xs={24} sm={20} md={20}>
          <img src={PaymentOpt}></img>
        </Col>
      </Row>
    </div>
  )
}

export default Payment