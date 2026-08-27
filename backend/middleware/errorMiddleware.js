import multer from "multer";

export const notFound = (req, res, next) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

// Central error handler - keep it last in the middleware chain in server.js.
export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Multer-specific errors (file too large, wrong type via fileFilter, etc.)
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "Image size must be less than 5MB." });
    }
    return res.status(400).json({ message: err.message });
  }

  if (err.message && err.message.includes("Only image files are allowed")) {
    return res.status(400).json({ message: err.message });
  }

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(", ") });
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID format." });
  }

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message || "Something went wrong on the server.",
  });
};
