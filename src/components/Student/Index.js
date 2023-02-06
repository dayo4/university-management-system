import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Row, Col, } from 'antd';

import NoAccess from "../InvalidAccess/noAccess";

import SideNav from "./Navs/SideNav/SideNav";
import Topnav from "./Navs/TopNav/TopNav";
import "./Index.scss"

/* Import students section routes */
// import Dashboard from "./SubRoutes/Dashboard/Dashboard";
import Dashboard from "./SubRoutes/Profile/Profile";
import Profile from "./SubRoutes/Profile/Profile";
/* Fees Mgt Routes */
import FeesManagement from "./SubRoutes/FeesManagement/Index";
import Payment from "./SubRoutes/FeesManagement/SubRoutes/Payment/Index";
import Receipts from "./SubRoutes/FeesManagement/SubRoutes/Receipts/Index";
import Complaint from "./SubRoutes/FeesManagement/SubRoutes/Complaint/Index";
/* Attendance Routes */
import Attendance from "./SubRoutes/Attendance/Index";
import Courses from "./SubRoutes/Courses/Index";

const EntryPoint = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userData"));

  const { pathname, state } = useLocation()

  // if (user.acc_type === "student") {
  return (
    <div id="MANAGEMENT-WHOLE">
      <Topnav title={"Dashboard"} />
      <SideNav onTabSwitch />
      <Row justify="center" id="MARGIN-APP" >
        <Col span={22} id="MARGIN-UP-FIXED">
          {/* Display Breadcrumbs or whatever it's called... */}
          {state && (pathname != '/student' && pathname != '/student/' && pathname != '/student/dashboard')
            ?
            <Row className="BCrumb">
              {"Dashboard / " + state.bCrumb}
            </Row>
            :
            state && (pathname === '/student/dashboard')
              ?
              <Row className="BCrumb">
                {"Dashboard"}
              </Row>
              :
              ""
          }


          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="profile/*">
              <Route path="" element={<Profile />} />
            </Route>
            <Route path="fees/*">
              <Route path="" element={<FeesManagement />} />
              <Route path="payment" element={<Payment />} />
              <Route path="receipts" element={<Receipts />} />
              <Route path="complaint" element={<Complaint />} />
            </Route>
            <Route path="attendance/*">
              <Route path="" element={<Attendance />} />
            </Route>
            <Route path="courses/*">
              <Route path="" element={<Courses />} />
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
