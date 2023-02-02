import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import NoAccess from "../InvalidAccess/noAccess";

import SideNav from "./Navs/SideNav/SideNav";
import Topnav from "./Navs/TopNav/TopNav";

/* Import students section routes */
import Dashboard from "./Dashboard/Dashboard";

const EntryPoint = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userData"));





  // if (user.acc_type === "student") {
  return (
    <div id="MANAGEMENT-WHOLE">
      <Topnav title={"Dashboard"} />
      <SideNav onTabSwitch />
      <div id="MARGIN-APP">
        <div id="MARGIN-UP-FIXED">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
          Students Home{children}
        </div>
      </div>
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
