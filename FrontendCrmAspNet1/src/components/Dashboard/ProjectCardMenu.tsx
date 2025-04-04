import React, { useRef, useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

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
        }}
        onClick={() => setShowMenu(!showMenu)}
      >
        <FaEllipsisV />
      </button>

      {showMenu && (
        <div
          ref={menuRef}
          style={{
            position: "absolute",
            top: "30px",
            right: 0,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
            zIndex: 10,
            minWidth: "120px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "10px 16px",
              cursor: "pointer",
              borderBottom: "1px solid #eee",
            }}
            onClick={() => {
              setShowMenu(false);
              onEdit();
            }}
          >
            ✏️ Edit
          </div>
          <div
            style={{
              padding: "10px 16px",
              cursor: "pointer",
            }}
            onClick={() => {
              setShowMenu(false);
              onDelete();
            }}
          >
            🗑️ Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCardMenu;
