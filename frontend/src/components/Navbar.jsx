import React from "react";
import { Link } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { useAuthContext } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthContext();
  const { logout } = useLogout();

  const handleClick = async () => {
    await logout();
  };

  return (
    <div>
      <nav className="py-2 bg-body-tertiary border-bottom">
        <div className="container d-flex flex-wrap">
          <ul className="nav me-auto">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link link-body-emphasis px-2 active"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/search"} className="nav-link link-body-emphasis px-2">
                Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/createrecipe"}
                className="nav-link link-body-emphasis px-2"
              >
                Create Recipe
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#" className="nav-link link-body-emphasis px-2">
                About
              </Link>
            </li>
          </ul>

          <ul className="nav">
            {!authUser ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="nav-link link-body-emphasis px-2"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/register"
                    className="nav-link link-body-emphasis px-2"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link link-body-emphasis px-2">
                  <IoLogOut className="logout-website" onClick={handleClick} />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
