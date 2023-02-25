import { useState, useEffect } from "react";

import "./Index.scss";
import { Link, useNavigate } from "react-router-dom";
import AppLoader from "../../../../../Loader";
import { Button, Col, message, Row, Table } from "antd";
import axios from "axios";
import {
  mdiAccountMultiplePlusOutline,
  mdiCheckAll, mdiFilter
} from '@mdi/js';
import Icon from "@mdi/react";

const Staff = () => {
  const [apptoken, setpptoken] = useState(process.env.REACT_APP_UMS_TOKEN);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [courseList, setCourseList] = useState([]);

  // PRELOADER
  const [ploading, setploading] = useState(false);
  const navigate = useNavigate();


  const devMode = process.env.NODE_ENV === 'development'
  useEffect(() => {
    // console.log(courseList[0])
    getCourses();
    setploading(true);
    if (devMode) {
      const storedData = JSON.parse(localStorage.getItem("courseList"))
      if (storedData)
        setCourseList(storedData)


      setTimeout(() => {
        setploading(false);
      }, 500);
    }
  }, []);

  // GETTING LIST OF STAFF
  const getCourses = async () => {
    const { usertoken } = JSON.parse(localStorage.getItem("userData"))

    const staffData = {
      apptoken: apptoken,
      usertoken,
    };

    await axios
      .post(`${process.env.REACT_APP_UMS_BASE}/general/listCourses`, staffData)
      .then((res) => {
        console.log(res)
        if (res.data.success == false) {
          message.error('unable to get course!')
        } else {
          console.log(res.data.data)
          setCourseList(res.data.data);
          // if (devMode)
            localStorage.setItem('courseList', JSON.stringify(res.data.data));
        }

        setploading(false);
      })

      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          getCourses();
        }, 20000);
      });
  };

  // MODAL FUNCTION FOR DELETING STAFF
  const [show, setShow] = useState(false);

  /*  Table Colomns  */
  const tableColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: true
    },
    {
      title: 'Session',
      dataIndex: 'session',
      key: 'session',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
    },
  ];

  const tableData = []
  for (let i = 0; i < courseList.length; i++) {
    tableData.push(
      {
        key: i,
        title:courseList[i].course,
        session: courseList[i].session,
        unit: courseList[i].unit,
        department:courseList[i].dept || 'Business Admin',
        level: courseList[i].level,
      }
    )
  }

  return (
    <div>
      {ploading ? (
        <AppLoader nameloader={"Staff"} loading={ploading} />
      ) : (
        <div className="MgtStaffOverview">
          <Row justify={'space-between'} align={'middle'} className="TopActions">
            <h6>Courses Overview</h6>

          </Row>

          <Row justify={'center'}>
            <Col xs={24}>
              <Table className='StaffTable' scroll={{ x: '100%' }} columns={tableColumns} dataSource={tableData} />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Staff;
