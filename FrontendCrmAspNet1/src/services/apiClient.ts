import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://backenda-ekbuaqhueaeyetb3.swedencentral-01.azurewebsites.net/api",
  });

  apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    const apiKey = "A9f4XZ!73sKD91hf@ksl02zMB_82hdkZ";
  
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  
    config.headers["x-api-key"] = apiKey;
  
    return config;
  });
  
  export default apiClient;