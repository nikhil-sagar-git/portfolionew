import { personalInfo } from "../data/portfolioData.js";
import "../styles/contact.css";

const Contact = () => {
  const { email, phone, location, socials } = personalInfo;

  return (
    <div className="page container">
      <h2 className="section-heading">Contact</h2>
      <p className="section-subheading">Feel free to reach out through any of these.</p>

      <div className="contact-grid">
        {email && (
          <a href={`mailto:${email}`} className="contact-item card">
            <span>Email</span>
            <strong>{email}</strong>
          </a>
        )}

        {phone && (
          <a href={`tel:${phone}`} className="contact-item card">
            <span>Phone</span>
            <strong>{phone}</strong>
          </a>
        )}

        {location && (
          <div className="contact-item card">
            <span>Location</span>
            <strong>{location}</strong>
          </div>
        )}

        {socials?.github && (
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item card"
          >
            <span>GitHub</span>
            <strong>{socials.github.replace("https://", "")}</strong>
          </a>
        )}

        {socials?.linkedin && (
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item card"
          >
            <span>LinkedIn</span>
            <strong>{socials.linkedin.replace("https://", "")}</strong>
          </a>
        )}

        {socials?.leetcode && (
          <a
            href={socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item card"
          >
            <span>LeetCode</span>
            <strong>{socials.leetcode.replace("https://", "")}</strong>
          </a>
        )}
      </div>
    </div>
  );
};

export default Contact;
