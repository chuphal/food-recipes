import React from "react";
import { useLocation } from "react-router-dom";
import useSearch from "../hooks/useSearch";
import Card from "./Card";

const Rendersearch = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const searched = query.get("search") ? query.get("search") : "";

  const { loading, recipes } = useSearch(searched);

  return (
    <div className="main-render-div">
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
      ) : (
        <>
          <div>
            <h1> {`Search Results: ${searched ? searched : "Recipes"}`}</h1>
          </div>
          <div className="content-render-div">
            {recipes.length === 0 ? (
              <div style={{ marginTop: "15rem" }}>
                <h1>No recipe found</h1>
              </div>
            ) : (
              recipes.map((recipe, index) => (
                <Card key={index} recipe={recipe} />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Rendersearch;
