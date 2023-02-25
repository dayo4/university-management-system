import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu } from "antd";
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
  const { pathname } = useLocation()
  const [selectedMenuItem, setSelectedMenuItem] = useState(pathname);
  const [defaultMenuItem, setDefaultMenuItem] = useState("/" + pathname.split('/')[2]);


  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const onMenuItemClick = (e) => {
    console.log('click ', e);
    setSelectedMenuItem(e.key);
  };

  const navItems = [
    { icon: mdiViewDashboardOutline, name: 'Dashboard', link: '/dashboard' },
    {
      icon: mdiCardsOutline, name: 'Fees Management', link: '/fees',
      subLinks: [
        { name: 'Payment', link: '/fees/payment' },
        { name: 'Receipts', link: '/fees/receipts' },
        { name: 'Complaint', link: '/fees/complaint' },
      ]
    },
    { icon: mdiListBoxOutline, name: 'Attendance', link: '/attendance' },
    {
      icon: mdiBriefcaseCheckOutline, name: 'Courses',/*  link: '/courses', */
      subLinks: [
        { name: 'Registration', link: '/courses' },
      ]
    },
    { 
      icon: mdiAccountSchoolOutline, name: 'Resumption',/*  link: '/resumption' */
      subLinks: [
        { name: 'Resumption Forms', link: '/resumption' },
      ]
    },
    { 
      icon: mdiChartBoxPlusOutline, name: 'Results',/*  link: '/results'  */
      subLinks: [
        { name: 'History', link: '/results/history' },
      ]
    },
    { icon: mdiExitRun, name: 'Exit', link: '/exit' },
  ]

  const MainNavLinks = navItems.map(({ icon, name, link, subLinks }, i) => {
    return (

      getItem(
        <NavLink
          key={i}
          to={link ? "/student" + link : null}
          className={({ isActive }) => ("Link " + (isActive && !subLinks ? "active" : ""))}
        >
          <Icon path={icon}
            title={name}
            size={1}
            className="Icon"
          />
          {name}
        </NavLink >
        , link, null,
        function () {
          if (subLinks) {
            const subs = []
            subLinks.forEach(({ link, name }, j) => {
              subs.push(getItem(
                <NavLink
                  key={link + j}
                  to={"/student" + link}
                  className={({ isActive }) => ("Link SubLink " + (isActive ? "active" : ""))}
                >
                  {name}
                </NavLink >
                , "/student" + link
              ))
            })
            return subs
          }
          else return null
        }()
      )

    )
  })

  return (

    <div className="SideNavLinks">

      <Menu className="LinksMenu"
        onClick={onMenuItemClick}
        defaultOpenKeys={[defaultMenuItem]}
        selectedKeys={[selectedMenuItem]}
        mode="inline"
        items={MainNavLinks}
      />
    </div>

  );

};

export default StudentsSideNavLinks;
