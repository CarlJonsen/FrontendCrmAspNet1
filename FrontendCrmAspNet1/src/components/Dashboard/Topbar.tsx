
import { FaUserCircle } from "react-icons/fa";

const Topbar = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: "15px"
    }}>
      <FaUserCircle size={28} />
      <span style={{ fontWeight: 500 }}>My Profile</span>
    </div>
  );
};

export default Topbar;