import React, { useRef, useState, useEffect } from "react";
import Icon from '@mdi/react';
import {
  mdiBell,
  mdiClose,
  mdiAccountCircle
} from '@mdi/js';
import { Input, Popover, Divider } from 'antd';
const { Search } = Input;
import "./TopNav.scss";
import { useParams } from "react-router-dom";

const Topnav = (props) => {
  // const heading = useParams();
  // const [labb, setlabb] = useState(heading);

  // search
  const [show, setShow] = useState(true);
  const [navshow, setNavshow] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [mobileScreen, setMobileScreen] = useState(false);
  const [searching, setsearching] = useState(false);

  // Setup Component methods
  function onSearch() {
    // If its currently a mobile display, first click expands the search box. Otherwise just start the search function.
    if (mobileScreen && !showMobileSearch) {
      setShowMobileSearch(true)
    }
    else {
      setsearching(true)
      setTimeout(() => {
        setsearching(false)

      }, 2000)
    }
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 575) {
        setMobileScreen(true)
      }
      else {
        setMobileScreen(false)
        setShowMobileSearch(false)
      }
    }
    handleResize()

    window.addEventListener("resize", handleResize)
  })

  return (
    <div id="MANAGEMENT-WHOLE">

      <section className="TopNavWrapper">
        <div className="TopNavCont">
          <h5 className="Heading">{props.title}</h5>

          {/* SEARCH BAR */}
          <div className={"SearchBar " + (mobileScreen && !showMobileSearch ? "SmallScreen" : "SmallScreenSearch")}>
            <Search className="Input" placeholder="Search" loading={searching} enterButton onSearch={onSearch}
            />
            <Icon path={mdiClose}
              onClick={() => setShowMobileSearch(false)}
              size={1.2}
              title="close"
              className={mobileScreen && showMobileSearch ? "CloseIcon" : "HideCloseIcon"}
            />
          </div>

          {/* USER PROFILE AREA */}
          <div className="UserNotification">
            <div className="NotiIcon">
              <Icon path={mdiBell}
                size={1.1}
                title="Notifications"
              />
              <i className="Dot"></i>
            </div>

            <Popover className="Profile" placement="bottomRight" title={
              <Divider plain><b>Admin</b></Divider>
            } content={
              <div className="Details">
                <p>Profile</p>
                <p>user@gmail.com</p>
              </div>
            } trigger="click">
              <Icon path={mdiAccountCircle}
                size={1.4}
                className="Icon"
                title="User"
              />
              {/* <img src="./userimg.svg" alt="" /> */}

              <div className="Details">
                <h6>Admin</h6>
                <small>user@gmail.com</small>
              </div>
            </Popover>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Topnav;
