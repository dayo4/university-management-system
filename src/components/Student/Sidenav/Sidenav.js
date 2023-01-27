import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Sidenav.scss";
import { message, Button } from "antd";


const Sidenav = () => {



  // LOGOUT FUNCTION
    const logout = (e) => {
      e.preventDefault();
      localStorage.clear();
      message.info("Logout Successful");
      window.location.reload(true);
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
          <img src="./logo.svg" alt="" />
        </div>

        <div className="inside-btn-sidenav">
          <button onClick={() => setNavshow(!navshow)}>
            <i className="bx bx-x"></i>
          </button>
        </div>

        <div className="sidenav-links">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <img src="./side_images/Vector.svg" alt="" />
            Dashboard{" "}
          </NavLink>

          <br />

          <NavLink
            to="/memo"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <img src="./side_images/Vector-1.svg" alt="" />
            Memo{" "}
          </NavLink>

          <br />

          <NavLink
            to="/finance"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <img src="./side_images/Group 69.svg" alt="" />
            Finance
          </NavLink>

          <br />

          <NavLink
            to="/staff"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <img src="./side_images/Group 69.svg" alt="" />
            Staff{" "}
          </NavLink>

          <br />

          <NavLink
            to="/student"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <img src="./side_images/side1.svg" alt="" />
            Students{" "}
          </NavLink>

          <br />

          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <img src="./side_images/side1.svg" alt="" />
            Settings{" "}
          </NavLink>
        </div>

        <div className="logout-side" onClick={(e) => logout(e)} >
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
