import React, { useState, useEffect } from "react";
import Sidenav from "../../../Sidenav/Sidenav";
import Topnav from "../../Topnav/Topnav";
import "./AddStudent.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { message, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

// IMPORTING IMAGES
import backarrow from "../../../../images/backarrow.svg";

const AddStudent = () => {
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [faculty, setFaculty] = useState("");
  const [level, setLevel] = useState("");
  const [password, setPassword] = useState("");
  const [apptoken, setpptoken] = useState(process.env.REACT_APP_UMS_TOKEN);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [loading, setLoading] = useState(false);
  const [levelList, setlevelList] = useState([]);
  const [listFaculty, setListFaculty] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);
  const [phase1, setPhase1] = useState(true);
  const [phase2, setPhase2] = useState(false);

  // PRE LOADER LOADING STYLE
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  // MY USE EFFECTS
  useEffect(() => {
    getLevel();
    getFaculty();
    // getDepartment();
  }, []);

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

  // END

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
        // console.log(err);
      });
  };

  // END

  // GETTING LIST OF DEPARTMEMT
  const getDepartment = async (e) => {
    setFaculty(e);

    const levelData = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
      facultyid: e,
    };

    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/v1/listDepts`, levelData)
      .then((res) => {
        if (res.success == false) {
          setListDepartment([]);
          console.log(listDepartment);
        } else {
          setListDepartment(res.data.data);
        }
      })

      .catch((err) => {
        // console.log(err);
      });
  };

  // END

  // ADDING NEW STUDENT
  const addingNewStudent = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
      fname: name,
      lname: name,
      levelid: level,
      mname: name,
      phone: phoneNumber,
      facultyid: faculty,
      deptid: department,
      mail: email,
      pword: password,
    };

    await axios

      .post(` ${process.env.REACT_APP_UMS_BASE}/v1/newStudent`, data)

      .then((res) => {
        if (res.data.success === true) {
          message.success(res.data.message);
          setLoading(false);
          navigate(`/management
         /student`);
        } else {
          setLoading(false);
          message.info(`${res.data.message} Please check form again..`);
        }
      })
      .catch((err) => {
        setLoading(false);
        message.warning(err.message);
      });
  };

  const setidfac = (id, faculty) => {
    setLevel(id, faculty)
    console.log(level);    
}


  // END

  // PLEASE CHECK THE CONDITIONS PROPERLY, QUITE TRICKY
  return (
    <div id="MANAGEMENT-WHOLE">
      <Sidenav />
      <div id="MARGIN-APP">
        <Topnav />

        <div id="MARGIN-UP-FIXED" className="add-new-staff-whole-cont">
          <div className="ans-cont">
            <div className="top-ans">
              <Link to="/management/student">
                <img src={backarrow} alt="" />
              </Link>
              Add new student
            </div>

            <form
              className="ans-form"
              autoComplete="on"
              autoCorrect="on"
              onSubmit={(e) => addingNewStudent(e)}
            >
              <div className="ans-left-right-form">
                <div className="ans-left">
                  <div className="restyle2">
                    <p>Name</p>
                    <input
                      type="text"
                      placeholder="surname first"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <p>Faculty</p>
                  <select
                    name=""
                    id=""
                    onChange={(e) => getDepartment(e.target.value)}
                  >
                    <option value=""> -- Select Faculty -- </option>

                    {listFaculty?.map((listFaculty) => {
                      const { id, faculty } = listFaculty;
                      return (
                        <>
                          <option onChange={() => setidfac(id, faculty)}>{faculty}</option>
                        </>
                      );
                    })}
                  </select>

                  <p>Job position</p>
                  <input
                    type="text"
                    value={jobPosition}
                    onChange={(e) => setJobPosition(e.target.value)}
                    required
                  />

                  <div className="restyle">
                    <p>Email Address</p>
                    <input
                      type="email"
                      placeholder="system should generate Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="ans-right">
                  <p>Phone number</p>
                  <input
                    type="number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />

                  <p>Department</p>

                  <select
                    name=""
                    id=""
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value=""> -- Select Department -- </option>

                    {listDepartment?.map((listDepartment) => {
                      const { id, dept } = listDepartment;
                      return (
                        <>
                          <option value={id}>{dept}</option>
                        </>
                      );
                    })}
                  </select>

                  <p>Level</p>

                  <select
                    name=""
                    id=""
                    onChange={(e) => setLevel(e.target.value)}
                  >
                    <option value=""> -- Select Levels -- </option>

                    {levelList?.map((levelList) => {
                      const { id, level } = levelList;
                      return (
                        <>
                          <option value={() => setidfac(id, level)}>
                            {level}
                          </option>
                        </>
                      );
                    })}
                  </select>

                  <div className="restyle">
                    <p>Password</p>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="system should generate password"
                      required
                    />
                  </div>
                </div>
              </div>

              {loading === true ? (
                <>
                  <button className="disabled">
                    Adding... <Spin checked={loading} indicator={antIcon} />
                  </button>
                </>
              ) : (
                <>
                  <button className="next-phase">Submit</button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
