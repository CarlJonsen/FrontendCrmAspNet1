import React, { useEffect, useState } from "react";
import { fetchDropdownData } from "../../services/fetchDropdownData";
import { createProject } from "../../services/createProject";
import FormInput from "./shared/FormInput";
import FormSelect from "./shared/FormSelect";
import FormTextarea from "./shared/FormTextArea";
import { uploadImage } from "../../services/uploadImage";

interface AddProjectModalProps {
  onClose: () => void;
  isOpen: boolean;
  onProjectAdded: () => void;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

interface Client {
  id: number;
  clientName: string;
}

const AddProjectModal = ({ isOpen, onClose, onProjectAdded }: AddProjectModalProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    imageUrl: "",
    startDate: "",
    endDate: "",
    budget: 0,
    projectOwnerId: 0,
    clientId: 0,
  });

  useEffect(() => {
    const loadDropdowns = async () => {
      try {
        const { users, clients } = await fetchDropdownData();
        setUsers(users);
        setClients(clients);
      } catch (err) {
        console.error("Kunde inte hämta användare eller klienter:", err);
      }
    };

    loadDropdowns();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageFile(file); // ⬅️ vi laddar inte upp direkt längre
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: ["budget", "clientId", "projectOwnerId"].includes(name)
        ? parseInt(value)
        : value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      let imageUrl = formData.imageUrl;

      if (selectedImageFile) {
        imageUrl = await uploadImage(selectedImageFile);
      }
  
      const projectData = {
        ...formData,
        imageUrl: imageUrl,
      };
  
      console.log("Skickar till backend:", JSON.stringify(projectData, null, 2));
  
      await createProject(projectData);
      alert("Projektet skapades!");
  
      setFormData({
        projectName: "",
        description: "",
        imageUrl: "",
        startDate: "",
        endDate: "",
        budget: 0,
        projectOwnerId: 0,
        clientId: 0,
      });
  
      setSelectedImageFile(null); // Glöm inte detta om du vill nollställa bildvalet
      onProjectAdded();
      onClose();
    } catch (err) {
      console.error("Något gick fel vid skapandet av projektet", err);
      alert("Fel vid skapande av projekt");
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex", justifyContent: "center", alignItems: "center",
      zIndex: 9999,
    }}>
      <div style={{
        backgroundColor: "#fff", borderRadius: "12px", padding: "30px",
        width: "100%", maxWidth: "500px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)", position: "relative"
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: "15px", right: "20px",
          fontSize: "18px", border: "none", background: "none", cursor: "pointer"
        }}>
          &times;
        </button>

        <h3 style={{ marginBottom: "20px" }}>Add Project</h3>

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Project Name"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
          />

          <FormTextarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <div className="mb-3">
            <label>Upload Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <FormInput
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />

          <FormSelect
            label="Client"
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
            options={clients.map((client) => ({
              value: client.id,
              label: client.clientName
            }))}
            placeholder="Select Client"
          />

          <FormSelect
            label="Project Owner"
            name="projectOwnerId"
            value={formData.projectOwnerId}
            onChange={handleChange}
            options={users.map((user) => ({
              value: user.id,
              label: `${user.firstName} ${user.lastName}`
            }))}
            placeholder="Select Owner"
          />

          <div className="d-flex gap-3">
            <FormInput
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
            />
            <FormInput
              label="End Date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>

          <FormInput
            label="Budget"
            name="budget"
            type="number"
            value={formData.budget}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
