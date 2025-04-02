import React from "react";
import { FaClock } from "react-icons/fa";

interface ProjectCardProps {
  projectName: string;
  clientName: string;
  description: string;
  endDate: string; // ISO-datum
}

const ProjectCard = ({ projectName, clientName, description, endDate }: ProjectCardProps) => {
  // Beräkna dagar kvar
  const getDaysLeft = () => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime(); 
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 0 ? "Expired" : `${diffDays} day${diffDays > 1 ? "s" : ""} left`;
  };
  

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
        width: "300px",
        minHeight: "180px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h5 style={{ marginBottom: "5px" }}>{projectName}</h5>
        <p style={{ fontSize: "14px", color: "#888", marginBottom: "10px" }}>{clientName}</p>
        <p style={{ fontSize: "14px", color: "#444" }}>{description}</p>
      </div>

      <div style={{ marginTop: "15px", display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#555", backgroundColor: "#f2f2f2", padding: "6px 10px", borderRadius: "12px", width: "fit-content" }}>
        <FaClock size={12} />
        {getDaysLeft()}
      </div>
    </div>
  );
};

export default ProjectCard;