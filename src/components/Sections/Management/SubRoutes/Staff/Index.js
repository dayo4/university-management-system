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
  const [listStaff, setListStaff] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);

  // PRELOADER
  const [ploading, setploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // getStaff();
    setploading(true);
    setTimeout(() => {
      setploading(false);
    }, 500);
  }, []);

  // GETTING LIST OF STAFF
  const getStaff = async () => {
    const staffData = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
    };

    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/general/listAllStaffs`, staffData)
      .then((res) => {
        console.log(res)
        if (res.data.success == false) {
          setListStaff([]);
        } else {
          console.log(res.data.data)
          setListStaff(res.data.data);
        }
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
        ` ${process.env.REACT_APP_UMS_BASE}/v1/deleteStaff`,
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
      key: 'action',
      render: (_, record) => (
        <Button style={{ border: 'solid 1px #4B4DED',  }}>
          Open
        </Button>
      ),
    },
  ];

  const tableData = []
  const randomColors = ['yellow', 'red', 'lightblue', 'green', 'blue', 'brown', 'cyan', 'teal']
  for (let i = 0; i < 90; i++) {
    tableData.push(
      {
        key: i,
        image: <div className="StaffImgAlt" style={{ backgroundColor: randomColors[Math.floor(Math.random() * randomColors.length)] }}>AM</div>,
        name: 'Adeola Mercy',
        department: 'Business Admin',
        level: '11',
        email: 'adeola@rand.com',
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
            <h6>Staff Overview</h6>

            <div className="filter-cont">
              <Button
                icon={<Icon path={mdiFilter} size={1} />}>
                Filter
              </Button>
              <Button
                icon={<Icon path={mdiAccountMultiplePlusOutline} size={1} />}
                onClick={()=>navigate("/management/staff/add")}>
                Onboard Staff
              </Button>
            </div>
          </Row>

          <Row justify={'center'}>
            <Col xs={24}>
              <Table className='StaffTable' columns={tableColumns} dataSource={tableData} />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Staff;
