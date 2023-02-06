import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./SideNav.scss";
import { message, Button } from "antd";
import Icon from '@mdi/react';
import {
  mdiViewDashboardOutline,
  mdiCardsOutline,
  mdiChartLine,
  mdiAccountTieOutline,
  mdiAccountSchoolOutline,
  mdiCogTransferOutline,
  mdiLogout,
  mdiClose,
  mdiText,
  mdiListBoxOutline,
  mdiBriefcaseCheckOutline,
  mdiChartBoxPlusOutline,
  mdiExitRun
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
    { icon: mdiCardsOutline, name: 'Fees Management', link: '/fees' },
    { icon: mdiListBoxOutline, name: 'Attendance', link: '/attendance' },
    { icon: mdiBriefcaseCheckOutline, name: 'Course Registration', link: '/courses' },
    { icon: mdiAccountSchoolOutline, name: 'Resumption', link: '/resumption' },
    { icon: mdiChartBoxPlusOutline, name: 'Results', link: '/results' },
    { icon: mdiExitRun, name: 'Exit', link: '/exit' },
  ]

  const MainNavLinks = navItems.map(({ icon, name, link }, i) => {
    return (
      <NavLink
        key={i}
        to={"/student" + link}
        state={{ bCrumb: name }}
        className={({ isActive }) => ("Link " + (isActive ? "active" : ""))}
      >
        <Icon path={icon}
          title={name}
          size={1}
          className="Icon"
        />
        {name}
      </NavLink >
    )
  })

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
