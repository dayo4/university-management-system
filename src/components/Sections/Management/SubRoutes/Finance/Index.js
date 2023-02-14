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
import { Button, Col, Row } from "antd";

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
          <h5 className="SectionSubHeading">Expenses</h5>

          <Button>View all</Button>
        </div>

        <div className="transaction-data">
          <table className="transaction-data">
            <td className="you-must">
              <th>Data</th>
              <th>Description</th>
              <th>Department</th>
              <th>Total</th>
            </td>

            <td className="td-transaction">
              <tr>25/01/2022</tr>
              <tr>
                Fuel Purchase to buses <p>11:30am</p>
              </tr>
              <tr>Computer Science</tr>
              <tr className="price-rate-minus" >- NGN 8000</tr>
            </td>

            <td className="td-transaction">
              <tr>25/01/2022</tr>
              <tr>
                Fuel Purchase to buses <p>11:30am</p>
              </tr>
              <tr>Computer Science</tr>
              <tr className="price-rate-minus" >- NGN 8000</tr>
            </td>

            <td className="td-transaction">
              <tr>25/01/2022</tr>
              <tr>
                Fuel Purchase to buses <p>11:30am</p>
              </tr>
              <tr>Computer Science</tr>
              <tr className="price-rate-minus" >- NGN 8000</tr>
            </td>

            <td className="td-transaction">
              <tr>25/01/2022</tr>
              <tr>
                Fuel Purchase to buses <p>11:30am</p>
              </tr>
              <tr>Computer Science</tr>
              <tr className="price-rate-plus">+ NGN 125000</tr>
            </td>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Finance;
