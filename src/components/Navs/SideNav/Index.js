import React, { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Index.scss";
import { message, Button } from "antd";
import Icon from '@mdi/react';
import {
  mdiLogout,
  mdiClose,
  mdiText,
} from '@mdi/js';

// IMPORTING IMAGES
import logo from "../../../images/logo.svg"

import ManagementSideNavLinks from "./management/Index"
import StaffSideNavLinks from "./Staff/Index"
import StudentsSideNavLinks from "./Students/Index"
import { ShowBasedOnAccType } from "../../UtilFunctions";

const Sidenav = () => {
  let navigate = useNavigate();
  const { pathname } = useLocation()

  // Set necessary states
  const [navshow, setNavshow] = useState(false);

  // LOGOUT FUNCTION
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    message.info("Logout Successful");
    navigate(`/`);
  };

  return (
    <div>
      <Icon className="SideNavBtn"
        path={mdiText}
        onClick={() => setNavshow(!navshow)}
        style={{ marginRight: '3px' }}
        size={1.3}
      />

      <div className={"SideNavCont " + (!navshow ? "Hidden" : "")}>

        <Icon
          className="InnerSideNavBtn"
          path={mdiClose} onClick={() => setNavshow(!navshow)}
          style={{ marginRight: '3px' }}
          size={1.3}
        />

        <section className="SideNavUpperCont">
          <div className="SideNavLogo">
            <img src={logo} alt="ums logo" />
          </div>

          {/*  All main nav links display here. */}
          {ShowBasedOnAccType({
            mgt: <ManagementSideNavLinks onRouteSwitch={()=> setNavshow(false)} />,
            staff: <StaffSideNavLinks onRouteSwitch={()=> setNavshow(false)} />,
            student: <StudentsSideNavLinks onRouteSwitch={()=> setNavshow(false)} />
          })}

        </section>

        <div className="Logout" onClick={(e) => logout(e)}>
          <Icon path={mdiLogout}
            size={1}
            className="Icon"
          />
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
