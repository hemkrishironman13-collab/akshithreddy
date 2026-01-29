import { GoogleGenAI, Type, Modality } from '@google/genai';

const getAI = () =>
  new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

// ===== HELPERS =====
function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

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
      channelData[i] = dataInt16[i * numChannels + channel] / 32768;
    }
  }
  return buffer;
}

// ===== SERVICE =====
export const geminiService = {
  async generateQuiz(difficulty: 'easy' | 'hard' = 'easy') {
    const ai = getAI();

    const difficultyContext =
      difficulty === 'hard'
        ? `ADVANCED cybersecurity MCQs for professionals.
           Topics: Zero Trust, SQL Injection, OAuth2, cryptography, APTs.`
        : `BEGINNER cybersecurity MCQs.
           Topics: phishing, passwords, public Wi-Fi, device locks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `
Generate exactly 5 multiple-choice questions.
${difficultyContext}

Return ONLY valid JSON array:
[
  {
    "question": "",
    "options": ["", "", "", ""],
    "correctAnswer": "",
    "explanation": ""
  }
]
      `,
      config: {
        responseMimeType: 'application/json',
      },
    });

    return JSON.parse(response.text);
  },

  async speakText(text: string) {
    const ai = getAI();

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
      },
    });

    const base64Audio =
      response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) return;

    const audioCtx = new AudioContext({ sampleRate: 24000 });
    const audioBuffer = await decodeAudioData(
      decode(base64Audio),
      audioCtx,
      24000,
      1,
    );

    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtx.destination);
    source.start();
  },
};
