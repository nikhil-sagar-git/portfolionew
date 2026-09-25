import { personalInfo } from "../data/portfolioData.js";
import "../styles/home.css";

const Home = () => {
  const { name, title, tagline, location, about, skills, education, profileImage, resumeUrl } =
    personalInfo;

  return (
    <div className="page container">
      {/* Hero */}
      <section className="hero">
        <div>
          <p className="hero-eyebrow">PORTFOLIO</p>
          <h1>{name}</h1>
          <p className="hero-title">{title}</p>
          <p className="hero-tagline">{tagline}</p>
          <p className="hero-location">{location}</p>
          {/* <div className="hero-actions">
            <a href={resumeUrl} className="btn btn-primary" download>
              Download Résumé
            </a>
            <a href="/contact" className="btn btn-secondary">
              Contact Me
            </a>
          </div> */}
        </div>
        <div className="hero-photo-wrap">
          <img src={profileImage} alt={name} className="hero-photo" />
        </div>
      </section>

      {/* About */}
      <section className="about-block">
        <h2 className="section-heading">About Me</h2>
        <p>{about}</p>
      </section>

      {/* Skills */}
      <section className="skills-block">
        <h2 className="section-heading">Skills</h2>
        <div className="skills-grid">
          {skills.map((group) => (
            <div className="skill-card card" key={group.category}>
              <h4>{group.category}</h4>
              <div className="skill-pills">
                {group.items.map((item) => (
                  <span className="pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="education-block">
        <h2 className="section-heading">Education</h2>
        {education.map((edu) => (
          <div className="education-item card" key={edu.id}>
            <h3>{edu.school}</h3>
            <h3>{edu.degree}</h3>
            <span>percentage{edu.percentage}</span>
            <span>{edu.duration}</span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
