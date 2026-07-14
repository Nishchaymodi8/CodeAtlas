import api from "./api";
export const githubStatus = async () => {
  const token = localStorage.getItem("access");
  console.log("TOKEN:", token);

  const response = await api.get("/github/status/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const connectGithub = async () => {
  const token = localStorage.getItem("access");

  const response = await api.get("/github/connect/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
