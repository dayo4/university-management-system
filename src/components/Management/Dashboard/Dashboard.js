import React, {useState} from 'react'
import Tabscomp from '../../../Utilities/Tabs';
import Tabs from '../../../Utilities/Tabs';
import Sidenav from "../../Sidenav/Sidenav";
import MWrapper from '../MWrapper';
import Topnav from "../Topnav/Topnav";


const Dashboard = () => {
  


  return (
    <MWrapper>
      <Topnav title={"Dashboard"} />

      <div id="MARGIN-UP-FIXED" className="dashboard-whole-cont">
      <Tabscomp />
      </div>
    </MWrapper>
  );
}

export default Dashboard