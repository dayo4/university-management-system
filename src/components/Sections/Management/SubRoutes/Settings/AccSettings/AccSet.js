import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AccSet.scss";
import ProfileUpdate from "./ProfileUpdate";

const AccSet = () => {
  const [editprofile, seteditprofile] = useState(true);
  // const [notify, setNotify] = useState(true);

  const clickedit = () => {
      seteditprofile(false)
  }

  return (
    <>
      {editprofile ? (
        <>
          <div className="account-settings-whole-cont">
            <div className="profile-update-as">
              <div className="pro-edit-top-as">
                <h6>Profile Update</h6>
                <a onClick={clickedit}>
                  <img src="./edit.svg" alt="" />
                  Edit{" "}
                </a>
              </div>
              <div className="box-details-as">
                <p>
                  Change your name Change your nameChange your nameChange your
                  nameChange your nameChange your nameChange your nameChange
                  your name
                </p>
              </div>
            </div>

            <div className="email-pass-pro-cont">
              <div className="change-email-as">
                <div className="pro-edit-top-as">
                  <h6>Change Email Address</h6>
                  <Link to="/">
                    <img src="./edit.svg" alt="" />
                    Edit{" "}
                  </Link>
                </div>
                <div className="box-details-as">
                  <p>
                    Change your name Change your nameChange your nameChange your
                    nameChange your nameChange your nameChange your nameChange
                    your name
                  </p>
                </div>
              </div>

              <div className="change-pass-as">
                <div className="pro-edit-top-as">
                  <h6>Change password</h6>
                  <Link to="/">
                    <img src="./edit.svg" alt="" />
                    Edit{" "}
                  </Link>
                </div>
                <div className="box-details-as">
                  <p>
                    Change your name Change your nameChange your nameChange your
                    nameChange your nameChange your nameChange your nameChange
                    your name
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <ProfileUpdate />
        </>
      )}
    </>
  );
};

export default AccSet;
