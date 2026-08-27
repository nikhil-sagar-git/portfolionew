import { useEffect, useState } from "react";
import * as api from "../services/api.js";
import "../styles/projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message || "Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="page container">
      <h2 className="section-heading">Projects</h2>
      <p className="section-subheading">A selection of things I've built.</p>

      {loading && <p className="state-message">Loading projects...</p>}
      {error && !loading && <p className="state-message error">{error}</p>}

      {!loading && !error && projects.length === 0 && (
        <p className="state-message">No projects added yet.</p>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="project-grid">
          {projects.map((project) => (
            <div className="project-card card" key={project._id}>
              <div className="project-image">
                {project.image && <img src={project.image} alt={project.title} />}
              </div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-row">
                  {(project.techStack || []).map((tech) => (
                    <span className="pill" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
