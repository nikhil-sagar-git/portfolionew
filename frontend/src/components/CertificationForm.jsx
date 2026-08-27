import { useState } from "react";
import * as api from "../services/api.js";

const emptyForm = {
  title: "",
  issuer: "",
  date: "",
  credentialId: "",
  credentialUrl: "",
};

const CertificationForm = ({ existing, onClose, onSaved }) => {
  const [form, setForm] = useState(
    existing
      ? {
          title: existing.title || "",
          issuer: existing.issuer || "",
          date: existing.date || "",
          credentialId: existing.credentialId || "",
          credentialUrl: existing.credentialUrl || "",
        }
      : emptyForm
  );
  const [skills, setSkills] = useState(existing?.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(existing?.image || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

  const addSkill = () => {
    const value = skillInput.trim();
    if (value && !skills.includes(value)) {
      setSkills([...skills, value]);
    }
    setSkillInput("");
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.issuer || !form.date) {
      setError("Title, issuer, and date are required.");
      return;
    }

    setSaving(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      data.append("skills", JSON.stringify(skills));
      if (imageFile) data.append("image", imageFile);

      if (existing) {
        await api.updateCertification(existing._id, data);
      } else {
        await api.createCertification(data);
      }
      onSaved();
    } catch (err) {
      setError(err.message || "Failed to save certification.");
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
        <h3>{existing ? "Edit Certification" : "Add Certification"}</h3>

        {error && <p className="form-error">{error}</p>}

        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Issuer</label>
            <input type="text" name="issuer" value={form.issuer} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="text"
              name="date"
              placeholder="e.g. Mar 2026"
              value={form.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Credential ID</label>
            <input
              type="text"
              name="credentialId"
              value={form.credentialId}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Credential URL</label>
            <input
              type="url"
              name="credentialUrl"
              value={form.credentialUrl}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Skills</label>
          <div className="form-tags">
            {skills.map((skill) => (
              <span className="form-tag" key={skill}>
                {skill}
                <button type="button" onClick={() => removeSkill(skill)}>
                  ✕
                </button>
              </span>
            ))}
          </div>
          <div className="form-list-input">
            <input
              type="text"
              placeholder="Add a skill and press Enter"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <button type="button" className="btn btn-secondary" onClick={addSkill}>
              +
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Certificate Image</label>
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
            {saving ? "Saving..." : "Save Certification"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CertificationForm;
