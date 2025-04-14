import { useRef, useEffect, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

const ProjectCardMenu = ({ onEdit, onDelete, }: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div style={{ position: "absolute", top: "15px", right: "15px" }}>
    <button
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "4px",
        borderRadius: "6px",
      }}
      onClick={() => setShowMenu(!showMenu)}
    >
      <FaEllipsisH style={{ color: "#637085", fontSize: "18px" }} />
    </button>

    {showMenu && (
      <div
        ref={menuRef}
        style={{
          position: "absolute",
          top: "35px",
          right: 0,
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
          width: "160px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "14px",
            color: "#1A1926",
            transition: "background 0.2s",
            borderBottom: "1px solid #f0f0f0",
          }}
          onClick={() => {
            setShowMenu(false);
            onEdit();
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f7f9")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <span style={{ fontSize: "16px" }}>✏️</span> Edit
        </div>
        <div
          style={{
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "14px",
            color: "#F04438",
            transition: "background 0.2s",
          }}
          onClick={() => {
            setShowMenu(false);
            onDelete();
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#fef2f2")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <span style={{ fontSize: "16px" }}>🗑️</span> Delete Project
        </div>
      </div>
    )}
  </div>
  );
};

export default ProjectCardMenu;
