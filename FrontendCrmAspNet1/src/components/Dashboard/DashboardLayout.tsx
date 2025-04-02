import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "220px", backgroundColor: "#f8f9fa", padding: "20px" }}>
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div style={{ flexGrow: 1, backgroundColor: "#f4f6fa" }}>
        <div style={{ padding: "20px", borderBottom: "1px solid #ddd", backgroundColor: "#fff" }}>
          <Topbar />
        </div>

        <main style={{ padding: "30px" }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;