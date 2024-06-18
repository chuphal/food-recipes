import React from "react";
import Registerform from "../components/Registerform";
import Loginform from "../components/Loginform";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Signupin = () => {
  return (
    <div className="register-page">
      <div className="col-lg-7 text-center text-lg-start reg-img-section">
        <img src="/carousel/image2.jpg" style={{ opacity: "0.8" }} />
      </div>
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default Signupin;
