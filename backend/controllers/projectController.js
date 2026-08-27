import Project from "../models/Project.js";
import { uploadBufferToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";

const CLOUDINARY_FOLDER = "portfolio/projects";

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

// GET /api/projects  (public)
export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

// POST /api/projects  (protected)
export const createProject = async (req, res, next) => {
  try {
    const { title, description, techStack, repoUrl, liveUrl } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required." });
    }

    let image = "";
    let imagePublicId = "";

    if (req.file) {
      const result = await uploadBufferToCloudinary(req.file.buffer, CLOUDINARY_FOLDER);
      image = result.secure_url;
      imagePublicId = result.public_id;
    }

    const project = await Project.create({
      title,
      description,
      techStack: parseList(techStack),
      repoUrl,
      liveUrl,
      image,
      imagePublicId,
    });

    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

// PUT /api/projects/:id  (protected)
export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    const { title, description, techStack, repoUrl, liveUrl } = req.body;

    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;
    if (techStack !== undefined) project.techStack = parseList(techStack);
    if (repoUrl !== undefined) project.repoUrl = repoUrl;
    if (liveUrl !== undefined) project.liveUrl = liveUrl;

    if (req.file) {
      const oldPublicId = project.imagePublicId;
      const result = await uploadBufferToCloudinary(req.file.buffer, CLOUDINARY_FOLDER);
      project.image = result.secure_url;
      project.imagePublicId = result.public_id;
      await deleteFromCloudinary(oldPublicId);
    }

    await project.save();
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/projects/:id  (protected)
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    await deleteFromCloudinary(project.imagePublicId);
    await project.deleteOne();

    res.status(200).json({ message: "Project deleted." });
  } catch (err) {
    next(err);
  }
};
