import unionLogo from '/src/assets/Union.svg';
import alphaLogo from '/src/assets/Logo.svg';

const Sidebar = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={alphaLogo} alt="Alpha logo" style={{ objectFit: "contain", width: "44px", height: "44px" }}/>
        <h4 style={{fontSize:30, fontWeight: "bold", fontFamily: "'Comfortaa', sans-serif", margin: 5 }}>alpha</h4>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 20px",
          backgroundColor: "rgba(0, 128, 248, 0.15)",
          borderRadius: "16px",
          color: "#2D99FF",
          fontWeight: 500,
          cursor: "pointer",
          width: "238px",
        }}>
        <img src={unionLogo} alt="Projects" style={{ width: "20px", height: "20px" }}/>
    <span style={{ fontSize: "16px" }}>Projects</span>
  </div>
</div>
  );
};

export default Sidebar;