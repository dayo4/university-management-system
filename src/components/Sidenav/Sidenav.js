import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Sidenav.scss";
import { message, Button } from "antd";

// IMPORTING IMAGES
import logo from "../../images/logo.svg";
import dash from "../../images/Vector.svg";
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

  return (
    <div>
      <div className="btn-sidenav">
        <button onClick={() => setNavshow(!navshow)}>
          <i className="bx bx-menu-alt-left"></i>
        </button>
      </div>

      <div className={navshow ? "sidenav-cont" : "noSidenav-cont"}>
        <div className="side-logo">
          <img src={logo} alt="" />
        </div>

        <div className="inside-btn-sidenav">
          <button onClick={() => setNavshow(!navshow)}>
            <i className="bx bx-x"></i>
          </button>
        </div>

        <div className="sidenav-links">
          <NavLink
            to="/management/dashboard"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <img src={dash} alt="" />
            Dashboard{" "}
          </NavLink>

          <br />

          <NavLink
            to="/management/memo"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <img src={memo} alt="" />
            Memo{" "}
          </NavLink>

          <br />

          <NavLink
            to="/management/finance"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <img src={finance} alt="" />
            Finance
          </NavLink>

          <br />

          <NavLink
            to="/management/staff"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <img src={staff}alt="" />
            Staff{" "}
          </NavLink>

          <br />

          <NavLink
            to="/management/student"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <img src="./side_images/side1.svg" alt="" />
            Students{" "}
          </NavLink>

          <br />

          <NavLink
            to="/management/settings"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <img src="./side_images/side1.svg" alt="" />
            Settings{" "}
          </NavLink>
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
