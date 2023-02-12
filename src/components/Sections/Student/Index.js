import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { Row, Col, } from 'antd';

import NoAccess from "../../InvalidAccess/noAccess";

import SideNav from "../../Navs/SideNav/Index";
import Topnav from "../../Navs/TopNav/Index";
import "./Index.scss"

/* Import students section routes */
// import Dashboard from "./SubRoutes/Dashboard/Dashboard";
import Dashboard from "./SubRoutes/Profile/Index";
import Profile from "./SubRoutes/Profile/Index";
/* Fees Mgt Routes */
import FeesManagement from "./SubRoutes/FeesManagement/Index";
import Payment from "./SubRoutes/FeesManagement/SubRoutes/Payment/Index";
import Receipts from "./SubRoutes/FeesManagement/SubRoutes/Receipts/Index";
import Complaint from "./SubRoutes/FeesManagement/SubRoutes/Complaint/Index";
/* Attendance Routes */
import Attendance from "./SubRoutes/Attendance/Index";
/* Courses Routes */
import Courses from "./SubRoutes/Courses/Index";
/* Resumption Routes */
import Resumption from "./SubRoutes/Resumption/Index";


const StudentsEntryPoint = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const { pathname } = useLocation()

  function setBreadCrumb() {
    const arr = ['dashboard']
    const current_path = pathname.split('/').slice(2)
    const BCrumb = arr.concat(current_path)

    return BCrumb.map((crumb, i) => {
      return <Link
        to={i === 0 ? "/staff/dashboard" : "/staff/" + BCrumb.slice(1, i + 1).join('/')}
        key={i}
      >
        {(i === 0 ? crumb + " " : (crumb === 'dashboard' ? "" : " / " + crumb))}
      </Link>
    })
  }

  // if (user.acc_type === "student") {
  return (
    <div id="MANAGEMENT-WHOLE">
      <Topnav title={"Dashboard"} />
      <SideNav onTabSwitch />

      <Row justify="center" id="MARGIN-APP" >
        <Col span={22} id="MARGIN-UP-FIXED">
          {/* Display Breadcrumbs or whatever it's called... */}
          <Row className="BCrumb">
            {
              setBreadCrumb()

            }
          </Row>


          <Routes>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="profile/*">
              <Route path="" element={<Profile/>} />
            </Route>
            <Route path="fees/*">
              <Route path="" element={<FeesManagement/>} />
              <Route path="payment" element={<Payment/>} />
              <Route path="receipts" element={<Receipts/>} />
              <Route path="complaint" element={<Complaint/>} />
            </Route>
            <Route path="attendance/*">
              <Route path="" element={<Attendance/>} />
            </Route>
            <Route path="courses/*">
              <Route path="" element={<Courses/>} />
            </Route>
            <Route path="exit/*">
              <Route path="" element={<Courses/>} />
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

export default StudentsEntryPoint;
