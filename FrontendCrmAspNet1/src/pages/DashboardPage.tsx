import React, { useState } from 'react'
import DashboardLayout from '../components/Dashboard/DashboardLayout'
import ProjectList from '../components/Dashboard/ProjectList'
import AddProjectModal from '../components/Dashboard/AddProjectModal';

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
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Add Project
        </button>
      </div>

      <ProjectList refreshTrigger={refreshTrigger} onProjectUpdated={handleProjectUpdated}/>

      {/* Modal */}
      <AddProjectModal isOpen={showModal} onClose={() => setShowModal(false)} onProjectAdded={handleProjectAdded} />
    </DashboardLayout>
  )
}

export default DashboardPage
