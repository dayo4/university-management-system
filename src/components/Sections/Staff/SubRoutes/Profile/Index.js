import React, { useEffect } from 'react'
import { Row, Col, Button } from 'antd';
import Icon from '@mdi/react';
import {
  mdiPencilOutline,
  mdiDeleteOutline,
  mdiAccountCircle,
  mdiNoteEdit
} from '@mdi/js';
import "./Index.scss"



const Profile = ({ setBreadCrumb }) => {

  return (
    <div id="Profile">
      <section className="ProfileImage">
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
          <Button className='Delete'>
            <Icon path={mdiDeleteOutline}
              size={0.9}
              title="Delete"
            />
            Delete
          </Button>
        </div>
      </section>

      <section className='ProfileDetails'>
        <ul className='List'>
          <li>
            <div>NAME: </div>
            <div><div>AFOLABI HASSAN</div></div>
          </li>
          <li>
            <div>GENDER: </div>
            <div><div>MALE</div></div>
          </li>
          <li>
            <div>Phone No.: </div>
            <div><div>4983432453</div></div>
          </li>
          <li>
            <div>Level: </div>
            <div><div>11</div></div>
          </li>
          <li>
            <div>D.O.B: </div>
            <div><div>September 24, 1998</div></div>
          </li>
          <li>
            <div>Status: </div>
            <div><div>Lorem..</div></div>
          </li>
        </ul>
      </section>
        <Row className='Actions' justify="center">
          <Button
            type="primary"
            icon={<Icon path={mdiNoteEdit}
              title="Edit"
              style={{ marginRight: '3px' }}
              size={0.9}
            />}
          >Edit</Button>
        </Row>
    </div>
  )
}

export default Profile