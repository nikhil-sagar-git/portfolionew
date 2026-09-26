import { useEffect, useState } from "react";
import * as api from "../services/api.js";
import "../styles/internships.css";

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Stores the image that is currently opened
  const [selectedCertificate, setSelectedCertificate] = useState(null);

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

      <h2 className="section-heading">
        Internships
      </h2>

      <p className="section-subheading">
        Where I've worked and what I built while there.
      </p>

      {/* Loading */}
      {loading && (
        <p className="state-message">
          Loading internships...
        </p>
      )}

      {/* Error */}
      {error && !loading && (
        <p className="state-message error">
          {error}
        </p>
      )}

      {/* No internships */}
      {!loading && !error && internships.length === 0 && (
        <p className="state-message">
          No internships added yet.
        </p>
      )}

      {/* Internships */}
      {!loading && !error && internships.length > 0 && (
        <div className="timeline">

          <div className="timeline-rail" />

          {internships.map((intern) => (
            <div
              className="timeline-item"
              key={intern._id}
            >

              {/* Timeline dot */}
              <span className="timeline-dot" />

              <div className="timeline-content card">

                {/* Header */}
                <div className="timeline-head">

                  {/* Certificate / Logo image */}
                  {intern.logo && (
                    <img
                      src={intern.logo}
                      alt={`${intern.company} certificate`}
                      className="company-logo certificate-click"
                      onClick={() =>
                        setSelectedCertificate(intern.logo)
                      }
                    />
                  )}

                  <div>
                    <h3>
                      {intern.role}
                    </h3>

                    <h4>
                      {intern.company}
                    </h4>
                  </div>

                </div>

                {/* Duration */}
                <span className="timeline-duration">
                  {intern.duration}
                </span>

                {/* Location */}
                {intern.location && (
                  <span className="timeline-location">
                    {intern.location}
                  </span>
                )}

                {/* Description */}
                {intern.description && (
                  <p className="timeline-desc">
                    {intern.description}
                  </p>
                )}

                {/* Highlights */}
                {intern.highlights?.length > 0 && (
                  <ul className="timeline-highlights">

                    {intern.highlights.map((h, i) => (
                      <li key={i}>
                        {h}
                      </li>
                    ))}

                  </ul>
                )}

                {/* Technologies */}
                <div className="tech-row">

                  {(intern.techStack || []).map((tech) => (
                    <span
                      className="pill"
                      key={tech}
                    >
                      {tech}
                    </span>
                  ))}

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

      {/* =========================
          CERTIFICATE POPUP
         ========================= */}

      {selectedCertificate && (
        <div
          className="certificate-overlay"
          onClick={() =>
            setSelectedCertificate(null)
          }
        >

          {/* Close button */}
          <button
            className="certificate-close"
            onClick={() =>
              setSelectedCertificate(null)
            }
          >
            ✕
          </button>

          {/* Large certificate */}
          <img
            src={selectedCertificate}
            alt="Certificate"
            className="certificate-popup-image"
            onClick={(e) =>
              e.stopPropagation()
            }
          />

        </div>
      )}

    </div>
  );
};

export default Internships;