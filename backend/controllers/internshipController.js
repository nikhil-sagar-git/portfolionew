import Internship from "../models/Internship.js";
import { uploadBufferToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";

const CLOUDINARY_FOLDER = "portfolio/internships";

const parseList = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.filter(Boolean);
    } catch {
      // fall through
    }
    return value.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [];
};

// GET /api/internships  (public)
export const getInternships = async (req, res, next) => {
  try {
    const internships = await Internship.find().sort({ startDate: -1, createdAt: -1 });
    res.status(200).json(internships);
  } catch (err) {
    next(err);
  }
};

// POST /api/internships  (protected)
export const createInternship = async (req, res, next) => {
  try {
    const { role, company, duration, location, description, highlights, techStack, startDate } = req.body;

    if (!role || !company || !duration) {
      return res.status(400).json({ message: "Role, company, and duration are required." });
    }

    let logo = "";
    let logoPublicId = "";

    if (req.file) {
      const result = await uploadBufferToCloudinary(req.file.buffer, CLOUDINARY_FOLDER);
      logo = result.secure_url;
      logoPublicId = result.public_id;
    }

    const internship = await Internship.create({
      role,
      company,
      duration,
      location,
      description,
      highlights: parseList(highlights),
      techStack: parseList(techStack),
      startDate: startDate ? new Date(startDate) : Date.now(),
      logo,
      logoPublicId,
    });

    res.status(201).json(internship);
  } catch (err) {
    next(err);
  }
};

// PUT /api/internships/:id  (protected)
export const updateInternship = async (req, res, next) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: "Internship not found." });
    }

    const { role, company, duration, location, description, highlights, techStack, startDate } = req.body;

    if (role !== undefined) internship.role = role;
    if (company !== undefined) internship.company = company;
    if (duration !== undefined) internship.duration = duration;
    if (location !== undefined) internship.location = location;
    if (description !== undefined) internship.description = description;
    if (highlights !== undefined) internship.highlights = parseList(highlights);
    if (techStack !== undefined) internship.techStack = parseList(techStack);
    if (startDate) internship.startDate = new Date(startDate);

    if (req.file) {
      const oldPublicId = internship.logoPublicId;
      const result = await uploadBufferToCloudinary(req.file.buffer, CLOUDINARY_FOLDER);
      internship.logo = result.secure_url;
      internship.logoPublicId = result.public_id;
      await deleteFromCloudinary(oldPublicId);
    }

    await internship.save();
    res.status(200).json(internship);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/internships/:id  (protected)
export const deleteInternship = async (req, res, next) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: "Internship not found." });
    }

    await deleteFromCloudinary(internship.logoPublicId);
    await internship.deleteOne();

    res.status(200).json({ message: "Internship deleted." });
  } catch (err) {
    next(err);
  }
};
