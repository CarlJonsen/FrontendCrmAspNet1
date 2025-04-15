import React, { useEffect, useState } from "react";
import { Project } from "../../../types/Project";
import { fetchDropdownData } from "../../../services/fetchDropdownData";
import FormInput from "../shared/FormInput";
import FormTextarea from "../shared/FormTextarea";
import FormSelect from "../shared/FormSelect";
import FormStatusSelect from "../shared/FormStatusSelect";
import { updateProject } from "../../../services/updateProject";
import { uploadImage } from "../../../services/uploadImage";
import ImageUploader from "../shared/ImageUploader";

interface Props {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onProjectUpdated: () => void;
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

const EditProjectModal = ({ project, isOpen, onClose, onProjectUpdated }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    imageUrl: "",
    startDate: "",
    endDate: "",
    budget: 0,
    projectOwnerId: 0,
    clientId: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      return local.toISOString().split("T")[0];
    };
    setFormData({
      projectName: project.projectName,
      description: project.description || "",
      imageUrl: project.imageUrl || "",
      startDate: formatDate(project.startDate),
      endDate: formatDate(project.endDate),
      budget: project.budget,
      projectOwnerId: project.projectOwnerId,
      clientId: project.clientId,
      isCompleted: project.isCompleted ?? false,
    });
  }, [project]);

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

 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "isCompleted"
          ? value === "true"
          : ["budget", "clientId", "projectOwnerId"].includes(name)
          ? parseInt(value)
          : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      setFormData((prev) => ({ ...prev, imageUrl }));
    } catch (err) {
      console.error("Fel vid bilduppladdning:", err);
      alert("Kunde inte ladda upp bilden.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
  
    if (!formData.projectName) newErrors.projectName = "Project name is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.startDate) newErrors.startDate = "Start date is required.";
    if (!formData.endDate) newErrors.endDate = "End date is required.";
    if (!formData.budget || formData.budget <= 0) newErrors.budget = "Budget must be greater than 0.";
    if (!formData.clientId) newErrors.clientId = "Client is required.";
    if (!formData.projectOwnerId) newErrors.projectOwnerId = "Project owner is required.";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    const updatedFormData = {
      ...formData,
      endDate: formData.isCompleted
        ? new Date().toISOString().split("T")[0]
        : formData.endDate,
    };
  
    try {
      await updateProject(project.id, updatedFormData);
      alert("Projektet uppdaterades!");
      onProjectUpdated();
      onClose();
    } catch (err) {
      console.error("Något gick fel:", err);
      alert("Kunde inte uppdatera projektet.");
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

        <h3 style={{ marginBottom: "20px" }}>Edit Project</h3>

        <form onSubmit={handleSubmit}>
        <ImageUploader
          imageUrl={formData.imageUrl}
          onImageChange={handleImageUpload}
        />
        <FormInput
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
          <FormInput
            label="Project Name"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            error={errors.projectName}
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
            error={errors.clientId}
          />
          <FormTextarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
          />
          <div className="d-flex gap-3">
            <FormInput
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              error={errors.startDate}
            />
            <FormInput
              label="End Date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              error={errors.endDate}
              disabled={formData.isCompleted}
            />
          </div>
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
            error={errors.projectOwnerId}
          />
          <FormInput
            label="Budget"
            name="budget"
            type="number"
            value={formData.budget}
            onChange={handleChange}
            error={errors.budget}
          />
          <FormStatusSelect
            name="isCompleted"
            value={formData.isCompleted}
            onChange={handleChange}
            error={errors.isCompleted}
          />

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProjectModal;