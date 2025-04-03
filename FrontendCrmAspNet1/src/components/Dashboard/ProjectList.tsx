import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import apiClient from "../../services/apiClient";

interface Project {
    id: number;
    projectName: string;
    description: string;
    imageUrl: string;
    startDate: string;
    endDate: string;
    budget: number;
    clientName: string;
    projectOwnerName: string;
    isCompleted: boolean;
  }
  interface ProjectListProps {
    refreshTrigger: number;
  }

const ProjectList = ({ refreshTrigger }: ProjectListProps) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | "completed">("all");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
          try {
            const response = await apiClient.get("/projects");
            setProjects(response.data); // 👈 justera om din respons ligger i ett objekt
          } catch{
            setError("Kunde inte hämta projekt från servern.");
          } finally {
            setLoading(false);
          }
        };
      
        fetchProjects();
      }, []);

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
      
          {/* Filter Buttons */}
          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <button
              onClick={() => setFilter("all")}
              style={{
                border: "none",
                backgroundColor: filter === "all" ? "#6c63ff" : "#eee",
                color: filter === "all" ? "#fff" : "#333",
                padding: "12px 24px",
                fontWeight: 600,
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              All
            </button>
      
            <button
              onClick={() => setFilter("completed")}
              style={{
                border: "none",
                backgroundColor: filter === "completed" ? "#6c63ff" : "#eee",
                color: filter === "completed" ? "#fff" : "#333",
                padding: "12px 24px",
                fontWeight: 600,
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              Completed
            </button>
          </div>
      
          {/* Grid of Project Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px"
            }}
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                projectName={project.projectName}
                clientName={project.clientName}
                description={project.description}
                endDate={project.endDate}
                isCompleted={project.isCompleted}
                imageUrl={project.imageUrl}
              />
            ))}
          </div>
        </div>
      );
};

export default ProjectList;