import React from 'react'
import { Row, Col, Button } from 'antd';
import Icon from '@mdi/react';
import {
  mdiPencilOutline,
  mdiDeleteOutline,
  mdiAccountCircle,
  mdiNoteEdit
} from '@mdi/js';
import "./Profile.scss"



const Home = () => {
  return (
    <Row>
      <Row wrap>
        <Col span={24} className="ProfileImage">
          <div className="Image">
            <Icon path={mdiAccountCircle}
              size={6}
              className="UserIcon"
              title="user-image"
            />
            {/* <img src="./userimg.svg" alt="user-image" className="UserImage" /> */}
          </div>

          <div className="Buttons">
            <Button className='Edit'>
              <Icon path={mdiPencilOutline}
                size={0.9}
                title="Edit"
              />
              Change
            </Button>
            <button className='Delete'>
              <Icon path={mdiDeleteOutline}
                size={0.9}
                title="Delete"
              />
              Delete
            </button>
          </div>
        </Col>

        <Col span={24} className='ProfileDetails'>
          <ul className='List'>
            <li>
              <span>NAME: </span>
              <span>AFOLABI HASSAN</span>
            </li>
            <li>
              <span>GENDER: </span>
              <span>MALE</span>
            </li>
            <li>
              <span>Matric No.: </span>
              <span>4983432453</span>
            </li>
            <li>
              <span>Level: </span>
              <span>300 Level</span>
            </li>
            <li>
              <span>Semester: </span>
              <span>Second</span>
            </li>
            <li>
              <span>Program: </span>
              <span>Computer Science</span>
            </li>
            <li>
              <span>D.O.B: </span>
              <span>September 24, 1998</span>
            </li>
            <li>
              <span>Status: </span>
              <span>Promoted Clean Bill</span>
            </li>
          </ul>
          <Row justify="center">
            <Button
              type="primary"
              icon={<Icon path={mdiNoteEdit}
                title="Edit"
                style={{ marginRight: '3px' }}
                size={0.9}
              />}
            >Edit</Button>
          </Row>
        </Col>
      </Row>
    </Row>
  )
}

export default Home