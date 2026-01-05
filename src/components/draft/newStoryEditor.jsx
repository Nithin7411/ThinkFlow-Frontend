import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Navbar/Navbar";
import StoryEditor from "./storyEditor";
import useGemini from "../ai/useGemini";
import FloatingAIButton from "./FloatingAIButton";
import "../draft/style.css";

const NewStoryEditor = () => {
  const location = useLocation();
  const draftData = location.state?.draft;

  const [storyId, setStoryId] = useState(draftData ? draftData.id : null);
  const [editorData, setEditorData] = useState(
    draftData
      ? { title: draftData.title, content: draftData.content }
      : { title: "", content: [] }
  );
  const [saveMessage, setSaveMessage] = useState("");
  const[coverUrl,setCoverUrl] = useState("");
  const [storytags, setTags] = useState([]);

  const [editorRef, setEditorRef] = useState(null);
  const [layoutState, setLayoutState] = useState("layout-editor");

  const gemini = useGemini(editorRef);

  const saveData = async () => {
    const payload = {
      storyId,
      title: editorData.title,
      content: editorData.content,
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/story`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        const result = await res.json();
        setStoryId(result.storyId);
        setSaveMessage(result.status);
      }
    } catch {}
  };

  useEffect(() => {
    if (editorData.title || editorData.content.length > 0) {
      saveData();
    }
  }, [editorData.title, editorData.content]);

  useEffect(() => {
    if (!saveMessage) return;
    const t = setTimeout(() => setSaveMessage(""), 1500);
    return () => clearTimeout(t);
  }, [saveMessage]);

  const publishStory = async (storyId, tags, coverImageUrl) => {
    setTags(tags);
     setCoverUrl(coverImageUrl);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/story/${storyId}/publish`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tags , coverImageUrl }),
        }
      );

      if (res.ok) {
        setSaveMessage("Story published successfully!");
      }
    } catch {}
  };

  const toggleGeminiPrompt = () => {
    if (layoutState === "layout-gemini-prompt") {
      setLayoutState("layout-editor");
      gemini.setInstruction("");
      return;
    }

    gemini.setOutput("");
    setLayoutState("layout-gemini-prompt");
  };

  const generateFromGemini = async () => {
    await gemini.generate();
    setLayoutState("layout-gemini-output");
  };

  const acceptGemini = () => {
    gemini.insertIntoEditor();
    gemini.setOutput("");
    gemini.setInstruction("");
    setLayoutState("layout-editor");
  };

  const rejectGemini = () => {
    gemini.setOutput("");
    gemini.setInstruction("");
    setLayoutState("layout-editor");
  };

  return (
    <>
      <Header
        onClick={publishStory}
        data={editorData}
        storyId={storyId}
        setTags={setTags}
      />

      {saveMessage && <div className="save-message">Draft saved</div>}
     
      <FloatingAIButton onClick={toggleGeminiPrompt} />

      <div className={`editor-shell ${layoutState}`}>

        {layoutState === "layout-gemini-prompt" && (
          <aside className="gemini-panel">
            <h4>Ask Gemini</h4>

            <textarea
              placeholder="Tell AI what to do…"
              value={gemini.instruction}
              onChange={(e) => gemini.setInstruction(e.target.value)}
            />

            <button
              className="primary"
              onClick={generateFromGemini}
              disabled={!gemini.isReady || gemini.loading}
            >
              {gemini.loading ? "Thinking…" : "Generate"}
            </button>

            <button className="ghost" onClick={rejectGemini}>
              Cancel
            </button>
          </aside>
        )}


        <main className="editor-main">
          <div className="editor-content">
            <StoryEditor
              initialStory={editorData}
              onStoryChange={setEditorData}
              onEditorReady={setEditorRef}
            />
          </div>
        </main>

        {layoutState === "layout-gemini-output" && (
          <aside className="gemini-panel right">
            <h4>AI Suggestion</h4>

            <textarea readOnly value={gemini.output} />

            <button className="primary" onClick={acceptGemini}>
              Accept
            </button>

            <button className="ghost" onClick={rejectGemini}>
              Reject
            </button>
          </aside>
        )}

      </div>
    </>
  );
};

export default NewStoryEditor;
