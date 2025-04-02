import React from "react";
import { FaFolderOpen } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h4 style={{ fontWeight: "bold" }}>Dashboard</h4>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
        <FaFolderOpen />
        <span>Projects</span>
      </div>

      {/* Här kan du lägga till fler menyval senare */}
    </div>
  );
};

export default Sidebar;