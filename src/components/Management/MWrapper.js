import React from "react";
import NoAccess from "../InvalidAccess/noAccess";
import Sidenav from "../Sidenav/Sidenav";
import Topnav from "./Topnav/Topnav";

const MWrapper = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userData"));
  if (user.acc_type === "Management") {
    return (
      <div id="MANAGEMENT-WHOLE">
        <Sidenav />
        <div id="MARGIN-APP">
          <div id="MARGIN-UP-FIXED">{children}</div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <NoAccess />
      </>
    );
  }
};

export default MWrapper;
