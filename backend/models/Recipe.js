import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the recipe name"],
  },
  description1: {
    type: String,
    required: [true, "Please provide the short description of the recipe"],
  },
  description2: {
    type: String,
    required: [true, "Please provide the long description of the recipe"],
  },

  ingredients: {
    type: [String],
    required: [true, "Please provide the ingredients"],
  },
  steps: {
    type: [String],
    required: [true, "Please provide the steps for recipe"],
  },
  image: {
    type: String,
    required: [true, "Provide a valid image of your recipe"],
  },
  foodtype: {
    type: String,
    require: [true, "Provide the food type of the recipe"],
  },
  country: {
    type: String,
    require: [true, "Provide the country for recipe"],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user name"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Recipe = new mongoose.model("Recipe", RecipeSchema);

export default Recipe;
