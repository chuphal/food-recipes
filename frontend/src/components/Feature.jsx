import React from "react";
import { Link } from "react-router-dom";

const Feature = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "30rem",
        margin: "1rem",
      }}
    >
      <div>
        <h2 className="pb-2 border-bottom feature-heading">Features</h2>
      </div>

      <div className="main-feature-div">
        <Link to={"/search?search=indian"} style={{ textDecoration: "none" }}>
          <div className="col custom-feature-div">
            <div
              className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg "
              style={{
                backgroundImage: "url('/carousel/image2.jpg')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                  Indian
                </h3>
              </div>
            </div>
          </div>
        </Link>
        <Link to={"/search?search=chinese"} style={{ textDecoration: "none" }}>
          <div className="col custom-feature-div">
            <div
              className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
              style={{
                backgroundImage: "url('/carousel/image4.jpg')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                  Chinese
                </h3>
              </div>
            </div>
          </div>
        </Link>

        <Link to={"/search?search=italian"} style={{ textDecoration: "none" }}>
          <div className="col custom-feature-div">
            <div
              className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
              style={{
                backgroundImage: "url('/carousel/image3.jpg')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                  Italian
                </h3>
              </div>
            </div>
          </div>
        </Link>
        <Link to={"/search?search=others"} style={{ textDecoration: "none" }}>
          <div className="col custom-feature-div">
            <div
              className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
              style={{
                backgroundImage: "url('/carousel/image6.jpg')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                  Others
                </h3>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Feature;
