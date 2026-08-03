import api from "./api";

const getToken = () => localStorage.getItem("access");

export async function connectGitHub() {
  const response = await api.get("/github/connect/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  window.location.href = response.data.url;
}

export async function githubStatus() {
  const response = await api.get("/github/status/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
}
