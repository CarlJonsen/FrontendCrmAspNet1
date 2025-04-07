import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "270px", borderRight: "1px solid #E3E5E8",backgroundColor: "#F1F3F7", padding: "20px" }}>
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div style={{ flexGrow: 1, backgroundColor: "#F1F3F7" }}>
        <div style={{ padding: "20px", borderBottom: "1px solid #E3E5E8", backgroundColor: "#F1F3F7" }}>
          <Topbar />
        </div>

        <main style={{paddingLeft:"30px",paddingRight:"30px", paddingTop:"30px" }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;