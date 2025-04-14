import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import apiClient from "../../services/apiClient";
import { Project } from "../../types/Project";

  interface ProjectListProps {
    refreshTrigger: number;
    onProjectUpdated: () => void;
  }

const ProjectList = ({ refreshTrigger, onProjectUpdated }: ProjectListProps) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | "completed">("all");
    const [error, setError] = useState("");


      useEffect(() => {
        const fetchProjects = async () => {
          try {
            const response = await apiClient.get('/projects')
            setProjects(response.data)
          } catch {
            setError('Kunde inte hämta projekt från servern.')
          } finally {
            setLoading(false)
          }
        }
    
        fetchProjects()
      }, [refreshTrigger]) 

      const filteredProjects = projects.filter(project =>
        filter === "completed" ? project.isCompleted : !project.isCompleted
      );

      return (
        <div>
          {/* Loading */}
          {loading && <p>Loading projects...</p>}
      
          {/* Error */}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <h3 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "30px", color: "#1A1926",}}>
            Projects
          </h3>
          
          {/* Filter Buttons */}
          <div style={{borderBottom: "1px solid #E3E5E8", marginBottom: "16px"}}>
          <div style={{ display: "flex", gap: "40px" }}>
            <button
              onClick={() => setFilter("all")}
              style={{
                border: "none",
                background: "none",
                color: filter === "all" ? "#2D99FF" : "#637085",
                fontWeight: filter === "all" ? 800 : 700,
                fontSize: "14px",
                borderBottom: filter === "all" ? "2px solid #2D99FF" : "none",
                paddingBottom: "6px",
                cursor: "pointer",
              }}
            >
              ALL [{projects.filter(p => !p.isCompleted).length}]
            </button>

            <button
              onClick={() => setFilter("completed")}
              style={{
                border: "none",
                background: "none",
                color: filter === "completed" ? "#2D99FF" : "#637085",
                fontWeight: filter === "completed" ? 800 : 700,
                fontSize: "14px",
                borderBottom: filter === "completed" ? "2px solid #2D99FF" : "none",
                paddingBottom: "6px",
                cursor: "pointer",
              }}
            >
              COMPLETED [{projects.filter(p => p.isCompleted).length}]
            </button>
          </div>
          </div>

      
          {/* Grid of Project Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",
              gap: "30px",
              justifyContent: "center",
            }}
          >
            {filteredProjects.map((project) => (
              <ProjectCard 
              key={project.id} 
              project={project} 
              onProjectUpdated={onProjectUpdated} 
              onProjectDeleted={onProjectUpdated}
              />))}
          </div>
        </div>
      );
};

export default ProjectList;