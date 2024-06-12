import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import { logger } from "../utils/logger.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import { StatusCodes } from "http-status-codes";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    logger.error("Please provide  name, email and password");
    throw new BadRequestError("Please provide  name, email and password");
  }
  if (password.length < 6) {
    logger.error("Password should be at least 6 charaters");
    throw new BadRequestError("Password should be at least 6 charaters");
  }

  // hash password..
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  generateTokenAndSetCookie(
    {
      username,
      userId: user._id,
    },
    res
  );
  logger.info("Successfully registered");
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Successfully registered", user });
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    logger.error("Please provide username and password");
    throw new BadRequestError("Please provide username and password");
  }

  const user = await User.findOne({ username });

  if (!user) {
    logger.error("Invalid Credentials");
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const encryptPassword = await bcrypt.compare(password, user.password || "");

  if (!encryptPassword) {
    logger.error("Invalid Credentials");
    throw new UnauthenticatedError("Invalid Credentials");
  }

  generateTokenAndSetCookie(
    {
      username,
      userId: user._id,
    },
    res
  );

  logger.info("Successfully Login");
  res.status(StatusCodes.OK).json({ msg: "Successfully login", user });
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    logger.info("Logged out successfully");
    res.status(StatusCodes.OK).json({ msg: "Logged out successfully" });
  } catch (error) {
    logger.error("Error in logout controller", error);
    throw new CustomAPIError("Server Error", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
