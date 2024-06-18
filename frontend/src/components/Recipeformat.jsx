import React, { useRef } from "react";
import Singlerecipecard from "./Singlerecipecard";
import useSingleRecipe from "../hooks/useSingleRecipe";
import { Link, useParams } from "react-router-dom";

const Recipeformat = () => {
  const { recipeId } = useParams();
  const jumpRef = useRef();

  const { loading, singleItem } = useSingleRecipe(recipeId || null);

  return (
    <div className="single-recipe-container">
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "30rem",
          }}
        >
          <div
            className="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <>
          <div className="heading-format">
            <h2 style={{ fontWeight: "700" }}>{singleItem.name}</h2>
            <div className="first-set-btn">
              <button
                onClick={() => {
                  jumpRef.current?.scrollIntoView();
                }}
              >
                JUMP TO RECIPE
              </button>
              <Link
                to={`/updaterecipe/${singleItem._id}`}
                className="first-set-btn"
              >
                <button>UPDATE RECIPE</button>
              </Link>
            </div>

            <small
              style={{
                fontStyle: "italic",
                marginTop: "1rem",
                marginBottom: ".5rem",
              }}
            >
              This post may contain affiliate links. Please see our
              <spam className="terms-link"> privacy policy </spam>
              for details.
            </small>
            <p style={{ fontWeight: "700" }}>
              <em>{singleItem.description1}</em>
            </p>
          </div>

          <div className="decription-recipe-format">
            <img
              src={`/upload/${singleItem.image}`}
              style={{ height: "60rem", objectFit: "cover" }}
            />
            <p>{singleItem.description2}</p>
          </div>

          <div ref={jumpRef}>
            <Singlerecipecard recipe={singleItem} />
          </div>
        </>
      )}
    </div>
  );
};

export default Recipeformat;
