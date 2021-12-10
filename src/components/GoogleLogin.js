import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

import React from "react";

function GoogleLogin() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const [error, setError] = useState(false);

  useEffect(() => {
    if (token !== "" && token !== "error") {
      setToken(token);
      navigate("/data");
    }

    setError(true);
  }, []);

  const message = (
    <p>
      Google Oauth Error click{" "}
      <a href="http://localhost:4000/login/google">here</a> to retry
    </p>
  );

  return (
    <>
      <div>{error ? message : ""}</div>
    </>
  );
}

export default GoogleLogin;
