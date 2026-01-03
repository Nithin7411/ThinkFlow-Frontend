import { geminiModel } from "../firebase/firebase";

export const generateWithGemini = async (article, instruction) => {
  const prompt = `
You are an AI writing assistant.

User instruction:
"${instruction}"

Rules:
- Follow instruction strictly
- Do not add false info
- Keep original meaning unless asked
- Return clean paragraphs only

Article:
${article}
`;

  const result = await geminiModel.generateContent(prompt);
  return result.response.text();
};
