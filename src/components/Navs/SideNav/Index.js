import React, { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Index.scss";
import { message, Button, Select, Row, Col } from "antd";
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

const Sidenav = ({ }) => {
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

  function action() {
    console.log('kf')
    setNavshow(false)
  }
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

          <Row justify={'center'} align={'middle'} className="SideNavOpts">
            <Col style={{
              marginRight: '5px'
            }}>
              <h6>Session</h6>
              <Select
                style={{
                  width: '100%'
                }}
                onChange={''}
                defaultValue={'1'}
                options={[
                  {
                    value: '1',
                    label: '2021/2022',
                  },
                  {
                    value: '2',
                    label: '2022/2023',
                  },
                ]}
              />
            </Col>
            <Col>
              <h6>Semmester</h6>
              <Select
                style={{
                  width: '100%'
                }}
                onChange={''}
                defaultValue={'1'}
                options={[
                  {
                    value: '1',
                    label: '1st',
                  },
                  {
                    value: '2',
                    label: '2nd',
                  },
                ]}
              />
            </Col>
          </Row>

          {/*  All main nav links disp   e. */}
          {ShowBasedOnAccType({
            mgt: <ManagementSideNavLinks onRouteSwitch={action} />,
            staff: <StaffSideNavLinks onRouteSwitch={action} />,
            student: <StudentsSideNavLinks onRouteSwitch={action} />
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
