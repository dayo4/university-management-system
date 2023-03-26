import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Link, useNavigate } from "react-router-dom";
import { Row, Col, } from 'antd';

import NoAccess from "../../InvalidAccess/noAccess";

import SideNav from "../../Navs/SideNav/Index";
import Topnav from "../../Navs/TopNav/Index";
import "./Index.scss"

/* Import students section routes */
import Dashboard from "./SubRoutes/Profile/Index";
import Profile from "./SubRoutes/Profile/Index";
/* Fees Mgt Routes */
/* Attendance Routes */
import Attendance from "./SubRoutes/Attendance/Index";
/* Courses Routes */
import Courses from "./SubRoutes/Courses/Index";
import CreateCourses from "./SubRoutes/Courses/SubRoutes/Create/Index";
import CoursesOutline from "./SubRoutes/Courses/SubRoutes/Outline/Index";
/* Assessments Routes */
// import Assessments from "./SubRoutes/Assessments/Index";
import CreateAssessments from "./SubRoutes/Assessments/SubRoutes/Create/Index";
import ReviewAssessments from "./SubRoutes/Assessments/SubRoutes/Review/Index";
/* Resumption Routes */
// import Resumption from "./SubRoutes/Resumption/Index";

import { ChangeTopNavTitle } from "@/components/UtilFunctions"


const StaffEntryPoint = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const { pathname } = useLocation()

  useEffect(() => {
    if(!userData /* || userData.acc_type != "staff"  */){
      navigate("/")
      message.info("You Must Login To Continue..")
    }
  }, []);

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

  return (
    <div id="MANAGEMENT-WHOLE">
      <Topnav title={ChangeTopNavTitle()} />
      <SideNav />

      <Row justify="center" id="MARGIN-APP" >
        <Col span={22} id="MARGIN-UP-FIXED">
          {/* Display Breadcrumbs or whatever it's called... */}
          <Row className="BCrumb">
            {
              setBreadCrumb()
            }
          </Row>



          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="profile/*">
              <Route path="" element={<Profile />} />
            </Route>
            <Route path="attendance/*">
              <Route path="" element={<Attendance />} />
            </Route>
            <Route path="courses/*">
              <Route path="overview" element={<Courses />} />
              <Route path="create" element={<CreateCourses />} />
              <Route path="outline" element={<CoursesOutline />} />
            </Route>
            <Route path="assessments/*">
              <Route path="create" element={<CreateAssessments />} />
              <Route path="review" element={<ReviewAssessments />} />
            </Route>
          </Routes>


        </Col>
      </Row>
    </div>
  );
};

export default StaffEntryPoint;
