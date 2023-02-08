import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Row, Col, } from 'antd';

import NoAccess from "../InvalidAccess/noAccess";

import SideNav from "../Navs/SideNav/Index";
import Topnav from "../Navs/TopNav/Index";
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

  useEffect(() => {

  })
  
  const { pathname } = useLocation()
  const [BreadCrumb, setBreadCrumb] = useState('')

  // if (user.acc_type === "student") {
  return (
    <div id="MANAGEMENT-WHOLE">
      <Topnav title={"Dashboard"} />
      <SideNav onTabSwitch />

      <Row justify="center" id="MARGIN-APP" >
        <Col span={22} id="MARGIN-UP-FIXED">
          {/* Display Breadcrumbs or whatever it's called... */}
          {pathname != '/student' && pathname != '/student/' && pathname != '/student/dashboard'
            ?
            <Row className="BCrumb">
              {"Dashboard / " + BreadCrumb}
            </Row>
            :
            pathname === '/student/dashboard'
              ?
              <Row className="BCrumb">
                {"Dashboard"}
              </Row>
              :
              ""
          }


          <Routes>
            <Route path="/dashboard" element={<Dashboard setBreadCrumb={() => setBreadCrumb('')} />} />
            <Route path="profile/*">
              <Route path="" element={<Profile setBreadCrumb={() => setBreadCrumb('Student Profile')} />} />
            </Route>
            <Route path="fees/*">
              <Route path="" element={<FeesManagement setBreadCrumb={() => setBreadCrumb('Fees Management')} />} />
              <Route path="payment" element={<Payment setBreadCrumb={() => setBreadCrumb('Fees Management / Payment')} />} />
              <Route path="receipts" element={<Receipts setBreadCrumb={() => setBreadCrumb('Fees Management / Receipts')} />} />
              <Route path="complaint" element={<Complaint setBreadCrumb={() => setBreadCrumb('Fees Management / Complaint')} />} />
            </Route>
            <Route path="attendance/*">
              <Route path="" element={<Attendance setBreadCrumb={() => setBreadCrumb('Attendance')} />} />
            </Route>
            <Route path="courses/*">
              <Route path="" element={<Courses setBreadCrumb={() => setBreadCrumb('Courses')} />} />
            </Route>
            <Route path="exit/*">
              <Route path="" element={<Courses setBreadCrumb={() => setBreadCrumb('Exit')} />} />
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
