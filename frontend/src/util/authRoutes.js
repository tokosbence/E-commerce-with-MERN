import React from "react";
import { AuthContext } from "../context/authContext";
import { useLocation, Navigate } from "react-router-dom";

const RequiredAuth = ({ children }) => {
  const authContext = React.useContext(AuthContext);
  const location = useLocation();
  const token = localStorage.getItem("token");
  console.log(token);
  if (token === null && authContext.token === null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequiredAuth;
