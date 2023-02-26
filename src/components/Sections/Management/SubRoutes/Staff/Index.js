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
  const [staffList, setStaffList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);

  // PRELOADER
  const [ploading, setploading] = useState(false);
  const navigate = useNavigate();


  const devMode = process.env.NODE_ENV === 'development'
  useEffect(() => {
    // console.log(staffList[0])
    getStaff();
    setploading(true);
    if (devMode) {
      const storedData = JSON.parse(localStorage.getItem("staffList"))
      if (storedData)
        setStaffList(storedData)


      setTimeout(() => {
        setploading(false);
      }, 500);
    }
  }, []);

  // GETTING LIST OF STAFF
  const getStaff = async () => {
    const { usertoken } = JSON.parse(localStorage.getItem("userData"))

    const staffData = {
      apptoken: apptoken,
      usertoken,
    };

    await axios
      .post(`${process.env.REACT_APP_UMS_BASE}/general/listAllStaffs`, staffData)
      .then((res) => {
        if (res.data.success == false) {
          message.error('unable to get data!')
        } else {
          console.log(res.data.data)
          setStaffList(res.data.data);
          // if (devMode)
            localStorage.setItem('staffList', JSON.stringify(res.data.data));
        }

        setploading(false);
      })

      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          getStaff();
        }, 20000);
      });
  };

  // MODAL FUNCTION FOR DELETING STAFF
  const [show, setShow] = useState(false);
  const showDelete = () => setShow(false);
  const hideDelete = () => setShow(true);

  // DELETE STAFF FUNCTION
  const deleteStaff = async (usertoken) => {
    const deleteStaffData = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
      staffToken: usertoken,
    };
    console.log(usertoken);

    await axios
      .post(
        ` ${process.env.REACT_APP_UMS_BASE}/management/deleteStaff`,
        deleteStaffData
      )
      .then((res) => {
        if (res.data.success === true) {
          showDelete();
          message.success(res.data.message);
        } else {
          message.info(res.data.message);
        }
      })
      .catch((err) => {
        getStaff();
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
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      // render: (_, record) => (

      // ),
    },
  ];

  const tableData = []
  const randomColors = ['yellow', 'red', 'lightblue', 'green', 'blue', 'brown', 'cyan', 'teal']
  for (let i = 0; i < staffList.length; i++) {
    tableData.push(
      {
        key: i,
        image: <div className="StaffImgAlt" style={{ backgroundColor: randomColors[Math.floor(Math.random() * randomColors.length)] }}>{staffList[i].fname.charAt(0) + staffList[i].lname.charAt(0)}</div>,
        name: staffList[i].fname + ' ' + staffList[i].lname,
        faculty: 'Mgt Science',
        department: 'Business Admin',
        email: staffList[i].mail,
        action: <Button onClick={() => navigate('/management/staff/view/' + staffList[i].id, { state: {} })} style={{ border: 'solid 1px #1677ff', }}>
          Open
        </Button>
      }
    )
  }

  return (
    <div>
      {ploading ? (
        <AppLoader nameloader={"Staff"} loading={ploading} />
      ) : (
        <div className="MgtStaffOverview">
          <Row  justify={{xs: 'start' , sm: 'space-between'}} align={'middle'} className="TopActions">
            <h6>Staff Overview</h6>

            <div className="filter-cont">
              <Button
                icon={<Icon path={mdiFilter} size={1} />}>
                Filter
              </Button>
              <Button
                icon={<Icon path={mdiAccountMultiplePlusOutline} size={1} />}
                onClick={() => navigate("/management/staff/add")}>
                Onboard Staff
              </Button>
            </div>
          </Row>

          <Row justify={'center'}>
            <Col xs={24}>
              <Table style={{marginTop: '10px'}} className='StaffTable' scroll={{ x: '100%' }} columns={tableColumns} dataSource={tableData} />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Staff;
