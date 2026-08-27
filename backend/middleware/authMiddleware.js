import jwt from "jsonwebtoken";

/**
 * Protects admin-only routes. Reads the JWT from:
 *   1. an httpOnly "token" cookie (preferred), or
 *   2. an "Authorization: Bearer <token>" header (fallback / for tools like Postman)
 *
 * Never trust the frontend's idea of "logged in" - this middleware is the
 * only thing that actually gates POST/PUT/DELETE on the API.
 */
export const protectAdmin = (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized. Please log in." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // { id, email }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Session expired. Please log in again." });
  }
};
