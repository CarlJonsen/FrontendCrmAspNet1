import apiClient from "./apiClient";

export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
  
    const response = await apiClient.post("/blob/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  
    // 👇 Returnera bara strängen
    return response.data.imageUrl;
  };