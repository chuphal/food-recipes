import React from "react";
import Latestcard from "./Latestcard";
import useGetLatestRecipes from "../hooks/useGetLatestRecipes";
import Pagination from "./Pagination";
import { useLocation } from "react-router-dom";

const Allrecentrecipes = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const page = query.get("page") ? query.get("page") : 1;
  const { loading, latestRecipes, totalPages } = useGetLatestRecipes(page);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <div className="latest-recipe-container">
          <div className="latest-heading">
            <h2>THE LATEST & GREATEST</h2>
          </div>
          <div className="latest-content-div">
            {latestRecipes.map((recipe, index) => (
              <Latestcard key={index} recipe={recipe} />
            ))}

            <div style={{ margin: "2rem" }}>
              <Pagination totalPages={totalPages} currPage={page} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Allrecentrecipes;
