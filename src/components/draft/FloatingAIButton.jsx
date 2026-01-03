import { useState, useRef } from "react";

const FloatingAIButton = ({ onClick }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 40, y: 200 });
  const [dragging, setDragging] = useState(false);

  const startDrag = (e) => {
    setDragging(true);
  };

  const onDrag = (e) => {
    if (!dragging) return;

    setPosition({
      x: e.clientX - 30,
      y: e.clientY - 30,
    });
  };

  const stopDrag = () => setDragging(false);

  return (
    <div
      ref={buttonRef}
      onMouseDown={startDrag}
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      onClick={onClick}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "grab",
        fontSize: 20,
        zIndex: 9999,
        boxShadow: "0 10px 30px rgba(0,0,0,.2)",
      }}
    >
      ✨
    </div>
  );
};

export default FloatingAIButton;
