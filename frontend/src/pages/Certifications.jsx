// import { useEffect, useState } from "react";
// import * as api from "../services/api.js";
// import "../styles/certifications.css";

// const Certifications = () => {
//   const [certifications, setCertifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const data = await api.getCertifications();
//         setCertifications(data);
//       } catch (err) {
//         setError(err.message || "Failed to load certifications.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, []);

//   return (
//     <div className="page container">
//       <h2 className="section-heading">Certifications</h2>
//       <p className="section-subheading">
//         Credentials I've earned along the way, verifiable at the source.
//       </p>

//       {loading && <p className="state-message">Loading certifications...</p>}
//       {error && !loading && <p className="state-message error">{error}</p>}

//       {!loading && !error && certifications.length === 0 && (
//         <p className="state-message">No certifications added yet.</p>
//       )}

//       {!loading && !error && certifications.length > 0 && (
//         <div className="cert-wall">
//           {certifications.map((cert) => (
//             <div className="cert-card card" key={cert._id}>
//               <div className="cert-image-frame">
//                 {cert.image && <img src={cert.image} alt={cert.title} />}
//               </div>
//               <div className="cert-body">
//                 <h3>{cert.title}</h3>
//                 <div className="cert-meta">
//                   {cert.issuer} · {cert.date}
//                 </div>
//                 {cert.credentialId && (
//                   <div className="cert-id">ID: {cert.credentialId}</div>
//                 )}
//                 <div className="tech-row">
//                   {(cert.skills || []).map((skill) => (
//                     <span className="pill" key={skill}>
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//                 {cert.credentialUrl && (
//                   <a
//                     href={cert.credentialUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="btn btn-secondary cert-verify"
//                   >
//                     Verify Credential →
//                   </a>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Certifications;






import { useEffect, useState } from "react";
import * as api from "../services/api.js";
import "../styles/certifications.css";

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

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

  // Close image popup
  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="page container">
      <h2 className="section-heading">Certifications</h2>

      <p className="section-subheading">
        Credentials I've earned along the way, verifiable at the source.
      </p>

      {loading && (
        <p className="state-message">
          Loading certifications...
        </p>
      )}

      {error && !loading && (
        <p className="state-message error">
          {error}
        </p>
      )}

      {!loading && !error && certifications.length === 0 && (
        <p className="state-message">
          No certifications added yet.
        </p>
      )}

      {!loading && !error && certifications.length > 0 && (
        <div className="cert-wall">
          {certifications.map((cert) => (
            <div className="cert-card card" key={cert._id}>

              <div
                className="cert-image-frame"
                onClick={() => cert.image && setSelectedImage(cert.image)}
              >
                {cert.image && (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="cert-image"
                  />
                )}
              </div>

              <div className="cert-body">
                <h3>{cert.title}</h3>

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
                    <span className="pill" key={skill}>
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

      {/* Image Popup */}
      {selectedImage && (
        <div
          className="image-modal"
          onClick={closeImage}
        >
          <button
            className="image-modal-close"
            onClick={closeImage}
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt="Certificate"
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Certifications;


