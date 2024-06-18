import React from "react";
import { Link } from "react-router-dom";

const Singlerecipecard = ({ recipe }) => {
  return (
    <div className="main-single-card-div">
      <div className="first-single-card-div">
        <div>
          <h2>{recipe.name}</h2>
          <p>{recipe.description1}</p>
        </div>
        <div className="card-img-div">
          <img src={`/upload/${recipe.image}`} />
        </div>
      </div>

      <div className="center-single-card-div">
        <div className="first-set-btn">
          <button>PRINT RECIPE</button>

          <Link to={`/updaterecipe/${recipe._id}`} className="first-set-btn">
            <button>UPDATE RECIPE</button>
          </Link>

          <button>LEAVE A REVIEW</button>
        </div>
        <hr />
        <div className="ingredients-div">
          <h3>INGREDIENTS</h3>
          <ul style={{ marginLeft: "2rem", lineHeight: "2rem" }}>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <div className="first-set-btn">
            <a
              className="first-set-btn"
              href={"https://www.instacart.com/store/"}
              target="_blank"
            >
              <button>Get ingredients</button>
            </a>
          </div>
        </div>
        <div className="ingredients-div">
          <hr />
          <h3>INSTRUCTIONS</h3>
          <ol style={{ marginLeft: "2rem", lineHeight: "2rem" }}>
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
      <div className="last-single-card-div">
        <h3>Thank You!!!</h3>
        <p>Did you enjoy the recipe making. Please give reviews!</p>

        <div className="first-set-btn">
          <Link to={`/updaterecipe/${recipe._id}`} className="first-set-btn">
            <button>UPDATE RECIPE</button>
          </Link>
          <button>SHARE</button>
        </div>
      </div>
    </div>
  );
};

export default Singlerecipecard;
