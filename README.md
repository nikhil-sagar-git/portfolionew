# Rasala Nikhil — Portfolio + Admin CMS

A full-stack developer portfolio with a secure admin dashboard for managing
Certifications, Internships, and Projects dynamically — no code edits needed
to add new content.

## Overview

- Public site: Home, Internships, Certifications, Projects, Contact
- Hidden admin panel at `/admin` (linked only via a small "🔐 Verify Portfolio
  Owner" button in the footer)
- Certifications, Internships, and Projects live in MongoDB and are managed
  through the admin dashboard — changes are visible to every visitor
  immediately
- Images are uploaded through the admin panel straight to Cloudinary; MongoDB
  only stores the resulting URL
- Personal info (name, title, tagline, skills, education, etc.) stays in a
  static frontend file (`frontend/src/data/portfolioData.js`) since it rarely
  changes

## Tech Stack

| Layer      | Tech                                        |
|------------|----------------------------------------------|
| Frontend   | React, Vite, React Router, Axios, plain CSS   |
| Backend    | Node.js, Express                              |
| Database   | MongoDB + Mongoose                            |
| Auth       | JWT + bcryptjs (httpOnly cookie + Bearer token) |
| Images     | Multer (memory storage) + Cloudinary          |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas, Cloudinary |

## Folder Structure

```
portfolio/
├── backend/
│   ├── config/          db.js, cloudinary.js
│   ├── controllers/     auth, certification, internship, project
│   ├── middleware/      authMiddleware, uploadMiddleware, errorMiddleware
│   ├── models/          Admin, Certification, Internship, Project
│   ├── routes/          authRoutes, certificationRoutes, internshipRoutes, projectRoutes
│   ├── scripts/         createAdmin.js, seed.js
│   ├── .env.example
│   └── server.js
└── frontend/
    ├── public/           images/, resume.pdf
    └── src/
        ├── components/   Navbar, Footer, ProtectedRoute, *Form, ConfirmDialog
        ├── context/      AuthContext
        ├── pages/        Home, Certifications, Internships, Projects, Contact, AdminLogin, AdminDashboard
        ├── services/     api.js
        ├── data/         portfolioData.js (static personal info)
        └── styles/       one CSS file per page/component
```

## 1. Prerequisites

- Node.js 18+ and npm
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account
- A free [Cloudinary](https://cloudinary.com/users/register/free) account

## 2. MongoDB Atlas Setup

1. Create a free cluster at cloud.mongodb.com.
2. Under **Database Access**, create a database user with a username/password.
3. Under **Network Access**, add your IP (or `0.0.0.0/0` for development —
   tighten this before going to production).
4. Click **Connect → Drivers**, copy the connection string, and drop it into
   `backend/.env` as `MONGO_URI` (replace `<password>` and add a database
   name, e.g. `/portfolio` before the `?`).

## 3. Cloudinary Setup

1. Sign up at cloudinary.com.
2. On your Dashboard you'll see **Cloud Name**, **API Key**, and **API
   Secret** — copy all three into `backend/.env`.
3. No manual folder creation needed — `portfolio/certifications`,
   `portfolio/internships`, and `portfolio/projects` folders are created
   automatically on first upload.

## 4. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and fill in:

```
PORT=5000
MONGO_URI=<your Atlas connection string>
JWT_SECRET=<a long random string>
CLOUDINARY_CLOUD_NAME=<...>
CLOUDINARY_API_KEY=<...>
CLOUDINARY_API_SECRET=<...>
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=<pick a strong password — do NOT reuse "edu@123">
CLIENT_ORIGIN_DEV=http://localhost:5173
CLIENT_ORIGIN_PROD=https://your-portfolio.vercel.app
```

Create the admin account (hashes the password with bcrypt and stores it in
MongoDB — the plaintext password is never saved):

```bash
npm run create-admin
```

Seed some example certifications/internships/projects so the site isn't
empty (optional — skip this and add everything yourself through `/admin` if
you'd rather start blank):

```bash
npm run seed
```

Run the backend:

```bash
npm run dev
```

It should print `Server running on port 5000` and `MongoDB connected: ...`.

## 5. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

`.env` should contain:

```
VITE_API_URL=http://localhost:5000
```

Add your real photo at `frontend/public/images/profile.jpg` and your résumé
at `frontend/public/resume.pdf` (placeholders are there now).

Run the frontend:

```bash
npm run dev
```

Visit `http://localhost:5173`.

## 6. Local Testing Checklist

- [ ] Home, Internships, Certifications, Projects, Contact all load without
      errors
- [ ] Certifications/Internships/Projects pages show "Loading..." briefly,
      then either data or "No X added yet."
- [ ] Footer shows "🔐 Verify Portfolio Owner" — clicking it goes to
      `/admin/login`
- [ ] Visiting `/admin` directly while logged out redirects to
      `/admin/login`
- [ ] Logging in with the wrong password shows "Invalid credentials."
- [ ] Logging in with the correct email/password lands on `/admin`
- [ ] **Add Certification**: fill the form, upload an image, save → appears
      instantly in the admin list
- [ ] Open the public Certifications page in another tab → the new
      certification appears there too
- [ ] **Edit** a certification without changing the image → old image is
      kept
- [ ] **Edit** a certification with a new image → image is replaced (old one
      removed from Cloudinary)
- [ ] **Delete** a certification → confirmation dialog appears → confirming
      removes it everywhere
- [ ] Repeat the Add/Edit/Delete checks for Internships and Projects
- [ ] Uploading a non-image file is rejected with "Only image files are
      allowed."
- [ ] Uploading an image over 5MB is rejected with "Image size must be less
      than 5MB."
- [ ] **Logout** clears the session and redirects to `/admin/login`
- [ ] Refreshing the page while logged into `/admin` keeps you logged in
- [ ] Contact page's LinkedIn/LeetCode links don't appear (and don't crash
      the page) when those fields are empty

## 7. Deployment

### Backend → Render

1. Push the `backend/` folder to a GitHub repo (make sure `.env` is in
   `.gitignore` and never committed).
2. On [Render](https://render.com), create a **New Web Service**, connect
   the repo, and set:
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`
3. Add all the same environment variables from your local `.env` in Render's
   **Environment** tab (use your real production `CLIENT_ORIGIN_PROD` once
   you know your Vercel URL).
4. Deploy. Once live, run `npm run create-admin` and `npm run seed` once
   from Render's shell (or locally against the same `MONGO_URI`) to set up
   the admin account and initial data against the production database.

### Frontend → Vercel

1. Push `frontend/` to GitHub (same repo or separate).
2. On [Vercel](https://vercel.com), import the project, set the root
   directory to `frontend`.
3. Add environment variable:
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```
4. Deploy.
5. Go back to Render and set `CLIENT_ORIGIN_PROD` to your actual Vercel URL,
   then redeploy the backend so CORS allows it.

### MongoDB Atlas (production)

- Once your Render backend has a static outbound IP (or if you're fine with
  it), narrow **Network Access** from `0.0.0.0/0` to Render's IP ranges for
  better security. Otherwise, ensure your Atlas user password is strong.

## 8. Security Notes

- The initial admin password is only for first login — change it by editing
  `ADMIN_PASSWORD` in the backend `.env` and re-running `npm run create-admin`
  (it detects the existing account and updates the hash).
- The JWT is set as an **httpOnly cookie** (can't be read by JavaScript, so
  it's the primary auth mechanism and safe from XSS token theft) and also
  returned in the login response body so the frontend can keep a simple
  "logged in" flag in `localStorage`. Every write (POST/PUT/DELETE) is
  re-verified server-side by `protectAdmin` regardless of what the frontend
  believes — the frontend flag is convenience only, never trusted for
  authorization.
- No secrets (Mongo URI, Cloudinary secret, JWT secret, admin password) ever
  touch frontend code — they live only in the backend's `.env`.
- Uploaded images are validated for MIME type and capped at 5MB, both on the
  frontend (fast feedback) and the backend (the actual enforcement).

## 9. Adding Content Going Forward

You never need to touch this codebase again to add a new certification,
internship, or project:

1. Go to `https://your-portfolio.vercel.app`
2. Scroll to the footer → **🔐 Verify Portfolio Owner**
3. Log in
4. Click **+ Add Certification / Internship / Project**, fill the form,
   upload an image, save
5. It's live for every visitor immediately
