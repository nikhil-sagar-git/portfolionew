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
    "Aspiring AI and Full-Stack Developer with a strong interest in Artificial Intelligence, Machine Learning, Generative AI, Agentic ai and web development. Experienced in building projects. Passionate about developing real-world AI-powered applications and seeking opportunities as an AI/ML Engineer, Generative AI Developer, or Full-Stack Developer where I can apply my skills and continue learning.",

  socials: {
    github: "https://github.com/nikhil-sagar-git",
    linkedin: "",
    leetcode: "",
  },

  skills: [
    {
      category: "Languages",
      items: ["JavaScript","Python", "Java","C"],
    },
    {
      category: "MERN STACK",
      items: ["React.js","Node.js","Express","SQL","Mongo DB","HTML", "CSS"],
    },
    {
      category: "Machine Learning & Deep Learning",
      items: [
        "Python",
        "Pandas",
        "NumPy",
        "scikit-learn",
        "tensor flow",
        "Jupyter Notebook",
        "CNN",
        "ANN",
        "RNN",
      ],
    },
    {
      category:"Devops",
      items:["AWS","Jenkins","ubuntu","Docker","Render","Vercel"]
    },
    {
      category:"Natural Language Processing",
      items:["Spacy","NLTK","BERT","FastText"]
    },
    {
      category:"Artificial Intelligence",
      items:["Generative AI","Agentic AI","Prompt Engineering","Lang Chain","Lang Graph","Retrieval Augmented Generation"]
    },
    {
      category: "Tools",
      items: ["Git", "GitHub", "Postman","MongoDB Atlas","MongoDB Compass","Kaggle","Docker Desktop"],
    }
  ],

  education: [
    {
      id: "edu-1",
      school:"Maturi Venkata Subba rao Engineering College",
      degree: "B.Tech in Computer Science & Engineering",
      duration: "2023 — Currently pursuing(2027)",
      percentage:"87.3"
    },
    {
      id: "edu-2",
      school:"Narayana Junior College",
      degree: "Senior Secondary",
      duration: "2021 — 2023",
      percentage:"98"
    },
    {
      id: "edu-3",
      school:"Geetha Vidyalayam High School",
      degree: "SSC",
      duration: "2021",
      percentage:"100"
    },
  ],
};
