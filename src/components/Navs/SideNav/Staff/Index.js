import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, Switch } from 'antd';
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
// import "./Index.scss";

const StaffSideNavLinks = () => {
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

  // const setupMenu

  const onMenuItemClick = (e) => {
    console.log('click ', e);
    setSelectedMenuItem(e.key);
  };

  // useEffect(() => {
  //   setDefaultMenuItem("/" + pathname.split('/')[2])
  //   setSelectedMenuItem(pathname)
  // })

  const navItems = [
    { icon: mdiViewDashboardOutline, name: 'Dashboard', link: '/dashboard' },
    { icon: mdiCardsOutline, name: 'Fees Management', link: '/fees' },
    { icon: mdiListBoxOutline, name: 'Attendance', link: '/attendance' },
    {
      icon: mdiBriefcaseCheckOutline, name: 'Courses', link: '/courses',
      subLinks: [
        { name: 'Create Course', link: '/courses/create' },
        { name: 'Course Outline', link: '/courses/outline' }
      ]
    },
    { icon: mdiAccountSchoolOutline, name: 'Resumption', link: '/resumption' },
    { icon: mdiChartBoxPlusOutline, name: 'Results', link: '/results' },
    { icon: mdiExitRun, name: 'Exit', link: '/exit' },
  ]

  const MainNavLinks = navItems.map(({ icon, name, link, subLinks }, i) => {
    return (

      getItem(
        <NavLink
          key={i}
          to={"/staff" + link}
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
                  to={"/staff" + link}
                  className={({ isActive }) => ("Link SubLink " + (isActive ? "active" : ""))}
                >
                  {name}
                </NavLink >
                , "/staff" + link
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
      {/* {MainNavLinks} */}

      <Menu className="LinksMenu"
        // theme={theme}
        onClick={onMenuItemClick}
        defaultOpenKeys={[defaultMenuItem]}
        selectedKeys={[selectedMenuItem]}
        mode="inline"
        items={MainNavLinks}
      />
    </div>

  );
};

export default StaffSideNavLinks;
