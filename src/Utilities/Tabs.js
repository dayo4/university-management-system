import React from "react";
import "antd/dist/reset.css";
import "./Tabs.scss";
import { Tabs, TabPaneProps } from "antd";

// IMPORTING IMAGES
import sent from "../images/sent.svg";
const { TabPane } = Tabs;





const Tabscomp = () => {


  const ok = () => {
    return (
      <div className="tab-custom">
        <img src={sent} alt="" />
        <h6>Home</h6>
      </div>
    );
  };

  // const onChange = (key) => {
  //   console.log(key);
  // };

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab={ok()} key="1">
        Content of Tab Pane 1
      </TabPane>

      <TabPane tab="Tab 2" key="2">
        Content of Tab Pane 2
      </TabPane>

      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
};

export default Tabscomp;

// import React, {useState} from 'react'
// import Tabs from 'react-bootstrap/Tabs'
// import Tab from "react-bootstrap/Tab";



// const Tabscomp = () => {

//     const [key, setKey] = useState('home');

//   const efe = () => {
//     return (
//       <>
//         <img src="./sent.svg" alt="" />
//         <p>hey guys</p>
//       </>
//     );
//   }


//   return (
//     <Tabs
//       id="controlled-tab-example"
//       activeKey={key}
//       onSelect={(k) => setKey(k)}
//       className="mb-3"
//     >
//       <Tab eventKey="home" title={efe()}>
//         {/* <Sonnet /> */}
//       </Tab>
//       <Tab eventKey="profile" title={efe()}>
//         {/* <Sonnet /> */}
//       </Tab>
//       <Tab eventKey="contact" title="Contact" >
//         {/* <Sonnet /> */}
//       </Tab>
//     </Tabs>
//   );
// }

// export default Tabscomp


