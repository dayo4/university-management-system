import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import "./Uploads.scss";
import { message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Uploads = () => {
  const [editprofile, seteditprofile] = useState(true);
  const [listDepartment, setListDepartment] = useState([]);
  const [levelList, setlevelList] = useState([]);
  const [listFaculty, setListFaculty] = useState([]);
  const [apptoken, setpptoken] = useState(process.env.REACT_APP_UMS_TOKEN);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
    const [faculty, setFaculty] = useState("");

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const [addLevel, setAddLevel] = useState("");
  const [addFaculty, setAddFaculty] = useState("");
  const [addDepartment, setAddDepartment] = useState("");
  const [loading, setLoading] = useState(false);

  //   MODAL FUNCTION FOR LEVEL
  const showLevel = () => setShow(false);
  const hideLevel = () => setShow(true);
  //   MODAL FUNCTION FOR FACULTIES
  const showFaculty = () => setShow2(false);
  const hideFaculty = () => setShow2(true);
  //   MODAL FUNCTION FOR DEPARTMENTS
  const showDepartments = () => setShow3(false);
  const hideDepartments = () => setShow3(true);

  // PRE LOADER LOADING STYLE
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  //   const clickedit = () => {
  //     seteditprofile(false);
  //   };

  useEffect(() => {
    getLevel();
    getFaculty();
    getDepartment();
  }, []);

  // ADDING LEVEL
  const postLevel = async (e) => {
    e.preventDefault();
    setLoading(true);

    const addLevelData = {
      apptoken: apptoken,
      level: addLevel,
      usertoken: userData.usertoken,
    };

    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/v1/addLevel`, addLevelData)
      .then((res) => {
        if (res.data.success === true) {
          message.success(res.data.message);
          setLoading(false);
          showLevel();
        } else {
          setLoading(false);
          showLevel();
          message.info(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        message.warning(err.message);
      });
  };

  // ADDING DEPARTMENT
  const postDepartment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const addLevelData = {
      apptoken: apptoken,
      dept: addDepartment,
      usertoken: userData.usertoken,
      facultyid: faculty,
    };

    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/v1/addDept`, addLevelData)
      .then((res) => {
        if (res.data.success === true) {
          message.success(res.data.message);
          setLoading(false);
          showDepartments();
        } else {
          setLoading(false);
          showDepartments();
          message.info(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        message.warning(err.message);
      });
  };

  // ADDING FACULTY
  const postFaculty = async (e) => {
    e.preventDefault();
    setLoading(true);

    const addFacultyData = {
      apptoken: apptoken,
      faculty: addFaculty,
      usertoken: userData.usertoken,
    };

    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/v1/addFaculty`, addFacultyData)
      .then((res) => {
        if (res.data.success === true) {
          message.success(res.data.message);
          setLoading(false);
          showFaculty();
          setAddFaculty("");
        } else {
          setLoading(false);
          showFaculty();
          setAddFaculty("");
          message.info(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        message.warning(err.message);
      });
  };

  // GETTING LIST OF FACULTIES
  const getFaculty = async () => {
    const facultyData = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
    };

    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/v1/listFaculties`, facultyData)
      .then((res) => {
        if (res.data.success == false) {
          setListFaculty([]);
        } else {
          setListFaculty(res.data);
        }
      })

      .catch((err) => {
        console.log(err);
      });
  };

  // GETTING LIST OF LEVELS
  const getLevel = async () => {
    const levelData = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
    };

    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/v1/listLevels`, levelData)
      .then((res) => {
        if (res.data.success == false) {
          setlevelList([]);
        } else {
          setlevelList(res.data);
        }
      })

      .catch((err) => {
        console.log(err);
      });
  };

  // GETTING LIST OF DEPARTMEMT
  const getDepartment = async () => {
    const levelData = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
    };

    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/v1/listDepts`, levelData)
      .then((res) => {
        if (res.data.success == false) {
          setListDepartment([]);
        } else {
          setListDepartment(res.data);
        }
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="email-pass-pro-cont">
        <div className="change-email-as">
          <div className="pro-edit-top-as">
            <h6>List of Levels</h6>
            <a to="/" onClick={hideLevel}>
              <img src="./edit.svg" alt="" />
              Add
            </a>
          </div>
          <div className="box-details-as">
            <p>
              Change your name Change your nameChange your nameChange your
              nameChange your nameChange your nameChange your nameChange your
              name
            </p>
          </div>
        </div>

        <div className="change-pass-as">
          <div className="pro-edit-top-as">
            <h6>List of Faculties</h6>
            <a to="/" onClick={hideFaculty}>
              <img src="./edit.svg" alt="" />
              Add
            </a>
          </div>
          <div className="box-details-as">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum
              tenetur quis rerum pariatur blanditiis. Sapiente natus
              reprehenderit vero laudantium totam!
            </p>
          </div>
        </div>
      </div>

      <div className="email-pass-pro-cont">
        <div className="change-email-as">
          <div className="pro-edit-top-as">
            <h6>List of Department</h6>
            <a to="/" onClick={hideDepartments}>
              <img src="./edit.svg" alt="" />
              Add
            </a>
          </div>
          <div className="box-details-as">
            <p>
              Change your name Change your nameChange your nameChange your
              nameChange your nameChange your nameChange your nameChange your
              name
            </p>
          </div>
        </div>
      </div>

      {/* MODAL FOR ADDING LEVEL */}
      <Modal
        show={show}
        onHide={showLevel}
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Body>
          <div className="add-upload-modal-cont">
            <p>Add a new level</p>

            <input
              type="text"
              value={addLevel}
              onChange={(e) => setAddLevel(e.target.value)}
              required
            />
            <div className="btn-cont-add-uploads">
              {loading === true ? (
                <>
                  <div className="add-btn-upload-load disabled">
                    Addding... <Spin checked={loading} indicator={antIcon} />
                  </div>
                </>
              ) : (
                <>
                  <div className="add-btn-upload" onClick={(e) => postLevel(e)}>
                    Add{" "}
                  </div>
                </>
              )}

              <div className="cancel-btn-upload" onClick={showLevel}>
                Cancel
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* MODAL FOR ADDING FACULTIES */}
      <Modal
        show={show2}
        onHide={showFaculty}
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Body>
          <div className="add-upload-modal-cont">
            <p>Add a new Faculty</p>

            <input
              type="text"
              value={addFaculty}
              onChange={(e) => setAddFaculty(e.target.value)}
              required
            />
            <div className="btn-cont-add-uploads">
              {loading === true ? (
                <>
                  <div className="add-btn-upload-load disabled">
                    Addding... <Spin checked={loading} indicator={antIcon} />
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="add-btn-upload"
                    onClick={(e) => postFaculty(e)}
                  >
                    Add{" "}
                  </div>
                </>
              )}

              <div className="cancel-btn-upload" onClick={showFaculty}>
                Cancel
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* MODAL FOR ADDING DEPARTMENT */}
      <Modal
        show={show3}
        onHide={showDepartments}
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Body>
          <div className="add-upload-modal-cont">
            <p>Add a new Department</p>

            <select name="" id="" onChange={(e) => setFaculty(e.target.value)}>
              <option value=""> -- Select Faculty -- </option>

              {listFaculty?.map((listFaculty) => {
                const { id, faculty } = listFaculty;
                return (
                  <>
                    <option value={id}>{faculty}</option>
                  </>
                );
              })}
            </select>

            <input
              type="text"
              value={addDepartment}
              onChange={(e) => setAddDepartment(e.target.value)}
              required
            />
            <div className="btn-cont-add-uploads">
              {loading === true ? (
                <>
                  <div className="add-btn-upload-load disabled">
                    Addding... <Spin checked={loading} indicator={antIcon} />
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="add-btn-upload"
                    onClick={(e) => postDepartment(e)}
                  >
                    Add{" "}
                  </div>
                </>
              )}

              <div className="cancel-btn-upload" onClick={showDepartments}>
                Cancel
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Uploads;
