import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { Row, Col, } from 'antd';

import NoAccess from "../InvalidAccess/noAccess";

import SideNav from "./Navs/SideNav/SideNav";
import Topnav from "./Navs/TopNav/TopNav";

/* Import students section routes */
import Dashboard from "./SubRoutes/Dashboard/Dashboard";

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
