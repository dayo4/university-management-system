import React, { useState } from "react";
import "./Index.scss"
import AccSet from "./AccSettings/AccSet";
import FeaturesAcc from "./FeaturesAcc/FeaturesAcc";
import ProfileUpdate from "./AccSettings/ProfileUpdate";
import Uploads from "./Uploads/Uploads";
import { Col, Row } from "antd";

const Settings = () => {
  // TAB DECLEARATION
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };



return (
  <Row justify={'center'}>
  <Col xs={24} sm={20} md={16}>
    <div id="PageAwaitingDesign">Awaiting Page Design</div>
  </Col>
</Row>
);



  // return (

  //       <div className="settings-whole-cont">
  //         <div className="memo-tabs-whole">
  //           <div className="bloc-tabs">
  //             <button
  //               className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
  //               onClick={() => toggleTab(1)}
  //             >
  //               <img src="./inbox.svg" alt="" />
  //               Account Settings{" "}
  //             </button>
  //             <button
  //               className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
  //               onClick={() => toggleTab(2)}
  //             >
  //               <img src="./sent.svg" alt="" />
  //               Uploads{" "}
  //             </button>
  //             <button
  //               className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
  //               onClick={() => toggleTab(3)}
  //             >
  //               <img src="./draft.svg" alt="" />
  //               Notification{" "}
  //             </button>

  //             <button
  //               className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
  //               onClick={() => toggleTab(4)}
  //             >
  //               <img src="./sent.svg" alt="" />
  //               Features{" "}
  //             </button>
  //           </div>

  //           <div className="content-tabs">
  //             <div
  //               className={
  //                 toggleState === 1 ? "content  active-content" : "content"
  //               }
  //             >
  //               <AccSet />
  //               {/* <ProfileUpdate/> */}
  //             </div>

  //             <div
  //               className={
  //                 toggleState === 2 ? "content  active-content" : "content"
  //               }
  //             >
  //               <Uploads/>
  //             </div>

  //             <div
  //               className={
  //                 toggleState === 3 ? "content  active-content" : "content"
  //               }
  //             >
  //               <h2>Content 3</h2>
  //               <hr />
  //               <p>
  //                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
  //                 sed nostrum rerum laudantium totam unde adipisci incidunt modi
  //                 alias! Accusamus in quia odit aspernatur provident et ad vel
  //                 distinctio recusandae totam quidem repudiandae omnis veritatis
  //                 nostrum laboriosam architecto optio rem, dignissimos
  //                 voluptatum beatae aperiam voluptatem atque. Beatae rerum
  //                 dolores sunt.
  //               </p>
  //             </div>

  //             <div
  //               className={
  //                 toggleState === 4 ? "content  active-content" : "content"
  //               }
  //             >
  //               <FeaturesAcc />
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  // );
};

export default Settings;
