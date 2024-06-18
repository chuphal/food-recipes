import React from "react";
import Card from "./Card";

const Carouselrow = ({ recipes }) => {
  return (
    <div className="carousel-row">
      {recipes.length === 0 ? (
        <div className="preferences-div">
          <h1>No recipe found</h1>
        </div>
      ) : (
        recipes.map((recipe, idx) => <Card key={idx} recipe={recipe} />)
      )}
    </div>
  );
};

export default Carouselrow;
