import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";

const email = "admin@gmail.com";
const password = "Admin@12345";

try {
  await mongoose.connect(process.env.MONGO_URI);

  const existingAdmin = await Admin.findOne({ email });

  if (existingAdmin) {
    console.log("Admin already exists.");
  } else {
    const passwordHash = await bcrypt.hash(password, 12);

    await Admin.create({
      email,
      passwordHash,
    });

    console.log("Admin created successfully.");
    console.log("Email:", email);
    console.log("Password:", password);
  }
} catch (error) {
  console.error("Error creating admin:", error);
} finally {
  await mongoose.disconnect();
}