import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";
import { logger } from "../utils/logger.js";

const authentication = (req, res, next) => {
  const token = req.cookies.jwt;
  // console.log(token);
  if (!token) {
    logger.error("Authentication Invalid. No token found");
    throw new UnauthenticatedError("Authentication Invalid. No token found");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      userId: payload.userId,
      username: payload.username,
    };
    // console.log("payload", req.user);
    next();
  } catch (error) {
    console.log("auth-error", error);
    logger.error("Authentication Invalid");
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

export default authentication;
