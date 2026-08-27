// Creates (or updates the password of) the initial admin account,
// using ADMIN_EMAIL / ADMIN_PASSWORD from .env.
//
// Run with: npm run create-admin

import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";

dotenv.config();

const run = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env before running this script.");
    process.exit(1);
  }

  await connectDB();

  const passwordHash = await bcrypt.hash(password, 10);

  const existing = await Admin.findOne({ email: email.toLowerCase().trim() });

  if (existing) {
    existing.passwordHash = passwordHash;
    await existing.save();
    console.log(`Admin account for ${email} already existed - password updated.`);
  } else {
    await Admin.create({ email: email.toLowerCase().trim(), passwordHash });
    console.log(`Admin account created for ${email}.`);
  }

  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error("Failed to create admin:", err);
  process.exit(1);
});
