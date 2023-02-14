import { useState, useEffect } from "react";
import "./Index.scss";
import Modal from "react-bootstrap/Modal";

import Inbox from "./Inbox/Index";
import AppLoader from "../../../../../Loader";
import { Button, message } from "antd";
import axios from "axios";
import "antd/dist/reset.css";
import "../../GlobalStyle.scss";
import { Tabs } from "antd";
import Icon from '@mdi/react';
import {
  mdiEmailArrowLeftOutline,
  mdiEmailArrowRightOutline,
  mdiEmailCheckOutline,
  mdiEmailOpenMultipleOutline,
  mdiPencilPlusOutline,
  mdiRefresh,
} from '@mdi/js';

// IMPORTING IMAGES
import search from "../../../../../images/search.svg";

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
    }, 1000);
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
  const tabsContent = [
    {
      key: '1',
      label:
        <div className="MemoTabsHeading">
          <Icon path={mdiEmailArrowLeftOutline}
            size={0.9}
          />
          <h6>Inbox</h6>
        </div>,
      children: <Inbox />,
    },
    {
      key: '2',
      label:
        <div className="MemoTabsHeading">
          <Icon path={mdiEmailArrowRightOutline}
            size={0.9}
          />
          <h6>Sent</h6>
        </div>,
      children: 'Sent Memos',
    },
    {
      key: '3',
      label:
        <div className="MemoTabsHeading">
          <Icon path={mdiEmailOpenMultipleOutline}
            size={0.9}
          />
          <h6>Draft</h6>
        </div>,
      children: 'Drafts',
    },
    {
      key: '4',
      label:
        <div className="MemoTabsHeading">
          <Icon path={mdiEmailCheckOutline}
            size={0.9}
          />
          <h6>Starred</h6>
        </div>,
      children: 'Starred Memos',
    },
  ];

  return (
    // <MWrapperb>
    <div >
      {/* <Sidenav /> */}
      {/* <div id="MARGIN-APP"> */}
      {/* <Topnav title={"Memo"} /> */}

      {ploading ? (
        <>
          <AppLoader nameloader={"Memo"} loading={ploading} />
        </>
      ) : (
        <>
          <div className="memo-whole-cont">
            <div className="top-memo-cont">
              <Button
                className="compose-btn"
                type="primary"
                onClick={composeShow}
              >
                Compose Message
                <Icon path={mdiPencilPlusOutline}
                  size={1}
                  style={{
                    marginLeft: '8px'
                  }}
                />
              </Button>

              <div className="memo-search-whole-cont">

                <Icon path={mdiRefresh}
                  size={1.5}
                  className={'MemoReloadIcon'}
                />

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

              {/* <div className="iginition">1-10 of 62</div> */}
            </div>
          </div>

          <Tabs defaultActiveKey="1" items={tabsContent}> </Tabs>
        </>
      )}
      {/* </div> */}

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
  );
};

export default Memo;
