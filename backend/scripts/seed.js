// Seeds example certifications, internships, and projects so the portfolio
// isn't empty right after setup. Uses external placeholder image URLs
// directly (no Cloudinary upload needed) - replace these from the admin
// panel whenever you're ready.
//
// Run with: npm run seed

import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Certification from "../models/Certification.js";
import Internship from "../models/Internship.js";
import Project from "../models/Project.js";

dotenv.config();

const certifications = [
  {
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    date: "Mar 2026",
    credentialId: "AWS-SAA-000000",
    credentialUrl: "https://www.credly.com/",
    image: "https://placehold.co/600x400/111818/35d0ba?text=AWS+SAA",
    skills: ["AWS", "EC2", "S3", "IAM"],
  },
  {
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta",
    date: "Nov 2025",
    credentialId: "META-FE-000000",
    credentialUrl: "https://www.coursera.org/",
    image: "https://placehold.co/600x400/111818/35d0ba?text=Meta+Frontend",
    skills: ["React", "JavaScript", "UI/UX"],
  },
];

const internships = [
  {
    role: "Software Engineering Intern",
    company: "Nimbus Cloud Labs",
    logo: "https://placehold.co/200x200/111818/35d0ba?text=NCL",
    duration: "May 2025 — Jul 2025",
    location: "Bengaluru, India (Hybrid)",
    description: "Worked on developer tools and internal applications.",
    highlights: [
      "Built React dashboards",
      "Created REST APIs",
      "Improved application performance",
    ],
    techStack: ["React", "Node.js", "MongoDB", "Docker"],
    startDate: new Date("2025-05-01"),
  },
];

const projects = [
  {
    title: "AGRIHUB",
    description: "AI-based smart agriculture platform for crop monitoring and yield prediction.",
    image: "https://placehold.co/600x400/111818/35d0ba?text=AGRIHUB",
    techStack: ["React", "Node.js", "Python", "MongoDB"],
    repoUrl: "https://github.com/nikhil-sagar-git",
    liveUrl: "",
  },
  {
    title: "Spam Detection System",
    description: "ML-based classifier for detecting spam messages using NLP techniques.",
    image: "https://placehold.co/600x400/111818/35d0ba?text=Spam+Detection",
    techStack: ["Python", "scikit-learn", "NLP"],
    repoUrl: "https://github.com/nikhil-sagar-git",
    liveUrl: "",
  },
  {
    title: "AI Interview Portal",
    description: "Platform that runs mock technical interviews with AI-generated feedback.",
    image: "https://placehold.co/600x400/111818/35d0ba?text=AI+Interview",
    techStack: ["React", "Node.js", "LangChain"],
    repoUrl: "https://github.com/nikhil-sagar-git",
    liveUrl: "",
  },
  {
    title: "Voice Assistant",
    description: "A voice-controlled assistant for everyday tasks and quick lookups.",
    image: "https://placehold.co/600x400/111818/35d0ba?text=Voice+Assistant",
    techStack: ["Python", "Speech Recognition"],
    repoUrl: "https://github.com/nikhil-sagar-git",
    liveUrl: "",
  },
  {
    title: "RAG AI Assistant",
    description: "Retrieval-augmented generation assistant for answering questions over documents.",
    image: "https://placehold.co/600x400/111818/35d0ba?text=RAG+Assistant",
    techStack: ["Python", "LangChain", "LangGraph", "RAG"],
    repoUrl: "https://github.com/nikhil-sagar-git",
    liveUrl: "",
  },
];

const run = async () => {
  await connectDB();

  await Certification.deleteMany({});
  await Internship.deleteMany({});
  await Project.deleteMany({});

  await Certification.insertMany(certifications);
  await Internship.insertMany(internships);
  await Project.insertMany(projects);

  console.log("Seed data inserted successfully.");

  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
