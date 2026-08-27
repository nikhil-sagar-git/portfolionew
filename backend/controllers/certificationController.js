import Certification from "../models/Certification.js";
import { uploadBufferToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";

const CLOUDINARY_FOLDER = "portfolio/certifications";

const parseSkills = (skills) => {
  if (Array.isArray(skills)) return skills.filter(Boolean);
  if (typeof skills === "string") {
    try {
      const parsed = JSON.parse(skills);
      if (Array.isArray(parsed)) return parsed.filter(Boolean);
    } catch {
      // fall through to comma-split
    }
    return skills.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [];
};

// GET /api/certifications  (public)
export const getCertifications = async (req, res, next) => {
  try {
    const certifications = await Certification.find().sort({ createdAt: -1 });
    res.status(200).json(certifications);
  } catch (err) {
    next(err);
  }
};

// POST /api/certifications  (protected)
export const createCertification = async (req, res, next) => {
  try {
    const { title, issuer, date, credentialId, credentialUrl, skills } = req.body;

    if (!title || !issuer || !date) {
      return res.status(400).json({ message: "Title, issuer, and date are required." });
    }

    let image = "";
    let imagePublicId = "";

    if (req.file) {
      const result = await uploadBufferToCloudinary(req.file.buffer, CLOUDINARY_FOLDER);
      image = result.secure_url;
      imagePublicId = result.public_id;
    }

    const certification = await Certification.create({
      title,
      issuer,
      date,
      credentialId,
      credentialUrl,
      skills: parseSkills(skills),
      image,
      imagePublicId,
    });

    res.status(201).json(certification);
  } catch (err) {
    next(err);
  }
};

// PUT /api/certifications/:id  (protected)
export const updateCertification = async (req, res, next) => {
  try {
    const certification = await Certification.findById(req.params.id);
    if (!certification) {
      return res.status(404).json({ message: "Certification not found." });
    }

    const { title, issuer, date, credentialId, credentialUrl, skills } = req.body;

    if (title !== undefined) certification.title = title;
    if (issuer !== undefined) certification.issuer = issuer;
    if (date !== undefined) certification.date = date;
    if (credentialId !== undefined) certification.credentialId = credentialId;
    if (credentialUrl !== undefined) certification.credentialUrl = credentialUrl;
    if (skills !== undefined) certification.skills = parseSkills(skills);

    if (req.file) {
      const oldPublicId = certification.imagePublicId;
      const result = await uploadBufferToCloudinary(req.file.buffer, CLOUDINARY_FOLDER);
      certification.image = result.secure_url;
      certification.imagePublicId = result.public_id;
      await deleteFromCloudinary(oldPublicId);
    }

    await certification.save();
    res.status(200).json(certification);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/certifications/:id  (protected)
export const deleteCertification = async (req, res, next) => {
  try {
    const certification = await Certification.findById(req.params.id);
    if (!certification) {
      return res.status(404).json({ message: "Certification not found." });
    }

    await deleteFromCloudinary(certification.imagePublicId);
    await certification.deleteOne();

    res.status(200).json({ message: "Certification deleted." });
  } catch (err) {
    next(err);
  }
};
