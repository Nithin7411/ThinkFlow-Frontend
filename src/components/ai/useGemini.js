import { useState } from "react";
import { geminiModel } from "../firebase/firebase";

const useGemini = (editor) => {
  const [instruction, setInstruction] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!editor || !instruction.trim()) return;

    setLoading(true);
    setOutput("");

    try {
      const saved = await editor.save();
      const articleText = saved.blocks
        .filter(b => b.type !== "header")
        .map(b => b.data.text || "")
        .join("\n");

      const prompt = `
SYSTEM:
You are a formatter.

FORMAT:
[TITLE], [H2], [H3], [PARA], [LIST], [QUOTE], [DIVIDER]

USER INTENT:
"${instruction}"

ARTICLE:
${articleText}

OUTPUT:
`;

      const result = await geminiModel.generateContent(prompt);
      setOutput(result.response.text());
    } catch (err) {
      console.error("Gemini error:", err);
      setOutput("Error generating AI output");
    }

    setLoading(false);
  };

  const insertIntoEditor = async () => {
    if (!editor || !output) return;

    const lines = output
      .split("\n")
      .map(l => l.trim())
      .filter(Boolean);

    for (const line of lines) {
      if (line.startsWith("[TITLE]")) {
        await editor.blocks.insert("header", { text: line.replace("[TITLE]", ""), level: 1 });
      } else if (line.startsWith("[H2]")) {
        await editor.blocks.insert("header", { text: line.replace("[H2]", ""), level: 2 });
      } else if (line.startsWith("[H3]")) {
        await editor.blocks.insert("header", { text: line.replace("[H3]", ""), level: 3 });
      } else if (line.startsWith("[PARA]")) {
        await editor.blocks.insert("paragraph", { text: line.replace("[PARA]", "") });
      } else if (line.startsWith("[LIST]")) {
        await editor.blocks.insert("list", {
          style: "unordered",
          items: line.replace("[LIST]", "").split(",").map(i => i.trim()),
        });
      } else if (line.startsWith("[QUOTE]")) {
        await editor.blocks.insert("quote", { text: line.replace("[QUOTE]", ""), caption: "" });
      } else if (line.startsWith("[DIVIDER]")) {
        await editor.blocks.insert("delimiter", {});
      }
    }
    
    setOutput("");
    setInstruction("");
    
  };

  return {
    instruction,
    setInstruction,
    output,
    loading,
    generate,
    insertIntoEditor,
    isReady: !!editor,   // helpful flag
  };
};

export default useGemini;
