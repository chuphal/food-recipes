import React, { useState } from "react";
import { Link } from "react-router-dom";

const Pagination = ({ totalPages, currPage }) => {
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li
            className={`page-item ${Number(currPage) === 1 ? "disabled" : ""}`}
          >
            <Link
              className="page-link"
              to={`/recipe/?page=${Number(currPage) - 1}`}
            >
              Previous
            </Link>
          </li>
          {[...Array(totalPages)].map((e, i) => (
            <li className="page-item" key={i}>
              <Link className="page-link" to={`/recipe/?page=${i + 1}`}>
                {i + 1}
              </Link>
            </li>
          ))}

          <li
            className={`page-item ${
              Number(currPage) === Number(totalPages) ? "disabled" : ""
            }`}
          >
            <Link
              className="page-link"
              to={`/recipe/?page=${Number(currPage) + 1}`}
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
