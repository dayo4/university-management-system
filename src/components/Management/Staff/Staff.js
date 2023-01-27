import React, { useState, useEffect } from "react";
import Sidenav from "../../Sidenav/Sidenav";
import Topnav from "../Topnav/Topnav";
import "./Staff.scss";
import { Link } from "react-router-dom";
import AppLoader from "../../../Loader";
import { message } from "antd";
import { domData } from "../DomData";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import MWrapper from "../MWrapper";

const Staff = () => {
  const [apptoken, setpptoken] = useState(process.env.REACT_APP_UMS_TOKEN);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [listStaff, setListStaff] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);

  // PRELOADER
  const [ploading, setploading] = useState(false);

  useEffect(() => {
    getStaff();
    setploading(true);
    setTimeout(() => {
      setploading(false);
    }, 3000);
  }, []);

  // GETTING LIST OF STAFF
  const getStaff = async () => {
    const staffData = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
    };

    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/v1/listAllStaff`, staffData)
      .then((res) => {
        if (res.data.success == false) {
          setListStaff([]);
        } else {
          setListStaff(res.data.data);
        }
      })

      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          getStaff();
        }, 20000);
      });
  };

  // MODAL FUNCTION FOR DELETING STAFF
  const [show, setShow] = useState(false);
  const showDelete = () => setShow(false);
  const hideDelete = () => setShow(true);

  // DELETE STAFF FUNCTION
  const deleteStaff = async (usertoken) => {
    const deleteStaffData = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
      staffToken: usertoken,
    };
    console.log(usertoken);

    await axios
      .post(
        ` ${process.env.REACT_APP_UMS_BASE}/v1/deleteStaff`,
        deleteStaffData
      )
      .then((res) => {
        if (res.data.success === true) {
          showDelete();
          message.success(res.data.message);
        } else {
          message.info(res.data.message);
        }
      })
      .catch((err) => {
        getStaff();
      });
  };
  return (
    <MWrapper>
      <Topnav title={"Staff"} />

      {ploading ? (
        <>
          <AppLoader nameloader={"Staff"} loading={ploading} />
        </>
      ) : (
        <>
          <div className="staff-whole-cont">
            <div className="staff-top-over">
              <p>Staff Overview</p>

              <div className="filter-cont">
                <button>
                  filter <img src="./filter.svg" alt="" />
                </button>
                <Link to="/management/newstaff" className="onboard-btn">
                  Onboard Staff
                  <img src="./onboard.svg" alt="" />
                </Link>
              </div>
            </div>

            <div className="real-table-staff-cont">
              <table className="staff-table-cont" style={{ width: "100%" }}>
                <tr>
                  <th className="radiuses head-style">S/N</th>
                  <th className="head-style">Department</th>
                  <th className="head-style">Name</th>
                  {/* <th className="head-style">Level</th> */}
                  <th className="head-style">Email Address</th>
                  <th className="head-style"></th>
                  <th className="radiuses2 head-style"></th>
                </tr>

                {/* listStaff */}
                {listStaff?.map((data) => {
                  const {
                    store,
                    fname,
                    price,
                    description,
                    img,
                    dept,
                    size,
                    mail,
                    level,
                    usertoken,
                  } = data;
                  return (
                    <>
                      <tr className="staff-table-each ">
                        <td className="bbb">
                          <img src="./userimg.svg" alt="" />
                        </td>
                        <td className="item-style bbb">{dept}</td>
                        <td className="item-style bbb">{fname}</td>
                        {/* <td className="item-style bbb">{price}</td> */}
                        <td className="item-style bbb">{mail}</td>

                        <td className="delete bbb" onClick={hideDelete}>
                          <img src="./delete.svg" alt="" />
                          Delete
                        </td>

                        {/* MODAL FOR DELETING */}
                        <Modal
                          show={show}
                          onHide={showDelete}
                          backdrop="static"
                          keyboard={false}
                          centered
                        >
                          <Modal.Body>
                            <div className="delete-staff-modal-cont">
                              <p>
                                You are about to delete this staff, are you
                                sure?
                              </p>

                              <div
                                className="delete-btn-staff"
                                onClick={() => deleteStaff(usertoken)}
                              >
                                Delete
                              </div>
                              <div
                                className="cancel-btn-staff"
                                onClick={showDelete}
                              >
                                Cancel
                              </div>
                            </div>
                          </Modal.Body>
                        </Modal>

                        <td className="view bbb">
                          <Link to={`/management/Editstaff/${usertoken}`}>
                            <img src="./view.svg" alt="" />
                            Edit
                          </Link>
                        </td>
                      </tr>
                    </>
                  );
                })}

                {/* <tr className="staff-table-each ">
                  <td className="bbb">
                    <img src="./userimg.svg" alt="" />
                  </td>
                  <td className="item-style bbb">One</td>
                  <td className="item-style bbb">Two</td>
                  <td className="item-style bbb">Three</td>
                  <td className="item-style bbb">Four</td>

                  <td className="delete bbb" onClick={hideDelete}>
                    <img src="./delete.svg" alt="" />
                    Delete
                  </td>

                  <td className="view bbb">
                    <Link to="/management/Editstaff">
                      <img src="./view.svg" alt="" />
                      Edit
                    </Link>
                  </td>
                </tr> */}
              </table>
            </div>
          </div>

          {/* MODAL FOR DELETE STAFF */}
        </>
      )}
    </MWrapper>
  );
};

export default Staff;
