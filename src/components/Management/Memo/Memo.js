import React, { useState, useEffect } from "react";
import Sidenav from "../../Sidenav/Sidenav";
import Topnav from "../Topnav/Topnav";
import "./Memo.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Inbox from "./Inbox/Inbox";
import AppLoader from "../../../Loader";
import { message } from "antd";
import axios from "axios";
import "antd/dist/reset.css";
import "../GlobalStyle.scss";
import { Tabs } from "antd";
import MWrapperb from "../MWrapperb";


// IMPORTING IMAGES
import draft from "../../../images/draft.svg";
import sent from "../../../images/sent.svg";
import inbox from "../../../images/inbox.svg";
import spam from "../../../images/spam.svg";
import onboard from "../../../images/onboard.svg";
import idk from "../../../images/idk.svg";
import refresh from "../../../images/refresh.svg";
import search from "../../../images/search.svg";





const { TabPane } = Tabs;

const Memo = () => {
  const [loading, setLoading] = useState(false);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [memo, setMemo] = useState("");
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [apptoken, setpptoken] = useState(process.env.REACT_APP_UMS_TOKEN);

  // PRELOADER
  const [ploading, setploading] = useState(false);

  useEffect(() => {
    setploading(true);
    setTimeout(() => {
      setploading(false);
    }, 3000);
  }, []);

  // LOGIN HANDLE
  const sendMemo = async (e) => {
    e.preventDefault();
    setLoading(true);

    const memoData = {
      apptoken: apptoken,
      To: to,
      Subject: subject,
      Memo: memo,
      usertoken: userData.usertoken,
    };

    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/v1/sendMemo`, memoData)
      .then((res) => {
        if (res.data.success === true) {
          message.success(res.data.message);
          setLoading(false);
          setMemo("");
          setTo("");
          setSubject("");
          composeClose();
        } else {
          setLoading(false);
          message.info(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        message.warning(err.message);
      });
  };

  // TAB DECLEARATION
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  // COMPOSE MESSAGE MODAL
  const [show, setShow] = useState(false);
  const composeClose = () => setShow(false);
  const composeShow = () => setShow(true);

  // TAB CONTENTS
  const Inboxg = () => {
    return (
      <div className="tab-custom">
        <img src={inbox} alt="" />
        <h6>Inbox</h6>
      </div>
    );
  };

  const Sent = () => {
    return (
      <div className="tab-custom">
        <img src={sent} alt="" />
        <h6>Sent</h6>
      </div>
    );
  };

  const Draft = () => {
    return (
      <div className="tab-custom">
        <img src={draft} alt="" />
        <h6>Draft</h6>
      </div>
    );
  };

  const Starred = () => {
    return (
      <div className="tab-custom">
        <img src={sent} alt="" />
        <h6>Starred</h6>
      </div>
    );
  };

  const Spam = () => {
    return (
      <div className="tab-custom">
        <img src={spam} alt="" />
        <h6>Spam</h6>
      </div>
    );
  };

  return (
    <MWrapperb>
      <div id="MANAGEMENT-WHOLE">
        <Sidenav />
        <div id="MARGIN-APP">
          <Topnav title={"Memo"} />

          {ploading ? (
            <>
              <AppLoader nameloader={"Memo"} loading={ploading} />
            </>
          ) : (
            <>
              <div id="MARGIN-UP-FIXED" className="memo-whole-cont">
                <div className="top-memo-cont">
                  <button
                    className="compose-btn"
                    variant="primary"
                    onClick={composeShow}
                  >
                    Compose Message
                    <img src={onboard} alt="" />
                  </button>

                  <div className="memo-search-whole-cont">
                    <img className="raddradd" src={idk} alt="" />

                    <img className="raddradd" src={refresh} alt="" />

                    <form
                      className="search-memo-cont"
                      autoCorrect="on"
                      autoComplete="on"
                    >
                      <button>
                        <img src={search} alt="" />
                      </button>
                      <input type="text" placeholder="Search..." required />
                    </form>
                  </div>

                  <div className="iginition">1-10 of 62</div>
                </div>
              </div>

              <Tabs defaultActiveKey="1">
                <TabPane tab={Inboxg()} key="1">
                  <Inbox />
                </TabPane>

                <TabPane tab={Sent()} key="2">
                  Content of Tab Pane 2
                </TabPane>

                <TabPane tab={Draft()} key="3">
                  Content of Tab Pane 3
                </TabPane>

                <TabPane tab={Starred()} key="4">
                  Content of Tab Pane 3
                </TabPane>

                <TabPane tab={Spam()} key="5">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>
            </>
          )}
        </div>

        <div className="modal-compose-cont">
          <Modal show={show} onHide={composeClose} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>Compose Message</Modal.Title>
            </Modal.Header>

            <div className="compose-select-cont">
              <select
                className="compose-select"
                name=""
                id=""
                onChange={(e) => setTo(e.target.value)}
              >
                <option value="">To: </option>

                <option value="All">To: All</option>
                <option value="Students">To: Students</option>
                <option value="Staff">To: Staff</option>
              </select>
            </div>

            {/* <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">To:</Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <input
                  type="radio"
                  name="to"
                  value={to}
                  onChange={(e) => setTo("All")}
                />
                <p>All</p>
              </Dropdown.Item>
              <Dropdown.Item>
                <input
                  type="radio"
                  name="to"
                  value={to}
                  onChange={(e) => setTo("Student")}
                />
                <p>Students</p>
              </Dropdown.Item>
              <Dropdown.Item>
                <input
                  type="radio"
                  name="to"
                  value={to}
                  onChange={(e) => setTo("Admin")}
                />
                <p>Admin</p>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}

            <div className="subject">
              <p>Subject</p>
              <input
                type="text"
                placeholder="Write subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <Modal.Body>
              <textarea
                name=""
                id=""
                cols="20"
                rows="8"
                placeholder="Write message..."
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              ></textarea>
            </Modal.Body>
            <Modal.Footer>
              <button className="close-compose" onClick={composeClose}>
                Cancle
              </button>
              <button className="send-compose" onClick={(e) => sendMemo(e)}>
                Send
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </MWrapperb>
  );
};

export default Memo;
