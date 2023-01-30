import React, { useState } from "react";
import "./Topnav.scss";
import { useParams } from "react-router-dom";

const Topnav = (props) => {
  const heading = useParams();
  const [labb, setlabb] = useState(heading);

  // search
  const [show, setShow] = useState(true);
  const [navshow, setNavshow] = useState(false);

  return (
    <div id="MANAGEMENT-WHOLE">

      <div className="TopNavCont">

      </div>

      {/* <div className="topnav-problem">
        <div className="topnav-cont">
          <p>{props.title}</p>

          <form
            // className={navshow ? "search-topnav-cont" : "nosearch-topnav-cont"}
            className="search-topnav-cont"
            autoCorrect="on"
            autoComplete="on"
          >
            <button
            //  onClick={() => setNavshow(!navshow)}
             >
              <img src="./search.svg" alt="" />
            </button>
            <input type="text" placeholder="Search..." required />

            <div className="dis-dis" onClick={() => setNavshow(!navshow)}>
              <img src="./search.svg" alt="" />
            </div>
          </form>

          <div className="notification-user">
            <img className="noti-icon" src="./notification.svg" alt="" />

            <div className="topnav-user-cont">
              <img src="./userimg.svg" alt="" />

              <div className="user-names">
                <h5>Admin</h5>
                <h6>aggggede@gmail.com</h6>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Topnav;
