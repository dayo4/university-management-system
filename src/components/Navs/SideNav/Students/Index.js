import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import "./Index.scss";
// import { message } from "antd";
import Icon from '@mdi/react';
import {
  mdiViewDashboardOutline,
  mdiCardsOutline,
  mdiAccountSchoolOutline,
  mdiListBoxOutline,
  mdiBriefcaseCheckOutline,
  mdiChartBoxPlusOutline,
  mdiExitRun
} from '@mdi/js';




const StudentsSideNavLinks = () => {
  // Set necessary states
  // const [isActive, setActive] = useState(false);

  // const handleToggle = () => {
  //   setActive(!isActive);
  // };


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

          <div className="SideNavLinks">
            {MainNavLinks}
          </div>
  );
};

export default StudentsSideNavLinks;
