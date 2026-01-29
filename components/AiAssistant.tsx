
import { GoogleGenAI, Type, Modality } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Helper to decode Base64 into bytes
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper to decode PCM bytes into AudioBuffer
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const geminiService = {
  async scanUrl(url: string) {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this URL for potential security threats: ${url}. Provide a JSON response evaluating safety.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "Safety score from 0 to 100" },
            threats: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of identified threats" },
            recommendation: { type: Type.STRING, description: "Final recommendation for the user" },
            isSafe: { type: Type.BOOLEAN, description: "Whether the URL is safe to visit" }
          },
          required: ["score", "threats", "recommendation", "isSafe"]
        }
      }
    });
    return JSON.parse(response.text);
  },

  async analyzeFile(fileName: string, contentSnippet: string) {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this file metadata/content for potential risks: Name: ${fileName}, Content Snippet: ${contentSnippet}. Provide a JSON response evaluating safety.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            threats: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendation: { type: Type.STRING },
            isSafe: { type: Type.BOOLEAN }
          },
          required: ["score", "threats", "recommendation", "isSafe"]
        }
      }
    });
    return JSON.parse(response.text);
  },

  async getChatResponse(prompt: string) {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a highly capable multilingual cybersecurity assistant. 
      1. Detect the language of the user's prompt (e.g., English, Telugu, Hindi, French, Japanese, etc.).
      2. Respond to the prompt fluently in that exact same language.
      
      Return your answer as a JSON object with:
      - "detectedLanguage": The name of the language you identified.
      - "text": Your helpful and professional response text in that language.
      
      User Prompt: ${prompt}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            detectedLanguage: { type: Type.STRING },
            text: { type: Type.STRING }
          },
          required: ["detectedLanguage", "text"]
        }
      }
    });
    return JSON.parse(response.text);
  },

  async speakText(text: string, voiceName: string = 'Kore', rate: string = 'normal') {
    const ai = getAI();
    // Using prompt engineering to control speech pace
    const speedModifier = rate === 'slow' ? 'Speak slowly: ' : rate === 'fast' ? 'Speak quickly: ' : '';
    const finalPrompt = `${speedModifier}${text}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: finalPrompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const audioBuffer = await decodeAudioData(decode(base64Audio), audioCtx, 24000, 1);
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      source.start();
    }
  },

  async generateQuiz(difficulty: 'easy' | 'hard' = 'easy') {
    const ai = getAI();
    const difficultyContext = difficulty === 'hard' 
      ? 'ADVANCED, technical multiple choice questions for security professionals. Include topics like: Zero-Trust Architecture, SQL Injection, Cryptographic Salts, APT patterns, and OAuth2 flow vulnerabilities. Use technical terminology.'
      : 'SIMPLE, beginner-friendly multiple choice questions for non-technical users. Include topics like: unique passwords, phishing email signs, public Wi-Fi safety, and basic lock screen use. Use very simple language.';

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Use Pro for more complex 'hard' questions
      contents: `Generate 5 ${difficultyContext} Return as a JSON array of objects.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ["id", "question", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  }
};
