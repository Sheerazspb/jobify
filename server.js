import "express-async-errors";
import express from "express";
const app = express();
import morgan from "morgan";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
dotenv.config();
// routers
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
// middleware
import  errorHandlerMiddleware  from "./middleware/errorHandlerMiddleware.js";
import {authenticateUser} from "./middleware/authMiddleware.js";
// public folder to upload images
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import cloudinary from "cloudinary";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET 
});

const __dirname = dirname(fileURLToPath(import.meta.url));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, './client/dist')));




if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());

app.use("/api/v1/jobs",authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser,userRouter);
app.use("/api/v1/auth", authRouter);

app.get("*",(req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// Error handling
app.use("*",(req, res) => {
  res.status(404).json({ message: "not found" });
});
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
  });
  console.log("Database connected");
} catch (error) {
  console.log(error);
  process.exit(1);
}


