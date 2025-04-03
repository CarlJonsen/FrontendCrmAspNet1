import apiClient from "./apiClient";

export const fetchDropdownData = async () => {
  const usersRes = await apiClient.get("/users");
  const clientsRes = await apiClient.get("/clients");

  return {
    users: usersRes.data,
    clients: clientsRes.data,
  };
};