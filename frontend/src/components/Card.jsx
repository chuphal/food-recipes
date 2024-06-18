import React from "react";
import { Link } from "react-router-dom";

const Card = ({ recipe }) => {
  return (
    <div>
      <div className="card dietary-card">
        <Link to={`/recipe/${recipe._id}`} className="link-dietary-card">
          <img
            src={`http://localhost:5000/upload/${recipe.image}`}
            // className="carousel-row-img"
            alt="..."
          />
        </Link>
        <div className="card-content">
          <Link to={`/recipe/${recipe._id}`} className="card-title">
            <h5>{recipe.name}</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
