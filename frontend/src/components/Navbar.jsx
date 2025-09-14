/** @format */

import React from "react";
import "../Style/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/AuthSLice.js";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.isAuth);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success("Logout successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed!");
    }
  };
  return (
    <div className="navbar_container">
      <Link to="/home" className="navbar_logo">
        MyAuth
      </Link>
      <div className="navbar_links">
        {isAuth ? (
          <>
            <Link to="/home" className="navbar navbar_home">
              Home
            </Link>
            <button className="navbar navbar_logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="navbar navbar_signup">
              Signup
            </Link>
            <Link to="/login" className="navbar navbar_login">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
