import api from "./api";

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register/", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login/", credentials);

  localStorage.setItem("access", response.data.access);
  localStorage.setItem("refresh", response.data.refresh);

  return response.data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("access");

  const response = await api.get("/auth/me/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};
