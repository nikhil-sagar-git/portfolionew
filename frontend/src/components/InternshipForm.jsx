import { useState } from "react";
import * as api from "../services/api.js";

const emptyForm = {
  role: "",
  company: "",
  duration: "",
  location: "",
  description: "",
};

const InternshipForm = ({ existing, onClose, onSaved }) => {
  const [form, setForm] = useState(
    existing
      ? {
          role: existing.role || "",
          company: existing.company || "",
          duration: existing.duration || "",
          location: existing.location || "",
          description: existing.description || "",
        }
      : emptyForm
  );
  const [highlights, setHighlights] = useState(existing?.highlights || []);
  const [highlightInput, setHighlightInput] = useState("");
  const [techStack, setTechStack] = useState(existing?.techStack || []);
  const [techInput, setTechInput] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [preview, setPreview] = useState(existing?.logo || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogoChange = (e) => {
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
    setLogoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const addToList = (value, list, setList, setInput) => {
    const v = value.trim();
    if (v && !list.includes(v)) setList([...list, v]);
    setInput("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.role || !form.company || !form.duration) {
      setError("Role, company, and duration are required.");
      return;
    }

    setSaving(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      data.append("highlights", JSON.stringify(highlights));
      data.append("techStack", JSON.stringify(techStack));
      if (logoFile) data.append("logo", logoFile);

      if (existing) {
        await api.updateInternship(existing._id, data);
      } else {
        await api.createInternship(data);
      }
      onSaved();
    } catch (err) {
      setError(err.message || "Failed to save internship.");
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
        <h3>{existing ? "Edit Internship" : "Add Internship"}</h3>

        {error && <p className="form-error">{error}</p>}

        <div className="form-row">
          <div className="form-group">
            <label>Role</label>
            <input type="text" name="role" value={form.role} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Company</label>
            <input type="text" name="company" value={form.company} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              placeholder="e.g. May 2025 — Jul 2025"
              value={form.duration}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" value={form.location} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Highlights</label>
          <div className="form-tags">
            {highlights.map((h) => (
              <span className="form-tag" key={h}>
                {h}
                <button
                  type="button"
                  onClick={() => setHighlights(highlights.filter((x) => x !== h))}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <div className="form-list-input">
            <input
              type="text"
              placeholder="Add a highlight and press Enter"
              value={highlightInput}
              onChange={(e) => setHighlightInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addToList(highlightInput, highlights, setHighlights, setHighlightInput);
                }
              }}
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                addToList(highlightInput, highlights, setHighlights, setHighlightInput)
              }
            >
              +
            </button>
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
                  addToList(techInput, techStack, setTechStack, setTechInput);
                }
              }}
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => addToList(techInput, techStack, setTechStack, setTechInput)}
            >
              +
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Company Logo</label>
          <div className="image-upload-box">
            {preview && <img src={preview} alt="Preview" className="image-preview" />}
            <input type="file" accept="image/*" onChange={handleLogoChange} />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Save Internship"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InternshipForm;
