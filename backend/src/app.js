/** @format */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import { AuthRouter } from "./routes/AuthRouter.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", AuthRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Your server is running on http://localhost:${PORT}`);
  connectDB();
});
