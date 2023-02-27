import React from "react";
import { BounceLoader } from "react-spinners";

const AppLoader = (props) => {
  return (
    <>
      <div id="MARGIN-UP-FIXED" className="load-load">
        <BounceLoader color={"#1677ff"} loading={props.loading} size={50} />
        <br />
        <p>{/* {props.nameloader} - */} Loading...</p>
      </div>
    </>
  );
};

export default AppLoader;
