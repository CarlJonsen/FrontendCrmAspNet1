import apiClient from "./apiClient";

export const deleteProject = async (id: number) => {
  return await apiClient.delete(`/projects/${id}`);
};