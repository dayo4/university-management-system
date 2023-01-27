import React, { useState } from "react";
import Sidenav from "../../Sidenav/Sidenav";
import Topnav from "../Topnav/Topnav";
import "./Finance.scss";
import LineChart from "./Linechart/LineChart";
import { UserData } from "../../../Data";

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
    <div id="MANAGEMENT-WHOLE">
      <Sidenav />
      <div id="MARGIN-APP">
        <Topnav title={"Finance"} />

        <div id="MARGIN-UP-FIXED" className="finance-whole-cont">
          <div className="finance-stat">
            <div className="each-f-stat">
              <div className="icon-stat">
                <img src="./three.svg" alt="" />
              </div>

              <div className="stat-text">
                <p>School Fees</p>
                <h5>NGN 3,500,000</h5>
              </div>
            </div>
            <div className="each-f-stat">
              <div className="icon-stat">
                <img src="./three.svg" alt="" />
              </div>
              <div className="stat-text">
                <p>School Fees</p>
                <h5>NGN 3,500,000</h5>
              </div>
            </div>
            <div className="each-f-stat">
              <div className="icon-stat">
                <img src="./three.svg" alt="" />
              </div>
              <div className="stat-text">
                <p>School Fees</p>
                <h5>NGN 3,500,000</h5>
              </div>
            </div>
            <div className="each-f-stat">
              <div className="icon-stat">
                <img src="./three.svg" alt="" />
              </div>
              <div className="stat-text">
                <p>School Fees</p>
                <h5>NGN 3,500,000</h5>
              </div>
            </div>
          </div>
          <div className="chart-container" style={{ width: "100%" }}>
            <LineChart chartData={userData} />
          </div>{" "}
          <div className="transac-cont">
            <div className="top-transaction">
              <h1>Transaction</h1>

              <button>View all</button>
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
                  <tr className="price-rate-plus">+ NGN 125000</tr>
                </td>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
