import React, { useRef, useState } from "react";
import useUpdateRecipe from "../hooks/useUpdateRecipe";
import { useNavigate, useParams } from "react-router-dom";
import capatalizeFirstLetter from "../utils/capatalizeFirstLetter";

const Updaterecipe = () => {
  const { recipeId } = useParams();
  const recipeNameRef = useRef("");
  const description1Ref = useRef("");
  const description2Ref = useRef("");
  const imageRef = useRef();
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const [foodtype, setFoodtype] = useState("");
  const [country, setCountry] = useState("");

  const { loading, recipeUpdater } = useUpdateRecipe();
  const navigate = useNavigate();

  const handleIngredientChange = (index, e) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = e.target.value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleStepsChange = (index, e) => {
    const newSteps = [...steps];
    newSteps[index] = e.target.value;
    setSteps(newSteps);
  };

  const handleAddStep = () => {
    setSteps([...steps, ""]);
  };

  const handleRemoveStep = (index) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedFile = imageRef.current.files[0];

    const nonEmptyIngredients = ingredients.filter(
      (ingredient) => ingredient !== ""
    );
    const nonEmptySteps = steps.filter((step) => step !== "");

    const name = recipeNameRef.current.value.toUpperCase();
    const description1 = capatalizeFirstLetter(description1Ref.current.value);
    const description2 = capatalizeFirstLetter(description2Ref.current.value);
    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("name", name);
    formData.append("description1", description1);
    formData.append("description2", description2);
    formData.append("ingredients", JSON.stringify(nonEmptyIngredients));
    formData.append("steps", JSON.stringify(nonEmptySteps));
    formData.append("foodtype", foodtype);
    formData.append("country", country);

    await recipeUpdater(formData, recipeId);

    imageRef.current.value = null;
    recipeNameRef.current.value = "";
    description1Ref.current.value = "";
    description2Ref.current.value = "";
    setIngredients([""]);
    setSteps([""]);
  };

  return (
    <div className="create-recipe-container">
      <h2>Update Your Recipes</h2>
      <hr />
      <form
        onSubmit={handleSubmit}
        className="col-12 col-lg-auto mb-3 mb-lg-0"
        style={{ marginTop: "2rem" }}
      >
        <div className="list-form-div margin-div">
          <label>Recipe Name:</label>
          <input
            style={{ marginLeft: "25px" }}
            type="text"
            className="form-control"
            ref={recipeNameRef}
            placeholder="Recipe Name"
          />
        </div>
        <div className="list-form-div margin-div">
          <label>Description 1:</label>
          <input
            style={{ marginLeft: "25px" }}
            type="text"
            className="form-control"
            ref={description1Ref}
            placeholder="Short description"
          />
        </div>
        <div className="list-form-div margin-div">
          <label>Description 2:</label>
          <textarea
            style={{ marginLeft: "25px" }}
            type="text"
            ref={description2Ref}
            className="form-control"
            placeholder="Long description"
          />
        </div>
        <div className="list-form-div1 margin-div">
          <label>Ingredients:</label>
          <div>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="list-form-div">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingredients"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e)}
                />
                <div style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "0.3rem" }}>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleAddIngredient}
            >
              +
            </button>
          </div>
        </div>

        <div className="list-form-div1 margin-div">
          <label>Steps:</label>
          <div>
            {steps.map((step, index) => (
              <div key={index} className="list-form-div">
                <textarea
                  style={{ marginLeft: "78px" }}
                  type="text"
                  className="form-control"
                  placeholder="Step"
                  value={step}
                  onChange={(e) => handleStepsChange(index, e)}
                />
                <div style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => handleRemoveStep(index)}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.1rem" }}>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleAddStep}
            >
              +
            </button>
          </div>
        </div>
        <div className="list-form-div margin-div">
          <label>Image: </label>
          <input
            style={{ marginLeft: "75px" }}
            type="file"
            ref={imageRef}
            className="form-control"
            placeholder="Recipe Name"
          />
        </div>
        <div className="list-form-div margin-div">
          <label>Food type : </label>
          <div style={{ marginLeft: "40px" }}>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="foodtype"
                id="inlineRadio1"
                value="vegetarian"
                onChange={(e) => setFoodtype(e.target.value)}
                required
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Vegetarian
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="foodtype"
                id="inlineRadio2"
                value="vegan"
                onChange={(e) => setFoodtype(e.target.value)}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Vegan
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="foodtype"
                id="inlineRadio3"
                value="glutenfree"
                onChange={(e) => setFoodtype(e.target.value)}
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                Gluten Free
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="foodtype"
                id="inlineRadio3"
                value="dairyfree"
                onChange={(e) => setFoodtype(e.target.value)}
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                Dairy Free
              </label>
            </div>
          </div>
        </div>
        <div className="list-form-div margin-div">
          <label>Country : </label>
          <div style={{ marginLeft: "55px" }}>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="country"
                id="inlineRadio1"
                value="indian"
                onChange={(e) => setCountry(e.target.value)}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Indian
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="country"
                id="inlineRadio2"
                value="chinese"
                onChange={(e) => setCountry(e.target.value)}
                required
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Chinese
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="country"
                id="inlineRadio3"
                value="italian"
                onChange={(e) => setCountry(e.target.value)}
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                Italian
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="country"
                id="inlineRadio3"
                value="others"
                onChange={(e) => setCountry(e.target.value)}
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                Others
              </label>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "2rem" }}>
          <button
            className="btn btn-dark"
            type="submit"
            disabled={loading}
            style={{ width: "12rem" }}
          >
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              "Update Recipe"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Updaterecipe;
