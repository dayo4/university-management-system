import { useState, useEffect } from "react";

import "./Index.scss";
import { Link, useNavigate } from "react-router-dom";
import AppLoader from "../../../../../Loader";
import { Button, Col, message, Row, Table, Input } from "antd";
import axios from "axios";
import {
  mdiAccountMultiplePlusOutline,
  mdiCheckAll,
  mdiFilter,
  mdiFilterOutline
} from '@mdi/js';
import Icon from "@mdi/react";

import Filter from '@/components/globalComponents/Filter'
const { Search } = Input;

const Staff = () => {
  const [apptoken, setpptoken] = useState(process.env.REACT_APP_UMS_TOKEN);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [staffList, setStaffList] = useState([]);
  const [toggleFilter, setToggleFilter] = useState(false);

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
    setploading(true);

    await axios
      .post(`${process.env.REACT_APP_UMS_BASE}/general/listAllStaffs`, staffData)
      .then((res) => {
        if (res.data.success == false) {
          message.error('unable to get data!')
        } else {
          console.log(res.data.data)
          const randomColors = ['yellow', 'red', 'lightblue', 'green', 'blue', 'brown', 'cyan', 'teal']
          const studs = res.data.data
          const tableData =
            studs.map((stud) => {
              return {
                key: stud.id,
                // image: <div className="StaffImgAlt" style={{ backgroundColor: randomColors[Math.floor(Math.random() * randomColors.length)] }}>{stud.fname.charAt(0) + stud.lname.charAt(0)}</div>,
                name: <div className="StaffNameCont"><div className="StaffImgAlt" style={{ backgroundColor: randomColors[Math.floor(Math.random() * randomColors.length)] }}>{stud.fname.charAt(0) + stud.lname.charAt(0)}</div><div>{stud.fname + ' ' + stud.lname}</div></div>,
                faculty: 'Mgt Science',
                department: 'Business Admin',
                email: stud.mail,
                action: <Button onClick={() => navigate('/management/staff/view/' + stud.id, { state: {} })} style={{ border: 'solid 1px #1677ff', }}>
                  Open
                </Button>
              }
            })

          localStorage.setItem('staffList', JSON.stringify(res.data.data));
          setStaffList(tableData);
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
    // {
    //   // title: 'Image',
    //   dataIndex: 'image',
    //   key: 'image',
    // },
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

  return (
    <div className="MgtStaffOverview">
      <Row justify={{ xs: 'start', sm: 'space-between' }} align={'middle'} className="TopActions">
        <Col xs={24} sm={9} className={'StaffSearch'}>
          <Search placeholder="Search by name..." onSearch={''} />
        </Col>
        <Col xs={24} sm={14} className="BtnsWrapper">
          <Button
            onClick={() => setToggleFilter(!toggleFilter)}
            className="FilterBtn"
            icon={<Icon path={mdiFilterOutline} size={1} />}
          >
            Filter
          </Button>
          <Button
            className="PlusBtn"
            icon={<Icon path={mdiAccountMultiplePlusOutline} size={1} style={{ marginRight: '5px' }} />}
            onClick={() => navigate("/management/staff/add")}>
            Add Staff
          </Button>
        </Col>
      </Row>

      {/* Filter Conponent */}
      <Filter toggleFilter={toggleFilter} closeFilter={() => setToggleFilter(!toggleFilter)} />

      <Row justify={'center'} className={'StaffTableCont'}>
        {ploading ? (
          <AppLoader loading={ploading} />
        ) : (
          <Col xs={24}>
            <Table style={{ marginTop: '10px' }} className='StaffTable' scroll={{ x: '100%' }} columns={tableColumns} dataSource={staffList} />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Staff;
