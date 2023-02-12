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
  mdiExitRun,
  mdiFileDocumentEditOutline,
  mdiChartLine,
  mdiAccountTieOutline,
  mdiCogTransferOutline
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
    { icon: mdiFileDocumentEditOutline, name: 'Memo', link: '/memo' },
    { icon: mdiChartLine, name: 'Finance', link: '/finance' },
    { icon: mdiAccountTieOutline, name: 'Staff', link: '/staff' },
    { icon: mdiAccountSchoolOutline, name: 'Student', link: '/student' },
    { icon: mdiCogTransferOutline, name: 'Settings', link: '/Settings' },
  ]

  const MainNavLinks = navItems.map(({ icon, name, link, subLinks }, i) => {
    return (

      getItem(
        <NavLink
          key={i}
          to={link ? "/management" + link : null}
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
                  to={"/management" + link}
                  className={({ isActive }) => ("Link SubLink " + (isActive ? "active" : ""))}
                >
                  {name}
                </NavLink >
                , "/management" + link
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
