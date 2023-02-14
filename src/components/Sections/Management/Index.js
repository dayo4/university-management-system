import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { Row, Col, } from 'antd';

import NoAccess from "../../InvalidAccess/noAccess";

import SideNav from "../../Navs/SideNav/Index";
import Topnav from "../../Navs/TopNav/Index";
import "./Index.scss"

/* Import management section routes */
import Dashboard from "./SubRoutes/Dashboard/Index";
import Memo from "./SubRoutes/Memo/Index";
import Finance from "./SubRoutes/Finance/Index";
/* Import staff management subRoutes */
import Staff from "./SubRoutes/Staff/Index";
import AddStaff from "./SubRoutes/Staff/subRoutes/AddStaff/Index";
// import EditStaff from "./SubRoutes/Staff/subRoutes/EditStaff/Index";
/* Import staff management subRoutes */
import Student from "./SubRoutes/Student/Index";
import AddStudent from "./SubRoutes/Student/subRoutes/AddStudent/Index";

import Settings from "./SubRoutes/Settings/Index";
import Profile from "./SubRoutes/Profile/Index";


const ManagementEntryPoint = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const { pathname } = useLocation()

  function setBreadCrumb() {
    const arr = ['dashboard']
    const current_path = pathname.split('/').slice(2)
    const BCrumb = arr.concat(current_path)

    return BCrumb.map((crumb, i) => {
      return <Link
        to={i === 0 ? "/management/dashboard" : "/management/" + BCrumb.slice(1, i + 1).join('/')}
        key={i}
      >
        {(i === 0 ? crumb + " " : (crumb === 'dashboard' ? "" : " / " + crumb))}
      </Link>
    })
  }

  // if (user.acc_type === "management") {
  return (
    <div id="MANAGEMENT-WHOLE">
      <Topnav title={"Dashboard"} />
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
            <Route path="/memo" element={<Memo />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="staff/*">
              <Route path="overview" element={<Staff />} />
              <Route path="add" element={<AddStaff />} />
              {/* <Route path="edit" element={<EditStaff />} /> */}
            </Route>
            <Route path="student/*">
              <Route path="overview" element={<Student />} />
              <Route path="add" element={<AddStudent />} />
            </Route>
            <Route path="/settings" element={<Settings />} />
            <Route path="profile/*">
              <Route path="" element={<Profile />} />
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

export default ManagementEntryPoint;
