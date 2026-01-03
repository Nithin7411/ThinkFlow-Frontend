import { useState } from "react";
import { geminiModel } from "../firebase/firebase";

const useGemini = (editor) => {
  const [instruction, setInstruction] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const isReady = Boolean(editor);

  const generate = async () => {
    if (!instruction || !editor) return;

    setLoading(true);
    try {
      const saved = await editor.save();
      const text = saved.blocks
        .filter(b => b.type !== "header")
        .map(b => b.data.text)
        .join("\n");

      const prompt = `
Instruction:
${instruction}

Article:
${text}
`;

      const res = await geminiModel.generateContent(prompt);
      setOutput(res.response.text());
    } catch (e) {
      setOutput("AI limit reached or error occurred.");
    }
    setLoading(false);
  };

  const insertIntoEditor = async () => {
    if (!editor || !output) return;

    await editor.blocks.insert("paragraph", {
      text: output,
    });

    setOutput("");
    setInstruction("");
  };

  return {
    instruction,
    setInstruction,
    output,
    setOutput,
    generate,
    insertIntoEditor,
    loading,
    isReady,
  };
};

export default useGemini;
