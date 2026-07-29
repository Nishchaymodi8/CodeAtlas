import api from "./api";

export async function connectGitHub() {
  const token = localStorage.getItem("access");

  const response = await api.get("/github/connect/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  window.location.href = response.data.url;
}
