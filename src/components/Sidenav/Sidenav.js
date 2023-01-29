import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Sidenav.scss";
import { message, Button } from "antd";
import Icon from '@mdi/react';
import {
  mdiViewDashboardOutline,
  mdiFileDocumentEditOutline,
  mdiChartLine,
  mdiAccountTieHat,
  mdiAccountSchoolOutline,
  mdiCogTransferOutline
} from '@mdi/js';

// IMPORTING IMAGES
import { logo, } from "../../static/icons"
// import logo from "../../images/logo.svg";
// import dash from "../../images/Vector.svg";
import memo from "../../images/Vector-1.svg";
import finance from "../../images/Group 69.svg";
import staff from "../../images/Group 65.svg";





const Sidenav = () => {
  let navigate = useNavigate();

  // LOGOUT FUNCTION
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    message.info("Logout Successful");
    navigate(`/`);
  };

  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
  };

  const [show, setShow] = useState(true);
  const [navshow, setNavshow] = useState(false);

  const navItems = [
    { icon: mdiViewDashboardOutline, name: 'Dashboard', link: '/dashboard' },
    { icon: mdiFileDocumentEditOutline, name: 'Memo', link: '/memo' },
    { icon: mdiChartLine, name: 'Finance', link: '/finance' },
    { icon: mdiAccountTieHat, name: 'Staff', link: '/staff' },
    { icon: mdiAccountSchoolOutline, name: 'Student', link: '/student' },
    { icon: mdiCogTransferOutline, name: 'Settings', link: '/Settings' },
  ]

  const MainNavLinks = navItems.map(({ icon, name, link }, i) => {
    return (
      <NavLink
        key={i}
        to={"/management" + link}
        className={({ isActive }) => (isActive ? "active" : "inactive")}
      >
        <Icon path={icon}
          title={name}
          size={1.3}
          className="Icon"
        />
        {name}{" "}
      </NavLink>
    )
  })

  return (
    <div>
      <div className="btn-sidenav">
        <button onClick={() => setNavshow(!navshow)}>
          <i className="bx bx-menu-alt-left"></i>
        </button>
      </div>

      <div className={"SideNavCont " + (!navshow ? "Hidden" : "")}>
        <div className="side-logo">
          <img src={logo} alt="" />
        </div>

        <div className="inside-btn-sidenav">
          <button onClick={() => setNavshow(!navshow)}>
            <i className="bx bx-x"></i>
          </button>
        </div>

        <div className="sidenav-links">
          {/*  All main nav links display here. */}
          {MainNavLinks}
        </div>

        <div className="logout-side" onClick={(e) => logout(e)}>
          <p className="inactive">
            <img src="./side_images/Group 65.svg" alt="" />
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
