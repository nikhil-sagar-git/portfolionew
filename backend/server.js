import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import certificationRoutes from "./routes/certificationRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Allow the dev frontend and the deployed Vercel frontend.
// Avoids a wildcard "*" origin in production since credentials (cookies) are used.
const allowedOrigins = [process.env.CLIENT_ORIGIN_DEV, process.env.CLIENT_ORIGIN_PROD].filter(
  Boolean
);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow tools like curl/Postman with no origin header
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Portfolio API is running." });
});

app.use("/api/auth", authRoutes);
app.use("/api/certifications", certificationRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/projects", projectRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
