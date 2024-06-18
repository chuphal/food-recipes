import React from "react";
import fixTheDate from "../utils/fixTheDate";
import { Link } from "react-router-dom";

const Latestcard = ({ recipe }) => {
  const handlClick = () => {};
  return (
    <div className="latest-sub-container">
      <div>
        <Link to={`/recipe/${recipe._id}`} className="latest-img-container">
          <img src={`http://localhost:5000/upload/${recipe.image}`} />
        </Link>
      </div>
      <div className="latest-content-card">
        <p>{fixTheDate(recipe.createdAt)}</p>
        <Link to={`/recipe/${recipe._id}`} className="card-title">
          <h2 style={{ fontWeight: "700" }}>{recipe.name}</h2>
        </Link>
        <p>{recipe.description1}</p>
        <Link to={`/recipe/${recipe._id}`}>
          <button className="continue-button" onClick={handlClick}>
            CONTINUE READING
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Latestcard;
