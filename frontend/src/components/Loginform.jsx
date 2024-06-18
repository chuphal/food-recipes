import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Loginform = () => {
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const user = {
      username,
      password,
    };

    await login(user);

    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <>
      <div className="col-md-10 mx-auto col-lg-5 reg-form-section">
        <div style={{ marginBottom: "2rem" }}>
          <Link
            to="/"
            className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none"
          >
            <img
              src="/logo.jpg"
              width={80}
              height={60}
              style={{ marginBottom: "1rem" }}
            />
            <span className="fs-4">Food Recipes</span>
          </Link>
        </div>
        <form
          className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
          onSubmit={handleSubmit}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h2 style={{ opacity: "0.8", fontWeight: "700" }}>Login</h2>
          </div>

          <div className="form-floating mb-3">
            <input
              type="username"
              className="form-control"
              id="floatingUsername"
              placeholder="logan"
              ref={usernameRef}
            />
            <label htmlFor="floatingInput" style={{ color: "grey" }}>
              Username
            </label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              ref={passwordRef}
            />
            <label htmlFor="floatingPassword" style={{ color: "grey" }}>
              Password
            </label>
          </div>
          <small className="text-body-secondary reg-anchor">
            <Link to="/register">Don't have an account?</Link>
          </small>

          <button
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            style={{ marginTop: "0.5rem" }}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              "Login"
            )}
          </button>
          <hr className="my-4" />
          <small className="text-body-secondary">
            By clicking Login, you agree to the
            <spam className="terms-link"> Terms of Service </spam> &
            <spam className="terms-link">Privacy Policy</spam>
          </small>
        </form>
      </div>
    </>
  );
};

export default Loginform;
