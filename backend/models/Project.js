import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },
    techStack: { type: [String], default: [] },
    repoUrl: { type: String, trim: true, default: "" },
    liveUrl: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
