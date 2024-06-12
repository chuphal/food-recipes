import { logger } from "../utils/logger.js";
import {
  BadRequestError,
  CustomAPIError,
  NotFoundError,
} from "../errors/index.js";
import Recipe from "../models/Recipe.js";
import { StatusCodes } from "http-status-codes";

export const getAllRecipes = async (req, res) => {
  const { page = 1 } = req.query;
  const offSet = (page - 1) * 10;
  const recipes = await Recipe.find()
    .sort({ createdAt: -1 })
    .skip(offSet)
    .limit(10);

  if (recipes.length === 0) {
    logger.error("Currently, No recipe is available");
    throw new NotFoundError("Currently, No recipe is available");
  }

  logger.info("Successfully get all the recipes");
  res.status(StatusCodes.OK).json({
    recipeCount: recipes.length,
    totalPages: Math.ceil(recipes.length / 10),
    currentPage: page,
    msg: "Successfully get all the recipes",
    recipes,
  });
};

export const createRecipe = async (req, res) => {
  const { name, description, ingredients, steps, thumbnail } = req.body;

  if (!name) {
    logger.error("Please provide the name of the recipe");
    throw new BadRequestError("Please provide the name of the recipe");
  }
  if (!description) {
    logger.error("Please provide the description of the recipe");
    throw new BadRequestError("Please provide the description of the recipe");
  }
  if (!ingredients || ingredients.length === 0) {
    logger.error("Please provide ingredients regarding the recipe");
    throw new BadRequestError(
      "Please provide ingredients regarding the recipe"
    );
  }
  if (!steps || steps.length === 0) {
    logger.error("Please provide steps regarding the recipe");
    throw new BadRequestError("Please provide steps regarding the recipe");
  }

  if (!thumbnail) {
    logger.error("Please provide image regarding the recipe");
    throw new BadRequestError("Please provide image regarding the recipe");
  }

  req.body.createdBy = req.user.userId;
  const recipe = await Recipe.create(req.body);
  logger.info("Recipe created Successfully");
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Recipe created Successfully", recipe });
};

export const getSingleRecipe = async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipe.findOne({
    _id: id,
  });

  if (!recipe) {
    logger.error(`No recipe with id ${id}`);
    throw new NotFoundError(`No recipe with id ${id}`);
  }
  logger.info("Successfully get the recipe");
  res.status(StatusCodes.OK).json({
    msg: "Successfully get the recipe",
    recipe,
  });
};

export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const user_Id = req.user.userId;

  const recipe = await Recipe.findOne({
    _id: id,
  });

  if (!recipe) {
    logger.error(`No recipe with id ${id}`);
    throw new NotFoundError(`No recipe with id ${id}`);
  }

  if (user_Id != recipe.createdBy) {
    logger.error("Authorization-Invalid.");
    throw new CustomAPIError("Authorization-Invalid.", StatusCodes.FORBIDDEN);
  }

  const { name, description, ingredients, steps, thumbnail } = req.body;

  if (!name) {
    logger.error("Please provide the name of the recipe");
    throw new BadRequestError("Please provide the name of the recipe");
  }
  if (!description) {
    logger.error("Please provide the description of the recipe");
    throw new BadRequestError("Please provide the description of the recipe");
  }
  if (!ingredients || ingredients.length === 0) {
    logger.error("Please provide ingredients regarding the recipe");
    throw new BadRequestError(
      "Please provide ingredients regarding the recipe"
    );
  }
  if (!steps || steps.length === 0) {
    logger.error("Please provide steps regarding the recipe");
    throw new BadRequestError("Please provide steps regarding the recipe");
  }

  if (!thumbnail) {
    logger.error("Please provide image regarding the recipe");
    throw new BadRequestError("Please provide image regarding the recipe");
  }

  const newRecipe = await Recipe.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  logger.info("Successfully updated the Recipe");
  res
    .status(StatusCodes.OK)
    .json({ msg: "Successfully updated the Recipe", newRecipe });
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipe.findByIdAndDelete({
    _id: id,
  });

  if (!recipe) {
    logger.error(`No recipe with id ${id}`);
    throw new NotFoundError(`No recipe with id ${id}`);
  }

  logger.info("Successfully deleted recipe");
  res
    .status(StatusCodes.OK)
    .json({ msg: "Successfully deleted recipe", recipe });
};
