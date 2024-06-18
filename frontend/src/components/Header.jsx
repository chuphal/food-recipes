import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const searchRef = useRef("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const search = searchRef.current.value;

    navigate(`/search?search=${search}`);
  };
  return (
    <>
      <header className="py-3 mb-4 border-bottom">
        <div className="container d-flex flex-wrap justify-content-center">
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
          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0"
            role="search"
            onSubmit={handleSubmit}
          >
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              ref={searchRef}
              aria-label="Search"
            />
          </form>
        </div>
      </header>
    </>
  );
}

export default Header;
