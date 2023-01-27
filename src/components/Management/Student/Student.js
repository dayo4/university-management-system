import React, { useState, useEffect } from "react";
import Sidenav from "../../Sidenav/Sidenav";
import Inbox from "../Memo/Inbox/Inbox";
import Topnav from "../Topnav/Topnav";
import Request from "./Requests/Request";
import axios from "axios";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import "./Student.scss"

// IMPORTING IMAGES
import inboxm from "../../../images/inbox.svg";
import sent from "../../../images/sent.svg";
import onboard from "../../../images/onboard.svg";


const { TabPane } = Tabs;


const Student = () => {
  // TAB DECLEARATION
  const [toggleState, setToggleState] = useState(1);
  const [getStudent, setGetStudent] = useState([]);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [apptoken, setpptoken] = useState(process.env.REACT_APP_UMS_TOKEN);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    listStudent();
  }, []);

  // GETTING LIST OF STUDENTS
  const listStudent = async () => {
    const staffData = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
    };

    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/v1/listAllStudents`, staffData)
      .then((res) => {
        if (res.data.success == false) {
          setGetStudent([]);
        } else {
          setGetStudent(res.data);
        }
      })

      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          listStudent();
        }, 20000);
      });
  };

  // TAB CONTENTS
  const Inboxg = () => {
    return (
      <div className="tab-custom">
        <img src={inboxm}alt="" />
        <h6>Student profile</h6>
      </div>
    );
  };

  const Sent = () => {
    return (
      <div className="tab-custom">
        <img src={sent} alt="" />
        <h6>Requests</h6>
      </div>
    );
  };

  const Draft = () => {
    return (
        <Link to="/management/addstudent" className="add-std-btn">
          Add Student
          <img src={onboard} alt="" />
        </Link>
    );
  };

  return (
    <div id="MANAGEMENT-WHOLE">
      <Sidenav />
      <div id="MARGIN-APP">
        <Topnav title={"Students"} />
        <div id="MARGIN-UP-FIXED" className="student-whole-cont">
          <div className="memo-tabs-whole">
            <Tabs defaultActiveKey="1">
                <TabPane tab={Inboxg()} key="1">
                  <div className="real-table-staff-cont">
                    <table
                      className="staff-table-cont"
                      style={{ width: "100%" }}
                    >
                      <tr>
                        <th className="radiuses head-style">S/N</th>
                        <th className="head-style">Department</th>
                        <th className="head-style">Name</th>
                        <th className="head-style">Level</th>
                        <th className="head-style">Email Address</th>
                        <th className="head-style"></th>
                        <th className="radiuses2 head-style"></th>
                      </tr>

                      {getStudent?.map((data) => {
                      const { store, level, fname, mail, img, size } =
                        data;
                      return (
                        <>
                      <tr className="staff-table-each ">
                        <td className="bbb">
                          <img src="./stafficon.svg" alt="" />
                        </td>
                        <td className="item-style bbb">Physics</td>
                        <td className="item-style bbb">{fname}</td>
                        <td className="item-style bbb">{level}</td>
                        <td className="item-style bbb">{mail}</td>

                        <td className="delete bbb">
                          <img src="./delete.svg" alt="" />
                          Delete
                        </td>

                        <td className="view bbb">
                          <img src="./view.svg" alt="" />
                          view
                        </td>
                      </tr>
                      </>
                      );
                    })}
                    </table>
                  </div>{" "}
                </TabPane>

                <TabPane tab={Sent()} key="2">
                  <Request />
                </TabPane>

              <TabPane className="Ojaa" tab={Draft()} key="3" style={{float:"right", border: "2px solid red !important"}}></TabPane>
            </Tabs>
            {/* <div className="bloc-tabs">
              <button
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}
              >
                <img src="./inbox.svg" alt="" />
                Student profile{" "}
              </button>
              <button
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(2)}
              >
                <img src="./sent.svg" alt="" />
                Requests{" "}
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
