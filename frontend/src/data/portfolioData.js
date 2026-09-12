// Static personal info - this is the only piece of portfolio content that
// stays in a frontend file. Certifications, internships, and projects are
// managed dynamically through the admin CMS and MongoDB (see services/api.js).

export const personalInfo = {
  name: "Rasala Nikhil",
  title: "FULL-STACK DEVELOPER & AI/ML ENGINEER",
  tagline: "I build clean, dependable web products and tinker with machine learning on the side.",
  location: "Hyderabad, Telangana, India",
  email: "rasalanikhil@gmail.com",
  phone: "+91 9381727940",
  profileImage: "/images/phot1.jpeg",
  resumeUrl: "/resume.pdf",

  about:
    "I'm a final-year Computer Science student who likes turning fuzzy problems into working software. Most of my time goes into full-stack web development with React and Node, but I've spent the last year going deeper into applied machine learning — recommendation systems, NLP pipelines, and practical AI applications. I care about clear interfaces, readable code, and shipping things that actually get used.",

  socials: {
    github: "https://github.com/nikhil-sagar-git",
    linkedin: "",
    leetcode: "",
  },

  skills: [
    {
      category: "Languages",
      items: ["JavaScript", "TypeScript", "Python", "Java", "SQL"],
    },
    {
      category: "Frontend",
      items: ["React", "Redux", "Next.js", "HTML", "CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "REST APIs", "MongoDB", "MySQL"],
    },
    {
      category: "AI / ML",
      items: [
        "Python",
        "Pandas",
        "NumPy",
        "scikit-learn",
        "PyTorch",
        "Machine Learning",
        "NLP",
        "Generative AI",
        "RAG",
        "LangChain",
        "LangGraph",
      ],
    },
    {
      category: "Tools",
      items: ["Git", "GitHub", "Docker", "Postman", "Figma", "AWS"],
    },
  ],

  education: [
    {
      id: "edu-1",
      degree: "B.Tech in Computer Science & Engineering",
      duration: "2022 — 2026",
    },
    {
      id: "edu-2",
      degree: "Senior Secondary",
      duration: "2020 — 2022",
    },
  ],
};
