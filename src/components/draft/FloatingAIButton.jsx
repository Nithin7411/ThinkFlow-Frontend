import { useState } from "react";

const FloatingAIButton = ({ onClick }) => {
  const [pos, setPos] = useState({ x: 40, y: 200 });
  const [drag, setDrag] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "grab",
        zIndex: 9999,
      }}
      onMouseDown={() => setDrag(true)}
      onMouseUp={() => setDrag(false)}
      onMouseMove={(e) =>
        drag && setPos({ x: e.clientX - 28, y: e.clientY - 28 })
      }
      onClick={onClick}
    >
      ✨
    </div>
  );
};

export default FloatingAIButton;
