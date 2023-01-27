import React from "react";
import { Navigate } from "react-router-dom";

const UserProtect = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userData"));

  console.log(user);
  if (user.acc_type === "Management") {
    return <>{children}</>;
  }
};
export default UserProtect;
