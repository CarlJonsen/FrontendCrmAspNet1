import React from "react";
import { FaClock } from "react-icons/fa";

interface ProjectCardProps {
  projectName: string;
  clientName: string;
  description: string;
  endDate: string;
  isCompleted: boolean;
  imageUrl: string;
}

const ProjectCard = ({projectName, clientName, description, endDate, isCompleted, imageUrl}: ProjectCardProps) => {
  // Beräkna dagar kvar
  const getDaysLeft = () => {
    if (isCompleted) return "Completed";
  
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays > 6) {
      const weeks = Math.ceil(diffDays / 7);
      return `${weeks} week${weeks > 1 ? "s" : ""} left`;
    }
  
    return `${diffDays} day${diffDays > 1 ? "s" : ""} left`;
  };

  const getStatusColor = () => {
    if (isCompleted) return "#d4edda";         // Grön
    const today = new Date();
    const end = new Date(endDate);
    const diffDays = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
    if (diffDays <= 2) return "#f8d7da";       // Röd
    if (diffDays <= 6) return "#fff3cd";       // Gul
  
    return "#f2f2f2";                          // Neutral grå
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
        opacity: isCompleted ? 0.7 : 1
      }}>
      
      <div>
        {imageUrl && (<div style={{ marginBottom: "12px" }}><img src={imageUrl} alt="Project" style={{width: "100%",height: "140px",objectFit: "cover",borderRadius: "12px"}}/></div>)}
        <h5 style={{ marginBottom: "5px" }}>{projectName}</h5>
        <p style={{ fontSize: "14px", color: "#888", marginBottom: "10px" }}>{clientName}</p>
        <p style={{ fontSize: "14px", color: "#444" }}>{description}</p>
      </div>

      <div style={{ marginTop: "15px", display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#555", backgroundColor: getStatusColor(), padding: "6px 10px", borderRadius: "12px", width: "fit-content" }}>
        <FaClock size={12} />
        {getDaysLeft()}
      </div>
    </div>
  );
};

export default ProjectCard;