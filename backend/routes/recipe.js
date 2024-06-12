import express from "express";
const router = express.Router();

import {
  getAllRecipes,
  createRecipe,
  getSingleRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipe.js";
import authentication from "../middlewares/authentication.js";

router.get("/", getAllRecipes);

router.post("/", authentication, createRecipe);

router.get("/:id", getSingleRecipe);

router.put("/:id", authentication, updateRecipe);

router.delete("/:id", authentication, deleteRecipe);

export default router;
