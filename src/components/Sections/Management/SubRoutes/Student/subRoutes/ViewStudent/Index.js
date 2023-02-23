import React, { useEffect, useState } from 'react'
import { Row, Col, Button, message } from 'antd';
import { useParams, useNavigate } from "react-router-dom";
import AppLoader from "../../../../../../../Loader";

import Icon from '@mdi/react';
import {
  mdiPencilOutline,
  mdiDeleteOutline,
  mdiAccountCircle,
  mdiNoteEdit
} from '@mdi/js';
import "./Index.scss"
import axios from 'axios';


const ViewStudent = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [staffData, setStaffData] = useState({});
  // PRELOADER
  const [pageLoading, setPageLoading] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData"))
  const fetchStaff = async () => {
    const data = {
      apptoken: process.env.REACT_APP_UMS_TOKEN,
      usertoken: userData.usertoken,
      token: userData.usertoken
    };

    await axios
      .post(`${process.env.REACT_APP_UMS_BASE}/management/getUserDetails`, data)
      .then((res) => {
        // console.log(res) 
        if (res.data.success === true) {
          // setStaffData(res.data.data)
          setPageLoading(false);
          // message.success(res.data.message)
          authUser();
        } else {
          setPageLoading(false);
          // message.info(res.data.message)
        }
      })
      .catch((err) => {
        setPageLoading(false);
        // message.warning(err.message)
      });
  };

  useEffect(() => {
    const devMode = process.env.NODE_ENV === 'development'
    fetchStaff();
    setPageLoading(true);
    if (devMode) {
      const staffList = JSON.parse(localStorage.getItem("staffList"))
      if (staffList) {
        staffList.find(staff => {
          if(String(staff.id) === params.id) {
            setStaffData(staff)
          }
        })
      }

      setTimeout(() => {
        setPageLoading(false);
      }, 500);
    }
  }, []);

  return (
    <div>
      {pageLoading ? (
        <AppLoader nameloader={"Staff"} loading={pageLoading} />
      ) : (
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
                <div>FIRST NAME: </div>
                <div><div>{staffData.fname }</div></div>
              </li>
              <li>
                <div>MIDDLE NAME: </div>
                <div><div>{staffData.mname }</div></div>
              </li>
              <li>
                <div>LAST NAME: </div>
                <div><div>{staffData.lname }</div></div>
              </li>
              <li>
                <div>Program Type: </div>
                <div><div>{staffData.admission_type}</div></div>
              </li>
              <li>
                <div>Matric No.: </div>
                <div><div>{staffData.matricno}</div></div>
              </li>
              <li>
                <div>GENDER: </div>
                <div><div>{staffData.gender}</div></div>
              </li>
              <li>
                <div>Phone No.: </div>
                <div><div>{staffData.phone}</div></div>
              </li>
              <li>
                <div>E-Mail: </div>
                <div><div>{staffData.mail}</div></div>
              </li>
              <li>
                <div>Faculty: </div>
                <div><div>{staffData.faculty}</div></div>
              </li>
              <li>
                <div>Department: </div>
                <div><div>{staffData.dept}</div></div>
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
                <div><div>{staffData.status}</div></div>
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
      )}
    </div>
  )
}

export default ViewStudent