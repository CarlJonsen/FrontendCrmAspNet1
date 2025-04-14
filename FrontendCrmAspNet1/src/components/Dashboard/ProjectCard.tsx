import { FaClock } from "react-icons/fa";
import { Project } from "../../types/Project";
import ProjectCardMenu from "./ProjectCardMenu";
import { useState } from "react";
import EditProjectModal from "./Forms/EditProjectModal";
import { deleteProject } from "../../services/deleteProject";


const ProjectCard = ({ project, onProjectUpdated, onProjectDeleted}: { 
  project: Project; 
  onProjectUpdated: () => void; 
  onProjectDeleted: () => void; 
}) => {

  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this project?");
    if (!confirmed) return;

    try {
      await deleteProject(project.id);
      alert("Projektet raderades!");
      onProjectDeleted();
    } catch (err) {
      console.error("Kunde inte ta bort projekt:", err);
      alert("Något gick fel vid borttagning.");
    }
  };

  const getDaysLeft = () => {
    if (project.isCompleted) return "Completed";
    const today = new Date();
    const end = new Date(project.endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 6) {
      const weeks = Math.ceil(diffDays / 7);
      return `${weeks} week${weeks > 1 ? "s" : ""} left`;
    }
    return `${diffDays} day${diffDays > 1 ? "s" : ""} left`;
  };

  const getStatusColor = () => {
    if (project.isCompleted) return "#d4edda";         // Grön
    const today = new Date();
    const end = new Date(project.endDate);
    const diffDays = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
    if (diffDays <= 2) return "#f8d7da";       // Röd
    if (diffDays <= 6) return "#fff3cd";       // Gul
  
    return "#f2f2f2";                          // Neutral grå
  };
  
  return (
    <div
        style={{
          position: "relative",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          width: "100%",
          minHeight: "272px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "transform 0.2s ease",
          cursor: "pointer",
        }}
      >
      <ProjectCardMenu
        onEdit={() => setShowEditModal(true)}
        onDelete={handleDelete}/>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          {project.imageUrl && (
            <img
              src={project.imageUrl}
              alt="Project"
              style={{
                width: "56px",
                height: "56px",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
          )}
          <div>
            <h5 style={{ margin: 0, fontSize: "22px", fontWeight: 600, color: "#1A1926" }}>
              {project.projectName}
            </h5>
            <p style={{ margin: 0, fontSize: "15px", color: "#637085" }}>
              {project.clientName}
            </p>
          </div>
        </div>
        <p style={{ fontSize: "16px", color: "#28263B" }}>{project. description}</p>
      </div>

      <div style={{ marginTop: "15px", display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#555", backgroundColor: getStatusColor(), padding: "6px 10px", borderRadius: "12px", width: "fit-content" }}>
        <FaClock size={12} />
        {getDaysLeft()}
      </div>

      <EditProjectModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onProjectUpdated={onProjectUpdated}
        project={project}
      />
    </div>
  );
};

export default ProjectCard;