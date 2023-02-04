import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { Row, Col, } from 'antd';

import NoAccess from "../InvalidAccess/noAccess";

import SideNav from "./Navs/SideNav/SideNav";
import Topnav from "./Navs/TopNav/TopNav";

/* Import students section routes */
import Dashboard from "./SubRoutes/Dashboard/Dashboard";
/* Fees Mgt Routes */
import FeesManagement from "./SubRoutes/FeesManagement/Index";
import Payment from "./SubRoutes/FeesManagement/SubRoutes/Payment/Index";
import Receipts from "./SubRoutes/FeesManagement/SubRoutes/Receipts/Index";
import Complaint from "./SubRoutes/FeesManagement/SubRoutes/Complaint/Index";
/* Attendance Routes */
import Attendamce from "./SubRoutes/Attendance/Index";

const EntryPoint = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userData"));





  // if (user.acc_type === "student") {
  return (
    <div id="MANAGEMENT-WHOLE">
      <Topnav title={"Dashboard"} />
      <SideNav onTabSwitch />
      <Row justify="center" id="MARGIN-APP" >
        <Col span={22} id="MARGIN-UP-FIXED">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="fees/*">
              <Route path="" element={<FeesManagement />} />
              <Route path="payment" element={<Payment />} />
              <Route path="receipts" element={<Receipts />} />
              <Route path="complaint" element={<Complaint />} />
            </Route>
            <Route path="attendance/*">
              <Route path="" element={<Attendamce />} />
            </Route>
          </Routes>
        </Col>
      </Row>
    </div>
  );
  // } else {
  //   return (
  //     <>
  //       <NoAccess />
  //     </>
  //   );
  // }
};

export default EntryPoint;
