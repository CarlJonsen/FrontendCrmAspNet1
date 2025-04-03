import { CreateProjectRequest } from "../types/Project";
import apiClient from "./apiClient";


export const createProject = async (data: CreateProjectRequest) => {
  return await apiClient.post("/projects", data);
};