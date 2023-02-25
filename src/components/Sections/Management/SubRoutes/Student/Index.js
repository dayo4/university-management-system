import React, { useState, useEffect } from "react";
import Request from "./Requests/Request";
import axios from "axios";
import AppLoader from "../../../../../Loader";
import { Button, Col, Row, Table, Tabs } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./Index.scss"
import Icon from '@mdi/react';
import {
  mdiAccountMultiplePlusOutline,
  mdiAccountSchoolOutline,
  mdiAccountTieOutline,
  mdiArrowBottomRight,
  mdiArrowTopRight,
  mdiCheckAll,
  mdiEmailArrowLeftOutline,
  mdiEmailArrowRightOutline,
  mdiEmailCheckOutline,
  mdiEmailOpenMultipleOutline,
  mdiFilter,
  mdiPlusBox,
} from '@mdi/js';

// IMPORTING IMAGES
// import inboxm from "../../../images/inbox.svg";
// import sent from "../../../images/sent.svg";
// import onboard from "../../../images/onboard.svg";


const Student = () => {
  // TAB DECLEARATION
  const [toggleState, setToggleState] = useState(1);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [apptoken, setpptoken] = useState(process.env.REACT_APP_UMS_TOKEN);
  const [ploading, setploading] = useState(false);
  const [studentList, setStudentList] = useState([]);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  const navigate = useNavigate();

  const devMode = process.env.NODE_ENV === 'development'
  useEffect(() => {

    fetchStudents();
    setploading(true);
    if (devMode) {
      const storedData = JSON.parse(localStorage.getItem("studentList"))
      if (storedData)
        setStudentList(storedData)


      setTimeout(() => {
        setploading(false);
      }, 500);
    }
  }, []);

  // GETTING LIST OF STUDENTS
  const fetchStudents = async () => {
    const studentfData = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
    };

    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/general/listAllStudents`, studentfData)
      .then((res) => {
        console.log(res)
        if (res.data.success === false) {
          message.error('unable to get data!')
        } else {
          setStudentList(res.data.data);
          // if (devMode)
            localStorage.setItem('studentList', JSON.stringify(res.data.data));
        }

        setploading(false);
      })

      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          fetchStudents();
        }, 20000);
      });
  };


  /*  Table Colomns  */
  const tableColumns = [
    {
      // title: 'Image',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true
    },
    {
      title: 'faculty',
      dataIndex: 'faculty',
      key: 'faculty',
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
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      // render: (_, record) => (
      //   <Button style={{ border: 'solid 1px #4B4DED', }}>
      //     Open
      //   </Button>
      // ),
    },
  ];

  const tableData = []
  const randomColors = ['yellow', 'red', 'lightblue', 'green', 'blue', 'brown', 'cyan', 'teal']
  for (let i = 0; i < studentList.length; i++) {
    tableData.push(
      {
        key: i,
        image: <div className="StudentsImgAlt" style={{ backgroundColor: randomColors[Math.floor(Math.random() * randomColors.length)] }}>{studentList[i].fname.charAt(0) + studentList[i].lname.charAt(0)}</div>,
        name: studentList[i].fname + ' ' + studentList[i].lname,
        faculty: 'Mgt Science',
        department: 'Business Admin',
        level: '100',
        email: studentList[i].mail,
        action: <Button onClick={() => navigate('/management/student/view/' + studentList[i].id, { state: {} })} style={{ border: 'solid 1px #4B4DED', }}>
          Open
        </Button>
      }
    )
  }

  const tabsContent = [
    {
      key: '1',
      label:
        <div className="StudentsTabsHeading">
          <Icon path={mdiEmailArrowLeftOutline}
            size={0.9}
          />
          <h6>Students</h6>
        </div>,
      children: <Row justify={'center'}>
        <Col xs={24}>
          <Row justify={{ xs: 'start', md: 'space-between' }} align={'middle'} className="StatsSummary_Students">
            <Col xs={12} md={5} className="Summary1">
              <div className="Icon">
                <Icon path={mdiAccountSchoolOutline}
                  size={1}
                />
              </div>
              <div className="Text">
                <p>Total Stadents</p>
                <h5>15,000</h5>
              </div>
            </Col>

            <Col xs={12} md={5} className="Summary2">
              <div className="Icon">
                <Icon path={mdiArrowTopRight}
                  size={1}
                />
              </div>
              <div className="Text">
                <p>Total Requests</p>
                <h5>4,860</h5>
              </div>
            </Col>

            <Col xs={12} md={5} className="Summary3">
              <div className="Icon">
                <Icon path={mdiCheckAll}
                  size={1}
                />
              </div>
              <div className="Text">
                <p>Accepted Requests</p>
                <h5>3,578</h5>
              </div>
            </Col>

            <Col xs={12} md={5} className="Summary4">
              <div className="Icon">
                <Icon path={mdiArrowBottomRight}
                  size={1}
                />
              </div>
              <div className="Text">
                <p>Declined Requests</p>
                <h5>198</h5>
              </div>
            </Col>
          </Row>
          <Table className='StudentsTable' scroll={{ x: '100%' }} columns={tableColumns} dataSource={tableData} />
        </Col>
      </Row>,
    },
    {
      key: '2',
      label:
        <div className="StudentsTabsHeading">
          <Icon path={mdiEmailArrowRightOutline}
            size={0.9}
          />
          <h6>Requests</h6>
        </div>,
      children: <Request />,
    },
  ];

  return (
    <div>
      {ploading ? (
        <AppLoader nameloader={"Students"} loading={ploading} />
      ) : (
        <div className="MgtStudentsOverview">
          <Row justify={'space-between'} align={'middle'} className="TopActions">
            <h6>Students Overview</h6>

            <div>
              <Button
                icon={<Icon path={mdiFilter} size={1} />}>
                Filter
              </Button>
              <Button
                icon={<Icon path={mdiAccountMultiplePlusOutline} size={1} style={{ marginRight: '5px' }} />}
                onClick={() => navigate("/management/student/add")}>
                Add Student
              </Button>
            </div>
          </Row>

          <Tabs defaultActiveKey="1" items={tabsContent}> </Tabs>

        </div>
      )}
    </div>
  );
};

export default Student;
