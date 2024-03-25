import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import router from "./routes/index.js";
import cors from "cors";

const app = express();

const { PORT, DB_URI } = process.env;
console.log(DB_URI);

// Middleware
app.use(cors());
app.use(express.json());

// ? Phương thức connect với tham số connect string
await mongoose.connect(DB_URI).then(() => {
  console.log("connect to database successfully");
});

// Router
app.use("/api", router);

// Error handler
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  return res.status(500).json({
    name: err.name,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
