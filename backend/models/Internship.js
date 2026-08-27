import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    logo: { type: String, default: "" },
    logoPublicId: { type: String, default: "" },
    duration: { type: String, required: true, trim: true },
    location: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    highlights: { type: [String], default: [] },
    techStack: { type: [String], default: [] },
    // Used to sort "newest first" independent of createdAt, since the user
    // enters a free-text duration like "May 2025 — Jul 2025".
    startDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Internship = mongoose.model("Internship", internshipSchema);

export default Internship;
