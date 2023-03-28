import { useState, useEffect, useRef } from "react";
import "./Index.scss";
import Modal from "react-bootstrap/Modal";

import Inbox from "./Inbox/Index";
import Draft from "./Draft/Index";
import AppLoader from "../../../../../Loader";
import { Button, Col, message, Row } from "antd";
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
  const [saveBtnLoading, setSaveBtnLoading] = useState(false);
  const [draftBtnLoading, setDraftBtnLoading] = useState(false);

  useEffect(() => {

  }, []);

  const InboxRef = useRef()
  const DraftRef = useRef()

  function refreshMemos() {
    InboxRef.current.refreshMemos()
    DraftRef.current.refreshMemos()
  }
  // LOGIN HANDLE
  async function useMemo(action) {

    if (!saveBtnLoading && !draftBtnLoading) {
      action === 'send' ? setSaveBtnLoading(true) : setDraftBtnLoading(true);

      const memoData = {
        apptoken: apptoken,
        To: to,
        subject: subject,
        memo: memo,
        usertoken: userData.usertoken,
      };

      await axios
        .post(`${process.env.REACT_APP_UMS_BASE}/management/` + (action === 'send' ? 'sendMemo' : 'saveMemoToDraft'), memoData)
        .then((res) => {
          console.log(res)
          action === 'send' ? setSaveBtnLoading(false) : setDraftBtnLoading(false);

          if (res.data.success === true) {
            message.success(action === 'send' ? res.data.message : 'Message has been saved to draft');
            setMemo("");
            setTo("");
            setSubject("");
            composeClose();
            action === 'send' ? InboxRef.current.refreshMemos() : DraftRef.current.refreshMemos()

          } else {
            message.info(res.data.message);
          }
        })
        .catch((err) => {
          action === 'send' ? setSaveBtnLoading(false) : setDraftBtnLoading(false);
          console.log(err);
          message.warning(err.message);
        });
    }

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
      children: <Inbox ref={InboxRef} />,
    },
    {
      key: '2',
      label:
        <div className="MemoTabsHeading">
          <Icon path={mdiEmailOpenMultipleOutline}
            size={0.9}
          />
          <h6>Draft</h6>
        </div>,
      children: <Draft ref={DraftRef} />,
    },
    {
      key: '3',
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
    <div >

      {ploading ? (
        <>
          <AppLoader nameloader={"Memo"} loading={ploading} />
        </>
      ) : (
        <>
            <Row justify={{ xs: 'start', sm: 'space-between' }} className={'MemoTopActionCont'}>

              <Col xs={24} sm={12} className="memo-search-whole-cont">
                <Button
                  className="compose-btn"
                  type="primary"
                  onClick={composeShow}
                >
                  Compose
                  <Icon path={mdiPencilPlusOutline}
                    size={1}
                    style={{
                      marginLeft: '8px'
                    }}
                  />
                </Button>

                <Icon path={mdiRefresh}
                  size={1.5}
                  onClick={refreshMemos}
                  className={'MemoReloadIcon'}
                />
              </Col>
              <Col xs={24} sm={12} className="memo-search-whole-cont">

                <form
                  className="search-memo-cont"
                  autoCorrect="on"
                  autoComplete="on"
                >
                  <button>
                    <img src={search} alt="Search" />
                  </button>
                  <input type="text" placeholder="Search..." required />
                </form>
              </Col>
            </Row>

          <Tabs defaultActiveKey="1" items={tabsContent} className='MemoTabsMain'> </Tabs>
        </>
      )}

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
              <option value="Staffs">To: Staff</option>
            </select>
          </div>

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
            <Button className="close-compose" onClick={composeClose}>
              Cancle
            </Button>
            <Button loading={saveBtnLoading} type="primary" className="" onClick={() => useMemo('send')}>
              Send
            </Button>
            <Button loading={draftBtnLoading} type="primary" className="" onClick={() => useMemo('saveDraft')}>
              Draft
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Memo;
