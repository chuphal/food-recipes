import dotenv from "dotenv";
dotenv.config();

import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import rateLimiter from "express-rate-limit";

import cookieParser from "cookie-parser";
import async_error from "express-async-errors";
import expressWinston from "express-winston";
import express from "express";
import path from "path";
const __dirname = path.resolve();
const app = express();

import connectDB from "./db/dbConfig.js";

// import routes.
import authRouter from "./routes/auth.js";
import recipeRouter from "./routes/recipe.js";
import { requestLogger, logger } from "./utils/logger.js";

//errors handlers.
import { notFoundMiddleware } from "./middlewares/not-found.js";
import { errorHandlerMiddleware } from "./middlewares/error-handler.js";

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 10000,
  })
);

app.use(express.json());
app.use(express.static("./backend/public"));
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.use(xss());
app.use(
  expressWinston.logger({
    winstonInstance: requestLogger,
    statusLevels: true,
  })
);
app.use(cookieParser());

// app.get("/", async (req, res) => {
//   res.send("Food recipes");
// });

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/recipe", recipeRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

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
