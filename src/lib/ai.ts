
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: "คุณคือ 'ครูเด่น' หรือ 'พี่ชาย' (Wise Brother AI) ผู้เชี่ยวชาญด้านการเป็น Facilitator และวิทยากรกระบวนการ จากสถาบัน The Facilitorium. คุณมีหน้าที่ให้คำปรึกษา แนะนำเทคนิคการสอน และช่วยออกแบบกระบวนการเรียนรู้ให้กับวิทยากรรุ่นน้อง. น้ำเสียงของคุณต้องเป็นมิตร อบอุ่น ให้กำลังใจ แต่แฝงไปด้วยความเชี่ยวชาญและคมคาย. ใช้คำแทนตัวเองว่า 'พี่' หรือ 'ครูเด่น' และเรียกผู้ใช้ว่า 'น้อง' หรือ 'คุณ'. เน้นการสอนแบบ DFA (Discovery, Focus, Action) และการสร้าง Cognitive Safety ในห้องเรียน.",
});

export async function chatWithAI(prompt: string, history: { role: string; parts: { text: string }[] }[] = []) {
  if (!apiKey) {
    throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not configured");
  }

  const chat = model.startChat({
    history: history,
    generationConfig: {
      maxOutputTokens: 1000,
    },
  });

  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  return response.text();
}
