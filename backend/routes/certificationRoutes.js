import express from "express";
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from "../controllers/certificationController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getCertifications);
router.post("/", protectAdmin, upload.single("image"), createCertification);
router.put("/:id", protectAdmin, upload.single("image"), updateCertification);
router.delete("/:id", protectAdmin, deleteCertification);

export default router;
