import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the recipe name"],
  },
  description: {
    type: String,
    required: [true, "Please provide the recipe description"],
  },

  ingredients: {
    type: Array,
    required: [true, "Please provide the ingredients"],
  },
  steps: [
    {
      step: {
        type: String,
      },
      description: {
        type: String,
      },
      img: {
        type: String,
      },
    },
  ],
  thumbnail: {
    type: String,
    required: [true, "Provide a valid image of your recipe"],
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
