import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import "./Index.scss";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

const Editstaff = () => {
  const [apptoken, setpptoken] = useState(process.env.REACT_APP_UMS_TOKEN);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  const { token } = useParams();

  const [loading, setLoading] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const staffData = {
      apptoken: apptoken,
      usertoken: userData.usertoken,
      token: token,
    };

    await axios
      .post(` ${process.env.REACT_APP_UMS_BASE}/v1/getUserDetails`, staffData)
      .then((res) => {
        if (res.data.success == false) {
        } else {
        }
      })

      .catch((err) => {});
  };

  return (

      <div className="edit-staff-whole-cont">
        <div className="edit-cont">
          <div className="top-eds">
            <Link to="/management/staff">
              <img src="./backarrow.svg" alt="" />
            </Link>
            Edit staff
          </div>

          <form
            className="edit-staff-form"
            autoComplete="on"
            autoCorrect="on"
            //   onSubmit={(e) => addingNewStaff(e)}
          >
            <div className="eds-left-right-form">
              <div className="eds-left">
                <div className="restyle2">
                  <p>Name</p>
                  <input
                    type="text"
                    placeholder="surname first"
                    //   value={name}
                    //   onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* <p>Faculty</p>
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
                      <option value={id}>{faculty}</option>
                    </>
                  );
                })}
              </select> */}

                <p>Job position</p>
                <input
                  type="text"
                  // value={jobPosition}
                  // onChange={(e) => setJobPosition(e.target.value)}
                  required
                />

                <div className="restyle">
                  <p>Email Address</p>
                  <input
                    type="email"
                    placeholder="system should generate Email"
                    //   value={email}
                    //   onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="eds-right">
                <p>Phone number</p>
                <input
                  type="number"
                  // value={phoneNumber}
                  // onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />

                {/* <p>Department</p>

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
              </select> */}

                {/* <p>Level</p>

              <select name="" id="" onChange={(e) => setLevel(e.target.value)}>
                <option value=""> -- Select Levels -- </option>

                {levelList?.map((levelList) => {
                  const { id, level } = levelList;
                  return (
                    <>
                      <option value={id}>{level}</option>
                    </>
                  );
                })}
              </select> */}

                <div className="restyle">
                  <p>Password</p>
                  <input
                    type="password"
                    //   value={password}
                    //   onChange={(e) => setPassword(e.target.value)}
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
  );
};

export default Editstaff;
