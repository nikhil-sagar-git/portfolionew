import { useEffect, useState } from "react";
import * as api from "../services/api.js";
import "../styles/certifications.css";

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Selected certificate for popup
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getCertifications();
        setCertifications(data);
      } catch (err) {
        setError(err.message || "Failed to load certifications.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="page container">

      <h2 className="section-heading">
        Certifications
      </h2>

      <p className="section-subheading">
        Credentials I've earned along the way, verifiable at the source.
      </p>

      {/* Loading */}
      {loading && (
        <p className="state-message">
          Loading certifications...
        </p>
      )}

      {/* Error */}
      {error && !loading && (
        <p className="state-message error">
          {error}
        </p>
      )}

      {/* No certifications */}
      {!loading && !error && certifications.length === 0 && (
        <p className="state-message">
          No certifications added yet.
        </p>
      )}

      {/* Certifications */}
      {!loading && !error && certifications.length > 0 && (
        <div className="cert-wall">

          {certifications.map((cert) => (

            <div
              className="cert-card card"
              key={cert._id}
            >

              {/* Certificate Image */}
              <div className="cert-image-frame">

                {cert.image && (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="certificate-click"
                    onClick={() =>
                      setSelectedCertificate(cert.image)
                    }
                  />
                )}

              </div>

              {/* Certificate Details */}
              <div className="cert-body">

                <h3>
                  {cert.title}
                </h3>

                <div className="cert-meta">
                  {cert.issuer} · {cert.date}
                </div>

                {cert.credentialId && (
                  <div className="cert-id">
                    ID: {cert.credentialId}
                  </div>
                )}

                <div className="tech-row">

                  {(cert.skills || []).map((skill) => (
                    <span
                      className="pill"
                      key={skill}
                    >
                      {skill}
                    </span>
                  ))}

                </div>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary cert-verify"
                  >
                    Verify Credential →
                  </a>
                )}

              </div>

            </div>

          ))}

        </div>
      )}

      {/* =================================
          CERTIFICATE POPUP
          ================================= */}

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

export default Certifications;