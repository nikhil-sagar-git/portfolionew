import { useState } from "react";
import * as api from "../services/api.js";

const emptyForm = {
  title: "",
  description: "",
  repoUrl: "",
  liveUrl: "",
};

const ProjectForm = ({ existing, onClose, onSaved }) => {
  const [form, setForm] = useState(
    existing
      ? {
          title: existing.title || "",
          description: existing.description || "",
          repoUrl: existing.repoUrl || "",
          liveUrl: existing.liveUrl || "",
        }
      : emptyForm
  );
  const [techStack, setTechStack] = useState(existing?.techStack || []);
  const [techInput, setTechInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(existing?.image || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
      setError("Only image files are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }
    setError("");
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const addTech = () => {
    const v = techInput.trim();
    if (v && !techStack.includes(v)) setTechStack([...techStack, v]);
    setTechInput("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.description) {
      setError("Title and description are required.");
      return;
    }

    setSaving(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      data.append("techStack", JSON.stringify(techStack));
      if (imageFile) data.append("image", imageFile);

      if (existing) {
        await api.updateProject(existing._id, data);
      } else {
        await api.createProject(data);
      }
      onSaved();
    } catch (err) {
      setError(err.message || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="form-overlay" onClick={onClose}>
      <form
        className="form-modal card"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h3>{existing ? "Edit Project" : "Add Project"}</h3>

        {error && <p className="form-error">{error}</p>}

        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>GitHub Repository URL</label>
            <input type="url" name="repoUrl" value={form.repoUrl} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Live URL</label>
            <input type="url" name="liveUrl" value={form.liveUrl} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label>Tech Stack</label>
          <div className="form-tags">
            {techStack.map((t) => (
              <span className="form-tag" key={t}>
                {t}
                <button
                  type="button"
                  onClick={() => setTechStack(techStack.filter((x) => x !== t))}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <div className="form-list-input">
            <input
              type="text"
              placeholder="Add a technology and press Enter"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTech();
                }
              }}
            />
            <button type="button" className="btn btn-secondary" onClick={addTech}>
              +
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Project Image</label>
          <div className="image-upload-box">
            {preview && <img src={preview} alt="Preview" className="image-preview" />}
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Save Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
