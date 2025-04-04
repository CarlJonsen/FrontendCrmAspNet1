import apiClient from "./apiClient";
import { CreateProjectRequest } from "../types/Project"; // Samma typ funkar

export const updateProject = async (id: number, data: CreateProjectRequest) => {
  return await apiClient.put(`/projects/${id}`, data);
};