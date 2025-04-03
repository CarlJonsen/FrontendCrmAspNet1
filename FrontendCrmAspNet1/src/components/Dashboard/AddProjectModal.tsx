import React, { useEffect, useState } from "react";
import { fetchDropdownData } from "../../services/fetchDropdownData";
import { createProject } from "../../services/createProject";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    setFormData(prev => ({
      ...prev,
      [name]: name === "budget" || name === "clientId" || name === "projectOwnerId"
        ? parseInt(value)
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      await createProject(formData);
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
      onProjectAdded();      
      onClose(); // Stänger modalen
    } catch (err) {
      console.error("Något gick fel vid skapandet av projektet", err);
      alert("Fel vid skapande av projekt");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "30px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "15px",
            right: "20px",
            fontSize: "18px",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          &times;
        </button>

        <h3 style={{ marginBottom: "20px" }}>Add Project</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Project Name</label>
            <input
              type="text"
              className="form-control"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Client Name</label>
            <select
              className="form-control"
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
            >
              <option value="">Select Client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.clientName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Project Owner</label>
            <select
              className="form-control"
              name = "projectOwnerId"
              value={formData.projectOwnerId}
              onChange={handleChange}
            >
              <option value="">Select Project Owner</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3 d-flex gap-3">
            <div style={{ flex: 1 }}>
              <label>Start Date</label>
              <input
                type="date"
                className="form-control"
                name = "startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>End Date</label>
              <input
                type="date"
                className="form-control"
                name = "endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label>Budget</label>
            <input
              type="number"
              className="form-control"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;