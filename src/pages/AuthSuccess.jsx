import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

function AuthSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [location, navigate, dispatch]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-xl">Processing authentication...</div>
    </div>
  );
}

export default AuthSuccess;
