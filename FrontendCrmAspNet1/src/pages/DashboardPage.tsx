import React, { useState } from 'react'
import DashboardLayout from '../components/Dashboard/DashboardLayout'
import ProjectList from '../components/Dashboard/ProjectList'
import AddProjectModal from '../components/Dashboard/Forms/AddProjectModal';

const DashboardPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleProjectAdded = () => {
    setRefreshTrigger(prev => prev + 1) // Trigga omrendering
    setShowModal(false) // Stäng modal
  }
  const handleProjectUpdated = () => {
    setRefreshTrigger(prev => prev + 1);
  }

  return (
    <DashboardLayout>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
      <button
        onClick={() => setShowModal(true)}
        style={{display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#2D99FF",
        color: "#fff", border: "2px solid white", borderRadius: "12px", padding: "10px 35px", fontSize: "15px",fontWeight: 600,}}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1b82e6")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2D99FF")}>
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>+</span> Add Project
      </button>
      </div>

      <ProjectList refreshTrigger={refreshTrigger} onProjectUpdated={handleProjectUpdated}/>

      {/* Modal */}
      <AddProjectModal isOpen={showModal} onClose={() => setShowModal(false)} onProjectAdded={handleProjectAdded} />
    </DashboardLayout>
  )
}

export default DashboardPage
