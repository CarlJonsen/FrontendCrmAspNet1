import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import apiClient from "../../services/apiClient";

interface Project {
    projectName: string;
    client: {clientName: string;};
    description: string;
    endDate: string;
  }


const ProjectList = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
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


  return (
    <div>
    {/* Loading */}
    {loading && <p>Loading projects...</p>}

    {/* Error */}
    {error && <p style={{ color: "red" }}>{error}</p>}

    {/* Project Cards */}
    {!loading && !error && (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px"
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            projectName={project.projectName}
            clientName={project.client?.clientName || "Unknown"}
            description={project.description}
            endDate={project.endDate}
          />
        ))}
      </div>
    )}
  </div>
  );
};

export default ProjectList;