import { logger } from "../utils/logger.js";
import { CustomAPIError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);

  if (err.code && err.code === 11000) {
    logger.error(
      `Duplicate value entered for ${Object.keys(
        err.keyValue
      )} field, please choose another value`
    );
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `Duplicate value entered for ${Object.keys(
        err.keyValue
      )} field, please choose another value`,
    });
  }

  if (err.name === "CastError") {
    logger.error(`No recipe found with id : ${err.value}`);
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `No recipe found with id : ${err.value}`,
    });
  }
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  console.log("error handler", err);
  return res.status(500).json({ msg: err });
};

export { errorHandlerMiddleware };
