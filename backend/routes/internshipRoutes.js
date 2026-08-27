import express from "express";
import {
  getInternships,
  createInternship,
  updateInternship,
  deleteInternship,
} from "../controllers/internshipController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getInternships);
router.post("/", protectAdmin, upload.single("logo"), createInternship);
router.put("/:id", protectAdmin, upload.single("logo"), updateInternship);
router.delete("/:id", protectAdmin, deleteInternship);

export default router;
