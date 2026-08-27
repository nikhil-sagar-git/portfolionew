import { useEffect, useState } from "react";
import * as api from "../services/api.js";
import "../styles/internships.css";

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getInternships();
        setInternships(data);
      } catch (err) {
        setError(err.message || "Failed to load internships.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="page container">
      <h2 className="section-heading">Internships</h2>
      <p className="section-subheading">Where I've worked and what I built while there.</p>

      {loading && <p className="state-message">Loading internships...</p>}
      {error && !loading && <p className="state-message error">{error}</p>}

      {!loading && !error && internships.length === 0 && (
        <p className="state-message">No internships added yet.</p>
      )}

      {!loading && !error && internships.length > 0 && (
        <div className="timeline">
          <div className="timeline-rail" />
          {internships.map((intern) => (
            <div className="timeline-item" key={intern._id}>
              <span className="timeline-dot" />
              <div className="timeline-content card">
                <div className="timeline-head">
                  {intern.logo && (
                    <img src={intern.logo} alt={intern.company} className="company-logo" />
                  )}
                  <div>
                    <h3>{intern.role}</h3>
                    <h4>{intern.company}</h4>
                  </div>
                </div>
                <span className="timeline-duration">{intern.duration}</span>
                {intern.location && (
                  <span className="timeline-location">{intern.location}</span>
                )}
                {intern.description && (
                  <p className="timeline-desc">{intern.description}</p>
                )}
                {intern.highlights?.length > 0 && (
                  <ul className="timeline-highlights">
                    {intern.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
                <div className="tech-row">
                  {(intern.techStack || []).map((tech) => (
                    <span className="pill" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Internships;
