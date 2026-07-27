import api from "@/lib/api";
const getToken = () => localStorage.getItem("access");

export const getGithubRepositories = async () => {
  const response = await api.get("/github/repositories/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const importRepository = async (repoName) => {
  const response = await api.post(
    "/repositories/import/",
    {
      repo_name: repoName,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
export const getImportedRepositories = async () => {
  const response = await api.get("/repositories/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};
