import React from "react";
import NoAccess from "../InvalidAccess/noAccess";
import Sidenav from "../Sidenav/Sidenav";
import Topnav from "./Topnav/Topnav";

const MWrapperb = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userData"));
  if (user.acc_type === "Management") {
    return (
      <div>
          <div>{children}</div>
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

export default MWrapperb;
