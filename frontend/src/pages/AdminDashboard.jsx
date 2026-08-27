import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import * as api from "../services/api.js";
import CertificationForm from "../components/CertificationForm.jsx";
import InternshipForm from "../components/InternshipForm.jsx";
import ProjectForm from "../components/ProjectForm.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import "../styles/admin.css";

const RESOURCES = {
  certifications: {
    label: "Certifications",
    getAll: api.getCertifications,
    remove: api.deleteCertification,
    Form: CertificationForm,
    thumb: (item) => item.image,
    title: (item) => item.title,
    subtitle: (item) => `${item.issuer} · ${item.date}`,
  },
  internships: {
    label: "Internships",
    getAll: api.getInternships,
    remove: api.deleteInternship,
    Form: InternshipForm,
    thumb: (item) => item.logo,
    title: (item) => item.role,
    subtitle: (item) => `${item.company} · ${item.duration}`,
  },
  projects: {
    label: "Projects",
    getAll: api.getProjects,
    remove: api.deleteProject,
    Form: ProjectForm,
    thumb: (item) => item.image,
    title: (item) => item.title,
    subtitle: (item) => (item.techStack || []).join(", "),
  },
};

const Section = ({ resourceKey }) => {
  const config = RESOURCES[resourceKey];
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingItem, setEditingItem] = useState(null); // null | {} (new) | item (edit)
  const [deletingItem, setDeletingItem] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await config.getAll();
      setItems(data);
    } catch (err) {
      setError(err.message || `Failed to load ${config.label.toLowerCase()}.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaved = () => {
    setEditingItem(null);
    setToast(`${config.label.slice(0, -1)} saved successfully.`);
    setTimeout(() => setToast(""), 3000);
    load();
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await config.remove(deletingItem._id);
      setDeletingItem(null);
      setToast(`${config.label.slice(0, -1)} deleted.`);
      setTimeout(() => setToast(""), 3000);
      load();
    } catch (err) {
      setError(err.message || "Failed to delete.");
      setDeletingItem(null);
    } finally {
      setDeleting(false);
    }
  };

  const FormComponent = config.Form;

  return (
    <section className="admin-section">
      <div className="admin-section-header">
        <h2>{config.label}</h2>
        <button className="btn btn-primary" onClick={() => setEditingItem({})}>
          + Add {config.label.slice(0, -1)}
        </button>
      </div>

      {toast && <p className="form-success">{toast}</p>}
      {loading && <p className="state-message">Loading {config.label.toLowerCase()}...</p>}
      {error && !loading && <p className="state-message error">{error}</p>}
      {!loading && !error && items.length === 0 && (
        <p className="state-message">No {config.label.toLowerCase()} added yet.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="admin-list">
          {items.map((item) => (
            <div className="admin-list-item card" key={item._id}>
              {config.thumb(item) && (
                <img src={config.thumb(item)} alt="" className="admin-list-thumb" />
              )}
              <div className="admin-list-info">
                <h4>{config.title(item)}</h4>
                <p>{config.subtitle(item)}</p>
              </div>
              <div className="admin-list-actions">
                <button className="btn btn-secondary" onClick={() => setEditingItem(item)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => setDeletingItem(item)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingItem !== null && (
        <FormComponent
          existing={editingItem._id ? editingItem : null}
          onClose={() => setEditingItem(null)}
          onSaved={handleSaved}
        />
      )}

      {deletingItem && (
        <ConfirmDialog
          message={`Are you sure you want to delete "${config.title(deletingItem)}"?`}
          onCancel={() => setDeletingItem(null)}
          onConfirm={handleDelete}
          confirming={deleting}
        />
      )}
    </section>
  );
};

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="container admin-header-inner">
          <h1>Portfolio Admin</h1>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="container admin-body">
        <Section resourceKey="certifications" />
        <Section resourceKey="internships" />
        <Section resourceKey="projects" />
      </div>
    </div>
  );
};

export default AdminDashboard;
