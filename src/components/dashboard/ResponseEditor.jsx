import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import fetchApi from "../script/fetchApi";

const ResponseEditor = ({ onNewResponse }) => {
  const editorInstance = useRef(null);
  const { id } = useParams();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [note, setNote] = useState("");

  /* 🔐 Check login (silent) */
  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const data = await fetchApi("http://localhost:8000/isLoggedIn");
        setIsLoggedIn(Boolean(data.isLoggedIn));
      } catch (err) {
        console.error("Auth check failed", err);
      }
    };

    checkLoggedInStatus();
  }, []);

  /* ✍️ Init Editor (always editable) */
  useEffect(() => {
    const responseEditor = new EditorJS({
      holder: "editorjs",
      placeholder: "What are your thoughts?",
      tools: {
        paragraph: Paragraph,
      },
      onReady: () => {
        editorInstance.current = responseEditor;
      },
    });

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  const showNote = (msg) => {
    setNote(msg);
    setTimeout(() => setNote(""), 4000);
  };

  const saveResponse = async () => {
    if (!editorInstance.current) return;

    try {
      const savedData = await editorInstance.current.save();
      const text = savedData.blocks[0]?.data?.text?.trim();

      if (!text) return;

      // 🚫 Not logged in → explain WHY
      if (!isLoggedIn) {
        showNote(
          "Login to continue — this helps prevent spam and ensures genuine responses."
        );
        return;
      }

      const payload = {
        id: savedData.blocks[0]?.id || "",
        response: text,
      };

      const response = await fetch(
        `http://localhost:8000/story/${id}/response`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Response failed");

      const result = await response.json();
      onNewResponse?.(result);

      editorInstance.current.clear();
    } catch (error) {
      console.error("Error saving response:", error);
    }
  };

  return (
    <div className="response-editor-wrapper">
      <div id="editorjs" className="editorjs-response"></div>

      <button
        onClick={saveResponse}
        className="respondButton"
        type="button"
      >
        Respond
      </button>

      {note && <p className="auth-note">{note}</p>}
    </div>
  );
};

export default ResponseEditor;
