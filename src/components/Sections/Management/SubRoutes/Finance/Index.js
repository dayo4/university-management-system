import { useState } from "react";
import "./Index.scss";
import LineChart from "./Linechart/LineChart";
import { UserData } from "../../../Data";
import Icon from '@mdi/react';
import {
  mdiAccountSchoolOutline, 
  mdiAccountTieOutline, 
  mdiArrowBottomRight, 
  mdiArrowTopRight,
  mdiCheckUnderline,
  mdiChiliOffOutline,
} from '@mdi/js';
import { Button, Col, Row, Table } from "antd";

const Finance = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Income",
        data: UserData.map((data) => data.userGain),
        backgroundColor: ["#4EBFEE"],
        border: "none",
        borderColor: "#4EBFEE",
        borderWidth: 4,
        cubicInterpolationMode: "monotone",
        responsive: "true",
        font: {
          size: 12,
          family: "Work Sans",
        },
      },

      {
        label: "Expenses",
        data: UserData.map((data) => data.userLost),
        backgroundColor: ["#FFC7E3"],
        border: "none",
        borderColor: "#FFC7E3",
        borderWidth: 4,
        cubicInterpolationMode: "monotone",
        responsive: "true",

        font: {
          size: 12,
          family: "Work Sans",
        },
      },
    ],
  });

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
    ];
  
    const tableData = []
    for (let i = 1; i < 10; i++) {
      tableData.push(
        {
          key: i,
          date: '10/02/2023',
          description: i < 5 ?  'Fuel Purchase to buses':'Income from ramdom stuffs' ,
          department: i < 5 ? 'Agric Science' : 'Finance',
          amount: i < 5 ? <span style={{ color: '#ff0000' }}>#{i * 1000}</span> : <span style={{ color: '#04a204' }}>#{i * 1500}</span>,
        }
      )
    }
    
  return (

    <div className="finance-whole-cont">
      <Row justify={{xs:'start', md:'space-between'}} align={'middle'} className="StatsSummary_F">
        <Col xs={12} md={5} className="Summary1">
          <div className="Icon">
            <Icon path={mdiCheckUnderline}
              size={1}
            />
          </div>
          <div className="Text">
            <p>Paid Fees</p>
            <h5>150,000,000</h5>
          </div>
        </Col>

        <Col xs={12} md={5} className="Summary2">
          <div className="Icon">
          <Icon path={mdiChiliOffOutline}
              size={1}
            />
          </div>
          <div className="Text">
            <p>Outstanding Fees</p>
            <h5>30,000,000</h5>
          </div>
        </Col>

        <Col xs={12} md={5} className="Summary3">
          <div className="Icon">
          <Icon path={mdiArrowTopRight}
              size={1}
            />
          </div>
          <div className="Text">
            <p>Revenues</p>
            <h5>NGN 30,500,000</h5>
          </div>
        </Col>

        <Col xs={12} md={5} className="Summary4">
          <div className="Icon">
          <Icon path={mdiArrowBottomRight}
              size={1}
            />
          </div>
          <div className="Text">
            <p>Expenses</p>
            <h5>NGN 3,500,000</h5>
          </div>
        </Col>
      </Row>
      <div className="chart-container" style={{ width: "100%" }}>
        <h5 className="SectionSubHeading">Statistics</h5>
        <LineChart chartData={userData} />
      </div>{" "}
      <div className="transac-cont">
        <div className="top-transaction">
          <h5 className="SectionSubHeading">Transactions</h5>

          <Button>View all</Button>
        </div>

        <Row justify={'center'}>
          <Col xs={24}>
            <Table style={{ marginTop: '10px' }} className='DSHBTable' scroll={{ x: '100%' }} columns={tableColumns} dataSource={tableData} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Finance;
