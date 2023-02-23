import React, { useEffect, useState } from 'react'
import { Row, Col, Button, message } from 'antd';
import Icon from '@mdi/react';
import {
  mdiPencilOutline,
  mdiDeleteOutline,
  mdiAccountCircle,
  mdiNoteEdit
} from '@mdi/js';
import "./Index.scss"
import axios from 'axios';


const Profile = () => {
  const [profileData, setProfileData] = useState(localStorage.getItem("userPrf"));

  const userData = JSON.parse(localStorage.getItem("userData"))
  const fetchProfile = async () => {
    const data = {
      apptoken: process.env.REACT_APP_UMS_TOKEN,
      usertoken: userData.usertoken,
      token: userData.usertoken
    };

    await axios
      .post(`${process.env.REACT_APP_UMS_BASE}/management/getUserDetails`, data)
      .then((res) => {
        console.log(res)
        if (res.data.success === true) {
          message.success(res.data.message)
          // setLoading(false);
          localStorage.setItem("userPrf",  JSON.stringify(res.data.data))
          console.log(localStorage.getItem("userPrf"))
          // authUser();
        } else {
          // setLoading(false);
          message.info(res.data.message)
        }
      })
      .catch((err) => {
        // setLoading(false);
        message.warning(err.message)
      });
  };

  useEffect(() => {
    fetchProfile()
  }, []);

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
          <button className='Delete'>
            <Icon path={mdiDeleteOutline}
              size={0.9}
              title="Delete"
            />
            Delete
          </button>
        </div>
      </section>

      <section className='ProfileDetails'>
        <ul className='List'>
          <li>
            <div>NAME: </div>
            <div><div>Omoleke Grace</div></div>
          </li>
          <li>
            <div>GENDER: </div>
            <div><div>FEMALE</div></div>
          </li>
          <li>
            <div>Phone No.: </div>
            <div><div>4983432453</div></div>
          </li>
          <li>
            <div>Level: </div>
            <div><div>21</div></div>
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