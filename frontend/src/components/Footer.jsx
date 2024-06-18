import React from "react";
import { BsFacebook } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="container">
        <footer className="py-5">
          <div className="row">
            <div className="col-6 col-md-2 mb-3  footer-section-div">
              <h5>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <Link to={"/"} className="nav-link p-0 text-body-secondary">
                    Home
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    to={"/search"}
                    className="nav-link p-0 text-body-secondary"
                  >
                    Recipes
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    to={"/createrecipe"}
                    className="nav-link p-0 text-body-secondary"
                  >
                    Create Recipe
                  </Link>
                </li>

                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-5 offset-md-1 mb-3">
              <form>
                <h5>Subscribe to our newsletter</h5>
                <p>Monthly digest of what's new and exciting from us.</p>
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                  <label htmlFor="newsletter1" className="visually-hidden">
                    Email address
                  </label>
                  <input
                    id="newsletter1"
                    type="text"
                    className="form-control"
                    placeholder="Email address"
                    fdprocessedid="1ft9im"
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    fdprocessedid="4w23e"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <p>{`© ${new Date().getFullYear()} Company, Inc. All rights reserved.`}</p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">
                <a
                  className="link-body-emphasis"
                  target="_blank"
                  href="https://www.instagram.com/"
                >
                  <FaInstagram />
                </a>
              </li>
              <li className="ms-3">
                <a
                  className="link-body-emphasis"
                  href="https://www.facebook.com/login.php?skip_api_login=1&api_key=966242223397117&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fshare.php%3Fu%3Dhttps%253A%252F%252Fdamndelicious.net%252F2024%252F03%252F22%252Fchicken-and-dumplings%252F&cancel_url=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Fclose_window%2F%3Fapp_id%3D966242223397117%26connect%3D0%23_%3D_&display=popup&locale=en_GB"
                  target="_blank"
                >
                  <BsFacebook />
                </a>
              </li>
              <li className="ms-3">
                <a
                  className="link-body-emphasis"
                  href="https://github.com/chuphal"
                  target="_blank"
                >
                  <FaGithub />
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
