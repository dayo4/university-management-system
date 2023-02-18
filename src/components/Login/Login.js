import React, { useState, useEffect } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
// import logo from "logo.svg"
import axios from "axios";
import { message, Button } from "antd";
import "antd/dist/reset.css";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import NoAccess from "../InvalidAccess/noAccess";

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [apptoken, setpptoken] = useState(process.env.REACT_APP_UMS_TOKEN);
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [loginSuccess, setLoginSuccess] = useState(false);

  // PRE LOADER LOADING STYLE
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  // ALL USE EFFECT

  // LOGIN HANDLE
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      apptoken: apptoken,
      mail: email,
      pword: password,
    };

    // ROUTING FUNCTION FOR AUTH

    const authUser = () => {
      const user = JSON.parse(localStorage.getItem("userData"));
      if (user.acc_type === "management") {
        navigate(`/management/dashboard`);
      } else if (user.acc_type === "staff") {
        navigate(`/staff
         /dashboard`);
      } else if (user.acc_type === "student") {
        navigate(`/student/dashboard`);
      } else {
        return <NoAccess />;
      }
    };

    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/general/login`, data)
      .then((res) => {
        console.log(res.data)
        if (res.data.success === true) {
          message.success(res.data.message);
          setLoading(false);
          localStorage.setItem("userData", JSON.stringify(res.data));
          authUser();
        } else {
          setLoading(false);
          message.info(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        message.warning(err.message);
      });
  };

  //  CHECKING  IF USER IS LOGGED IN OR NOT

  const authUser2 = () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user.acc_type === "management") {
      navigate(`/management/dashboard`);
    } else if (user.acc_type === "staff") {
      navigate(`/staff
         /dashboard`);
    } else if (user.acc_type === "student") {
      navigate(`/student/dashboard`);
    } else {
      return <NoAccess />;
    }
  };



  const dataIn = () => {
    if (loggedIn === null) {
      setLoginSuccess(false);
    } else if (loggedIn.success === true) {
      setLoginSuccess(true);
      console.log(loggedIn);
      authUser2();
    } else {
      setLoginSuccess(false);
    }
  };

  useEffect(() => {
    dataIn();
  }, []);

  // END

  // TOOGLE PASSWORD
  const [view, setView] = useState(false);

  const toogleView = (e) => {
    if (view == false) {
      setView(true);
    } else setView(false);
  };

  return (
    <>
      {loginSuccess ? (
        <>{/* {authUser()} */}</>
      ) : (
        <>
          <div className="login-cont">
            <div className="login-left">
              <div className="logo-login">
                <img src="./logo2.svg" alt="" />
                <h6>
                  UNIVERSITY <br /> MANAGEMENT SYSTEM
                </h6>
              </div>

              <p> ....Learning and honor is best</p>
            </div>

            <div className="login-right" aria-autocomplete="on">
              <form action="">
                <h1>Login</h1>

                <div className="email-login">
                  <p>Email</p>
                  <input
                    type="email"
                    placeholder="abcdefghijklmn@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="password-login">
                  <p>Password</p>
                  <div className="password-eye">
                    <input
                      className="agidi-form"
                      type={view ? "text" : "password"}
                      placeholder="****************"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    <i
                      onClick={(e) => toogleView()}
                      className={view ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
                    ></i>
                  </div>
                </div>

                <Link to="/" className="forgot-password">
                  {" "}
                  Forgot password?{" "}
                </Link>

                {loading === true ? (
                  <>
                    {" "}
                    <button
                      className="btn-login disabled"
                    // onClick={(e) => handleLogin(e)}
                    >
                      {" "}
                      Please wait...{" "}
                      <Spin checked={loading} indicator={antIcon} />
                    </button>
                  </>
                ) : (
                  <>
                    {" "}
                    <button
                      className="btn-login"
                      onClick={(e) => handleLogin(e)}
                    >
                      {" "}
                      Login
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
