import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import async_error from "express-async-errors";
import expressWinston from "express-winston";
import express from "express";
const app = express();

import connectDB from "./db/dbConfig.js";

// import routes.
import authRouter from "./routes/auth.js";
import recipeRouter from "./routes/recipe.js";
import { requestLogger, logger } from "./utils/logger.js";

//errors handlers.
import { notFoundMiddleware } from "./middlewares/not-found.js";
import { errorHandlerMiddleware } from "./middlewares/error-handler.js";

app.use(express.json());

app.use(
  expressWinston.logger({
    winstonInstance: requestLogger,
    statusLevels: true,
  })
);
app.use(cookieParser());

app.get("/", async (req, res) => {
  res.send("Food recipes");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/recipe", recipeRouter);

app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
  })
);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log("start error", error);
  }
};

start();
