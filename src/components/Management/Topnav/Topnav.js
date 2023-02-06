import React, { useRef, useState, useEffect } from "react";
import Icon from '@mdi/react';
import {
  mdiBell,
  mdiClose,
  mdiAccountCircle,
  mdiAccountDetailsOutline,
  mdiAccountBoxMultipleOutline,
  mdiLogout
} from '@mdi/js';
import { Input, Popover, Divider, Button, Row, Col, message } from 'antd';
const { Search } = Input;
import "./TopNav.scss";
import { useNavigate, useParams } from "react-router-dom";
import { logo2 } from "../../../static/icons"

const Topnav = (props) => {
  // const heading = useParams();
  // const [labb, setlabb] = useState(heading);
  const navigate = useNavigate();


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


  // LOGOUT FUNCTION
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    message.info("Logout Successful");
    navigate(`/`);
  };


  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 767) {
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

          <h5 className="Heading">
            <img className="Logo" src={logo2} alt="ums logo" />
            {props.title}
          </h5>

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
            {/* Notifications */}
            <Popover
              placement="bottomRight"
              className="NotiIcon"
              content={
                <Row justify={"center"} className="NavNotifPopoverContent">
                  <Col span={24}>
                    <h6 className="Header">
                      Your Notifications
                    </h6>
                    <section className="Notifs">
                      <div className="Notif">
                        <p>There will be holiday starting from...</p>
                      </div>
                      <div className="Notif">
                        <p>There will be holiday starting from...</p>
                      </div>
                      <div className="Notif">
                        <p>There will be holiday starting from...</p>
                      </div>
                      <div className="Notif">
                        <p>There will be holiday starting from...</p>
                      </div>
                      <div className="Notif">
                        <p>There will be holiday starting from...</p>
                      </div>
                    </section>
                  </Col>
                </Row>
              } trigger="click">
              <Icon path={mdiBell}
                size={1.1}
                title="Notifications"
              />
              <i className="Dot"></i>
            </Popover>

            {/* User Profile */}
            <Popover className="Profile" placement="bottomRight" title={
              <Divider plain style={{ color: "#8C8CA2", paddingTop: '10px' }} ><b>Student</b></Divider>
            } content={
              <Row dir="colomn" justify={"space-between"} className="NavUserPopoverContent">
                <Col span={24}>
                  <Button onClick={() => navigate('/student/profile', { state: { bCrumb: "Student Profile" } })} icon={
                    <Icon path={mdiAccountDetailsOutline}
                      size={1}
                    />
                  }>
                    Profile
                  </Button>
                  <Button onClick={()=> navigate('/student/dashboard')} icon={
                    <Icon path={mdiAccountBoxMultipleOutline}
                      size={1}
                    />
                  }>
                    Switch Account
                  </Button>
                </Col>
                <Col span={24}>
                  <Button onClick={(e) => logout(e)} icon={
                    <Icon path={mdiLogout}
                      size={1}
                    />
                  }>
                    Logout
                  </Button>
                </Col>
              </Row>
            } trigger="click">
              <Icon path={mdiAccountCircle}
                size={1.4}
                className="Icon"
                title="User"
              />
              {/* <img src="./userimg.svg" alt="" /> */}

              <div className="Details">
                <h6>Afolabi Hassan</h6>
                <small>Student</small>
              </div>
            </Popover>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Topnav;
