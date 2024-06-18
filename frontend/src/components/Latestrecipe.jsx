import React from "react";
import Latestcard from "./Latestcard";
import useGetLatestRecipes from "../hooks/useGetLatestRecipes";
import { Link } from "react-router-dom";

const Latestrecipe = () => {
  const page = 1;
  const { loading, latestRecipes } = useGetLatestRecipes(page);

  return (
    <>
      {loading ? (
        <>
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        </>
      ) : (
        <div className="latest-recipe-container">
          <div className="latest-heading">
            <h2>THE LATEST & GREATEST</h2>
          </div>
          <div className="latest-content-div">
            {latestRecipes.slice(0, 3).map((recipe, index) => (
              <Latestcard key={index} recipe={recipe} />
            ))}

            <Link to={"/recipe"}>
              <button className="recent-button">VIEW MORE RECENT POSTS</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Latestrecipe;
