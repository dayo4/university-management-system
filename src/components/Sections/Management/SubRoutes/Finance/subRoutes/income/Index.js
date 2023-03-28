import { useEffect, useState } from "react";
import "./Index.scss";
import Icon from '@mdi/react';
import {
  mdiDeleteOutline,
  mdiFileEdit,
  mdiFilterOutline,
  mdiPencilOutline,
  mdiPlusOutline,
} from '@mdi/js';
import { Button, Col, Row, Table, Input, DatePicker, Modal, Select, message } from "antd";

import AppLoader from "@/Loader";
import Filter from '@/components/globalComponents/Filter'
import axios from "axios";
const { Search } = Input;

const Income = () => {
  const [toggleFilter, setToggleFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apptoken, setpptoken] = useState(process.env.REACT_APP_UMS_TOKEN);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  const [incomeList, setIncomeList] = useState([
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  ]);

  useEffect(() => {
    // getIncome();
  }, []);

  const getIncome = async () => {
    const expData = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
      session: '2022/2023'
    };
    setLoading(true);

    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/management/listExpenses`, expData)
      .then((res) => {
        if (res.data.success === false) {
          setIncomeList([]);
        } else {
          setIncomeList(res.data.data);
          console.log(res.data);
        }
        setLoading(false);

      })

      .catch((err) => {
        setLoading(false);
      });
  };

  /*  Table Colomns  */
  const tableColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Student Id',
      dataIndex: 'student_id',
      key: 'student_id',
    },
    {
      title: 'Faculty',
      dataIndex: 'faculty',
      key: 'faculty',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Payment Status',
      dataIndex: 'payment_status',
      key: 'payment_status',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
  ];


  return (
    <div className="FinIncPage">
      <Row justify={{ xs: 'start', sm: 'space-between' }} align={'middle'} className="TopActions">
        <Col xs={24} sm={9} className={'IncSearch'}>
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
          {/* <Button
            className="PlusBtn"
            icon={<Icon path={mdiPlusOutline} size={1} style={{ marginRight: '5px', marginBottom: '2px' }} />}
            onClick={() => showModal()}>
            Add Expense
          </Button> */}
        </Col>
      </Row>

      {/* Filter Conponent */}
      <Filter toggleFilter={toggleFilter} closeFilter={() => setToggleFilter(!toggleFilter)} />

      <Row justify={'center'}>
        {loading ? (
          <AppLoader loading={loading} />
        ) : (
          <Col xs={24}>
            <Table style={{ marginTop: '10px' }} scroll={{ x: '100%' }} columns={tableColumns} className={'FinIncTable'} dataSource={
              incomeList.map((exp, i) => {
                return {
                  key: i,
                  date: '26/03/2023',
                  name: 'Anika Madison',
                  student_id: 'YT647829',
                  faculty: 'Mgt Science',
                  department: 'Finance',
                  payment_status: <div className="PaymentStatus">{i % 2 === 0 ? <span style={{ color: '#007F00', backgroundColor:'#CDFFCD' }}>completed</span> : <span style={{ color: '#D30000', backgroundColor:'#FFE0E0' }}>part</span>} </div>,
                  amount: i % 2 === 0 ? 'NGN 23000' : 'NGN 10000',
                  balance: i % 2 === 0 ? '-' : 'NGN 13000'
                }
              })
            } />
          </Col>
        )}
      </Row>

    </div>
  );
};

export default Income;
