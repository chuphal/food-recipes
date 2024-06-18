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
import upload from "../middlewares/multer.js";

router.get("/", getAllRecipes);

router.post("/", authentication, upload, createRecipe);

router.get("/:id", getSingleRecipe);

router.put("/:id", authentication, upload, updateRecipe);

router.delete("/:id", authentication, deleteRecipe);

export default router;
