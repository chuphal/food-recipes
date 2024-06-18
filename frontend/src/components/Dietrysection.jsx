import React from "react";
import Carouselrow from "./Carouselrow";

import { Link, useLocation } from "react-router-dom";
import useSearch from "../hooks/useSearch";

export const Dietrysection = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const searched = query.get("search") ? query.get("search") : "";
  const { loading, recipes } = useSearch(searched);

  return (
    <>
      <div className="dietary-container">
        <h2 className="">Recipes based on dietary preferences</h2>

        <hr
          style={{
            color: "black",
            height: "5",
            width: "100%",
          }}
        />

        <div className="sub-dietary-container">
          <div>
            <Link to={`/?search=`}>
              <button
                className={`dietary-button ${
                  searched === ""
                    ? "checked-dietary-btn"
                    : "unchecked-dietary-btn"
                }`}
              >
                All
              </button>
            </Link>
          </div>
          <div>
            <Link
              to={`/?search=vegetarian`}
              className={`dietary-button ${
                searched === "vegetarian"
                  ? "checked-dietary-btn"
                  : "unchecked-dietary-btn"
              }`}
            >
              Vegetarian
            </Link>
          </div>
          <div>
            <Link
              to={`/?search=vegan`}
              className={`dietary-button ${
                searched === "vegan"
                  ? "checked-dietary-btn"
                  : "unchecked-dietary-btn"
              }`}
            >
              Vegan
            </Link>
          </div>
          <div>
            <Link
              to={`/?search=glutenfree`}
              className={`dietary-button ${
                searched === "glutenfree"
                  ? "checked-dietary-btn"
                  : "unchecked-dietary-btn"
              }`}
            >
              Gluten-Free
            </Link>
          </div>
          <div>
            <Link
              to={`/?search=dairyfree`}
              className={`dietary-button ${
                searched === "dairyfree"
                  ? "checked-dietary-btn"
                  : "unchecked-dietary-btn"
              }`}
            >
              Dairy-Free
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        ) : (
          <Carouselrow recipes={recipes} />
        )}
      </div>
    </>
  );
};

export default Dietrysection;
