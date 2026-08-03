import api from "@/lib/api";
const getToken = () => localStorage.getItem("access");

export const getGithubRepositories = async () => {
  const response = await api.get("/github/repositories/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
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
        Authorization: `Bearer ${getToken()}`,
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
export const getRepositoryDetails = async (repoName) => {
  const response = await api.get(`/repositories/${repoName}/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const cloneRepository = async (repoName) => {
  const response = await api.post(
    `/repositories/${repoName}/clone/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );

  return response.data;
};
export const getRepositoryFiles = async (repoName) => {
  const response = await api.get(`/repositories/${repoName}/files/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const getFileContent = async (repoName, path) => {
  const response = await api.get(`/repositories/${repoName}/file/`, {
    params: {
      path,
    },
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};
