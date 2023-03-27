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

const Expenses = () => {
  const [toggleFilter, setToggleFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [apptoken, setpptoken] = useState(process.env.REACT_APP_UMS_TOKEN);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [expenseData, setExpenseData] = useState({
    date: '',
    description: '',
    amount: '',
    department: '',
    requested_for: '',
  });
  const [expensesList, setExpensesList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getExpenses();
  }, []);

  const showModal = () => {
    setModalOpen(true);
  };
  const handleModalOk = () => {
    addNewExpense()
  };
  const handleModalCancel = () => {
    setModalOpen(false);
  };

  function createExpenseData(data/* object containing data to spread */) {
    setExpenseData({
      ...expenseData,
      ...data
    })
  }

  const getExpenses = async () => {
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
          setExpensesList([]);
        } else {
          setExpensesList(res.data.data);
          console.log(res.data);
        }
        setLoading(false);

      })

      .catch((err) => {
        setLoading(false);
      });
  };

  const addNewExpense = async () => {

    const data = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
      reason: expenseData.description,
      amount: expenseData.amount,
    };

    if (!data.reason)
      message.info('Please enter the description')
    else if (!data.amount)
      message.info('Please enter the description')
    else//
      if (!btnLoading) {
        setBtnLoading(true);

        await axios

          .post(` ${process.env.REACT_APP_UMS_BASE}/management/addExpenses`, data)

          .then((res) => {
            console.log(res);
            if (res.data.success === true) {
              message.success(res.data.message);
              getExpenses()
              setBtnLoading(false);
              setModalOpen(false);
            } else {
              setBtnLoading(false);
              message.info(`${res.data.message} Please check your input again..`);
            }
          })
          .catch((err) => {
            setBtnLoading(false);
            message.warning(err.message);
          });
      }

  };

  /*  Table Colomns  */
  const tableColumns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      className: 'Amount'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];


  return (
    <div className="FinExpsPage">
      <Row justify={{ xs: 'start', sm: 'space-between' }} align={'middle'} className="TopActions">
        <Col xs={24} sm={9} className={'ExpSearch'}>
          <Search placeholder="Search by desc..." onSearch={''} />
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
            icon={<Icon path={mdiPlusOutline} size={1} style={{ marginRight: '5px', marginBottom: '2px' }} />}
            onClick={() => showModal()}>
            Add Expense
          </Button>
        </Col>
      </Row>

      {/* Filter Conponent */}
      <Filter toggleFilter={toggleFilter} closeFilter={() => setToggleFilter(!toggleFilter)} />

      <Row justify={'center'}>
        {loading ? (
          <AppLoader loading={loading} />
        ) : (
          <Col xs={24}>
            <Table style={{ marginTop: '10px' }} scroll={{ x: '100%' }} columns={tableColumns} dataSource={
              expensesList.map((exp, i) => {
                return {
                  key: i,
                  description: exp.reason,
                  department: i < 3 ? 'Agric Science' : 'Finance',
                  amount: exp.amount,
                  date: exp.timeago.split(',')[0] + ' ago',
                  action:<div> <Icon path={mdiDeleteOutline} size={1} style={{ color: '#ff0000', cursor: 'pointer', marginRight:'25px' }}></Icon><Icon path={mdiPencilOutline} size={1} style={{ color: '#1677ff', cursor: 'pointer' }}></Icon></div>,
                }
              })
            } />
          </Col>
        )}
      </Row>

      {/* Add Expense Modal */}
      <Modal title="Add New Expense" className="CreateExpenseOpts" open={modalOpen} onOk={handleModalOk} onCancel={handleModalCancel} confirmLoading={btnLoading}>
        <Row justify={{ xs: 'center', md: 'space-around' }} >
          <Col xs={20} style={{ marginTop: '10px' }}>
            <h6>Date</h6>
            <DatePicker type='text' onChange={(date, dateString) => createExpenseData({ date: dateString })} style={{ width: '100%' }} />
          </Col>
          <Col xs={20} style={{ marginTop: '10px' }}>
            <h6>Description</h6>
            <Input type='text' onChange={(e) => createExpenseData({ description: e.target.value })} />
          </Col>
          <Col xs={20} style={{ marginTop: '10px' }}>
            <h6>Amount</h6>
            <Input type='text' onChange={(e) => createExpenseData({ amount: e.target.value })} />
          </Col>
        </Row>
        <Row justify={'center'} align={'middle'} className="ExtraOpts">
          <Col span={10} style={{
            marginRight: '5px'
          }}>
            <h6>Office</h6>
            <Select
              style={{
                width: '100%'
              }}
              onChange={''}
              defaultValue={'1'}
              options={[
                {
                  value: '1',
                  label: 'Department',
                },
              ]}
            />
          </Col>
          <Col span={10}>
            <h6>Requested For.</h6>
            <Input type='text' onChange={(e) => createExpenseData({ requested_for: e.target.value })} style={{
              width: '100%'
            }} />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default Expenses;
