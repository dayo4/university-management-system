import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./SideNav.scss";
import { message, Button } from "antd";
import Icon from '@mdi/react';
import {
  mdiViewDashboardOutline,
  mdiFileDocumentEditOutline,
  mdiChartLine,
  mdiAccountTieOutline,
  mdiAccountSchoolOutline,
  mdiCogTransferOutline,
  mdiLogout
} from '@mdi/js';

// IMPORTING IMAGES
import { logo, } from "../../../../static/icons"





const Sidenav = () => {
  let navigate = useNavigate();

  // LOGOUT FUNCTION
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    message.info("Logout Successful");
    navigate(`/`);
  };

  // Set necessary states
  const [isActive, setActive] = useState(false);
  const [show, setShow] = useState(true);
  const [navshow, setNavshow] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
  };


  const navItems = [
    { icon: mdiViewDashboardOutline, name: 'Dashboard', link: '/dashboard' },
    { icon: mdiFileDocumentEditOutline, name: 'Memo', link: '/memo' },
    { icon: mdiChartLine, name: 'Finance', link: '/finance' },
    { icon: mdiAccountTieOutline, name: 'Staff', link: '/staff' },
    { icon: mdiAccountSchoolOutline, name: 'Student', link: '/student' },
    { icon: mdiCogTransferOutline, name: 'Settings', link: '/Settings' },
  ]

  const MainNavLinks = navItems.map(({ icon, name, link }, i) => {
    return (
      <NavLink
        key={i}
        to={"/management" + link}
        className={({ isActive }) => ("Link " + (isActive ? "active" : ""))}
      >
        <Icon path={icon}
          title={name}
          size={1}
          className="Icon"
        />
        {name}
      </NavLink>
    )
  })

  return (
    <div>
      <div className="SideNavBtn">
        <button onClick={() => setNavshow(!navshow)}>
          <i className="bx bx-menu-alt-left"></i>
        </button>
      </div>

      <div className={"SideNavCont " + (!navshow ? "Hidden" : "")}>

        <div className="InnerSideNavBtn">
          <button onClick={() => setNavshow(!navshow)}>
            <i className="bx bx-x"></i>
          </button>
        </div>

        <section className="SideNavUpperCont">
          <div className="SideNavLogo">
            <img src={logo} alt="ums logo" />
          </div>


          <div className="SideNavLinks">
            {/*  All main nav links display here. */}
            {MainNavLinks}
          </div>
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
