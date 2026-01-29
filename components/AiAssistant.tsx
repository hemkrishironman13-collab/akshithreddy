export const runtime = "nodejs"; // Important for Vercel

import { GoogleGenAI, Type, Modality } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!, // Use Vercel env variable
});

export async function POST(req: Request) {
  const { action, payload } = await req.json();

  try {
    switch (action) {
      case "scanUrl":
        const scanResponse = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Analyze this URL: ${payload.url}. Return JSON with score, threats, recommendation, isSafe.`,
          config: {
            responseMimeType: "application/json",
          },
        });
        return NextResponse.json(JSON.parse(scanResponse.text));

      case "analyzeFile":
        const fileResponse = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Analyze file: Name=${payload.fileName}, Content=${payload.contentSnippet}. Return JSON with score, threats, recommendation, isSafe.`,
          config: {
            responseMimeType: "application/json",
          },
        });
        return NextResponse.json(JSON.parse(fileResponse.text));

      case "chat":
        const chatResponse = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: payload.prompt,
          config: {
            responseMimeType: "application/json",
          },
        });
        return NextResponse.json(JSON.parse(chatResponse.text));

      case "generateQuiz":
        const quizResponse = await ai.models.generateContent({
          model: "gemini-3-pro-preview",
          contents: payload.prompt,
          config: {
            responseMimeType: "application/json",
          },
        });
        return NextResponse.json(JSON.parse(quizResponse.text));

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
