import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true, // send the httpOnly auth cookie
});

// Also attach the JWT from localStorage as a Bearer header. Belt-and-braces:
// works even if third-party cookies are blocked, and the backend accepts
// either the cookie or the header (see authMiddleware.js).
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize error messages so components can just read err.message.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);

// ---------- Auth ----------
export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

export const logout = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};

export const getMe = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

// ---------- Certifications ----------
export const getCertifications = async () => {
  const { data } = await api.get("/certifications");
  return data;
};

export const createCertification = async (formData) => {
  const { data } = await api.post("/certifications", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateCertification = async (id, formData) => {
  const { data } = await api.put(`/certifications/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteCertification = async (id) => {
  const { data } = await api.delete(`/certifications/${id}`);
  return data;
};

// ---------- Internships ----------
export const getInternships = async () => {
  const { data } = await api.get("/internships");
  return data;
};

export const createInternship = async (formData) => {
  const { data } = await api.post("/internships", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateInternship = async (id, formData) => {
  const { data } = await api.put(`/internships/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteInternship = async (id) => {
  const { data } = await api.delete(`/internships/${id}`);
  return data;
};

// ---------- Projects ----------
export const getProjects = async () => {
  const { data } = await api.get("/projects");
  return data;
};

export const createProject = async (formData) => {
  const { data } = await api.post("/projects", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateProject = async (id, formData) => {
  const { data } = await api.put(`/projects/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await api.delete(`/projects/${id}`);
  return data;
};

export default api;
