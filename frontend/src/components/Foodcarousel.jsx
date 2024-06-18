import React from "react";
import Carousel from "react-bootstrap/Carousel";
import useGetLatestRecipes from "../hooks/useGetLatestRecipes";
import { Link } from "react-router-dom";

const Foodcarousel = () => {
  const page = "";
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
        <Carousel className="carousel-container">
          {latestRecipes.slice(0, 3).map((recipe, index) => (
            <Carousel.Item key={index} interval={1000}>
              <img
                className="d-block w-100 "
                style={{ objectFit: "cover" }}
                src={`http://localhost:5000/upload/${recipe.image}`}
                alt="First slide"
                height={600}
              />
              <Carousel.Caption>
                <Link className="card-title" to={`/recipe/${recipe._id}`}>
                  <h3>{recipe.name}</h3>
                </Link>
                <p>{recipe.description1}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default Foodcarousel;
