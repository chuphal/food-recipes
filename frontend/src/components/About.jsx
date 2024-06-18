import React from "react";

const About = () => {
  return (
    <div>
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src="/about/about.jpg"
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="800"
              height="500"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              Hey! I'm Chandan
            </h1>
            <p className="lead">
              Come join me in my culinary adventures where we'll be using
              simple, fresh ingredients and transforming them into sophisticated
              and elegant meals for the everyday home cook..
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 me-md-2"
                fdprocessedid="f4p6"
              >
                MORE ABOUT ME
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
