import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    credentialId: { type: String, trim: true, default: "" },
    credentialUrl: { type: String, trim: true, default: "" },
    image: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },
    skills: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Certification = mongoose.model("Certification", certificationSchema);

export default Certification;
