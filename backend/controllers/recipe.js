import { logger } from "../utils/logger.js";
import NodeCache from "node-cache";

import {
  BadRequestError,
  CustomAPIError,
  NotFoundError,
} from "../errors/index.js";
import Recipe from "../models/Recipe.js";
import { StatusCodes } from "http-status-codes";

const myCache = new NodeCache();

export const getAllRecipes = async (req, res) => {
  const { page, search } = req.query;
  const limit = 5;
  const offSet = (page - 1) * limit;

  const searchName = search ? search : "";
  let recipes = [];
  if (myCache.has("recipes" + "_" + String(page) + searchName)) {
    recipes = JSON.parse(
      myCache.get("recipes" + "_" + String(page) + searchName)
    );
  } else {
    recipes = await Recipe.find({
      $or: [
        { name: { $regex: ".*" + searchName + ".*", $options: "i" } },
        { ingredients: { $regex: ".*" + searchName + ".*", $options: "i" } },
        { foodtype: { $regex: ".*" + searchName + ".*", $options: "i" } },
        { country: { $regex: ".*" + searchName + ".*", $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    myCache.set(
      "recipes" + "_" + String(page) + searchName,
      JSON.stringify(recipes),
      600
    );
  }

  if (recipes.length === 0) {
    logger.error("Currently, No recipe is available");
    throw new NotFoundError("Currently, No recipe is available");
  }

  let recipeCount = recipes.length;
  let totalPages = Math.ceil(recipes.length / limit);

  if (page) {
    recipes = recipes.slice(offSet, offSet + limit);
  }

  logger.info("Successfully get all the recipes");
  res.status(StatusCodes.OK).json({
    recipeCount,
    totalPages,
    currentPage: page,
    msg: "Successfully get all the recipes",
    recipes,
  });
};

export const createRecipe = async (req, res) => {
  const {
    name,
    description1,
    description2,
    ingredients,
    steps,
    foodtype,
    country,
  } = req.body;

  const imagePath = req.file ? req.file.filename : "";

  if (!name) {
    logger.error("Please provide the name of the recipe");
    throw new BadRequestError("Please provide the name of the recipe");
  }
  if (!description1) {
    logger.error("Please provide the short description of the recipe");
    throw new BadRequestError(
      "Please provide the short description of the recipe"
    );
  }
  if (!description2) {
    logger.error("Please provide the long description of the recipe");
    throw new BadRequestError(
      "Please provide the long description of the recipe"
    );
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

  if (!imagePath) {
    logger.error("Please provide image regarding the recipe");
    throw new BadRequestError("Please provide image regarding the recipe");
  }
  if (!foodtype) {
    logger.error("Please provide foodtype regarding the recipe");
    throw new BadRequestError("Please provide foodtype regarding the recipe");
  }
  if (!country) {
    logger.error("Please provide country regarding the recipe");
    throw new BadRequestError("Please provide country regarding the recipe");
  }

  const data1 = JSON.parse(ingredients);
  const data2 = JSON.parse(steps);
  const newObject = {
    name,
    description1,
    description2,
    ingredients: data1,
    steps: data2,
    image: imagePath,
    createdBy: req.user.userId,
    foodtype,
    country,
  };

  const recipe = await Recipe.create(newObject);

  const keys = myCache.keys();
  const filtered_keys = keys.filter((key) => key.startsWith("recipes" + "_"));
  filtered_keys.map((key) => myCache.del(key));

  logger.info("Recipe created Successfully");
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Recipe created Successfully", recipe });
};

export const getSingleRecipe = async (req, res) => {
  const { id } = req.params;
  let recipe = [];
  if (myCache.has("recipe" + "#" + id)) {
    recipe = myCache.get("recipe" + "#" + id);
  } else {
    recipe = await Recipe.findOne({
      _id: id,
    });

    if (!recipe) {
      logger.error(`No recipe with id ${id}`);
      throw new NotFoundError(`No recipe with id ${id}`);
    }
    myCache.set("recipe" + "#" + id, recipe, 600);
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

  const {
    name,
    description1,
    description2,
    ingredients,
    steps,
    foodtype,
    country,
  } = req.body;
  const imagePath = req.file ? req.file.filename : "";

  if (!name) {
    logger.error("Please provide the name of the recipe");
    throw new BadRequestError("Please provide the name of the recipe");
  }
  if (!description1) {
    logger.error("Please provide the short description of the recipe");
    throw new BadRequestError(
      "Please provide the short description of the recipe"
    );
  }
  if (!description2) {
    logger.error("Please provide the long description of the recipe");
    throw new BadRequestError(
      "Please provide the long description of the recipe"
    );
  }

  if (ingredients.length === 0) {
    logger.error("Please provide ingredients regarding the recipe");
    throw new BadRequestError(
      "Please provide ingredients regarding the recipe"
    );
  }
  if (steps.length === 0) {
    logger.error("Please provide steps regarding the recipe");
    throw new BadRequestError("Please provide steps regarding the recipe");
  }

  if (!imagePath) {
    logger.error("Please provide image regarding the recipe");
    throw new BadRequestError("Please provide image regarding the recipe");
  }
  if (!foodtype) {
    logger.error("Please provide foodtype regarding the recipe");
    throw new BadRequestError("Please provide foodtype regarding the recipe");
  }
  if (!country) {
    logger.error("Please provide country regarding the recipe");
    throw new BadRequestError("Please provide country regarding the recipe");
  }
  const data1 = JSON.parse(ingredients);
  const data2 = JSON.parse(steps);
  const newObject = {
    name,
    description1,
    description2,
    ingredients: data1,
    steps: data2,
    image: imagePath,
    createdBy: req.user.userId,
    foodtype,
    country,
  };

  myCache.del("recipe" + "#" + id);

  const keys = myCache.keys();
  const filtered_keys = keys.filter((key) => key.startsWith("recipes" + "_"));
  filtered_keys.map((key) => myCache.del(key));

  const newRecipe = await Recipe.findByIdAndUpdate({ _id: id }, newObject, {
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
  const user_Id = req.user.userId;

  const recipe = await Recipe.findOne({
    _id: id,
  });

  if (!recipe) {
    logger.error(`No recipe with id ${id}`);
    throw new NotFoundError(`No recipe with id ${id}`);
  }

  myCache.del("recipe" + "#" + id);

  const keys = myCache.keys();
  const filtered_keys = keys.filter((key) => key.startsWith("recipes" + "_"));
  filtered_keys.map((key) => myCache.del(key));

  if (user_Id != recipe.createdBy) {
    logger.error("Authorization-Invalid.");
    throw new CustomAPIError("Authorization-Invalid.", StatusCodes.FORBIDDEN);
  }

  await Recipe.findByIdAndDelete({
    _id: id,
  });

  logger.info("Successfully deleted recipe");

  res
    .status(StatusCodes.OK)
    .json({ msg: "Successfully deleted recipe", recipe });
};
