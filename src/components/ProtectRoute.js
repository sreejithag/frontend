import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

function ProtectRoute({ children }) {
  const { loggedIn } = useAuth();

  return loggedIn === true ? children : <Navigate to="/" />;
}

export default ProtectRoute;
