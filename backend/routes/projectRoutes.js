import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/", protectAdmin, upload.single("image"), createProject);
router.put("/:id", protectAdmin, upload.single("image"), updateProject);
router.delete("/:id", protectAdmin, deleteProject);

export default router;
