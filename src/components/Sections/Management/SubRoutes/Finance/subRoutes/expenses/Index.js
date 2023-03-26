import { useState } from "react";
import "./Index.scss";
import Icon from '@mdi/react';
import {
  mdiAccountSchoolOutline,
  mdiAccountTieOutline,
  mdiArrowBottomRight,
  mdiArrowTopRight,
  mdiCheckUnderline,
  mdiChiliOffOutline,
  mdiDelete,
  mdiDeleteOutline,
  mdiFilterOutline,
  mdiPlusOutline,
} from '@mdi/js';
import { Button, Col, Row, Table, Input } from "antd";

import Filter from '@/components/globalComponents/Filter'
const { Search } = Input;

const Expenses = () => {
  const [toggleFilter, setToggleFilter] = useState(false);


  /*  Table Colomns  */
  const tableColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: true
    },
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
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const tableData = []
  for (let i = 1; i < 10; i++) {
    tableData.push(
      {
        key: i,
        date: '10/02/2023',
        description: 'Fuel Purchase to buses',
        department: i < 5 ? 'Agric Science' : 'Finance',
        amount: <span>#{i * 1000}</span>,
        action: <Icon path={mdiDeleteOutline} size={1} style={{ color: '#ff0000', cursor:'pointer' }}></Icon>,
      }
    )
  }

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
            icon={<Icon path={mdiPlusOutline} size={1} style={{ marginRight: '5px' }} />}
            onClick={() => navigate("/management/finance/add-expenses")}>
            Add Expense
          </Button>
        </Col>
      </Row>

      {/* Filter Conponent */}
      <Filter toggleFilter={toggleFilter} closeFilter={() => setToggleFilter(!toggleFilter)} />

      <Row justify={'center'}>
        <Col xs={24}>
          <Table style={{ marginTop: '10px' }} className='DSHBTable' scroll={{ x: '100%' }} columns={tableColumns} dataSource={tableData} />
        </Col>
      </Row>
    </div>
  );
};

export default Expenses;
