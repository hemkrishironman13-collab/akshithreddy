export const geminiService = {
  async scanUrl(url: string) {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "scanUrl", payload: { url } }),
    });
    return res.json();
  },

  async analyzeFile(fileName: string, contentSnippet: string) {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "analyzeFile", payload: { fileName, contentSnippet } }),
    });
    return res.json();
  },

  async getChatResponse(prompt: string) {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "chat", payload: { prompt } }),
    });
    return res.json();
  },

  async generateQuiz(prompt: string) {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "generateQuiz", payload: { prompt } }),
    });
    return res.json();
  },

  // Speak text stays client-side
  async speakText(text: string, voiceName: string = "Kore", rate: string = "normal") {
    // Your previous decode + AudioContext logic stays exactly the same
    const speedModifier = rate === "slow" ? "Speak slowly: " : rate === "fast" ? "Speak quickly: " : "";
    const finalPrompt = `${speedModifier}${text}`;

    // Call server API for TTS
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "chat", payload: { prompt: finalPrompt } }),
    });

    const data = await res.json();
    const base64Audio = data?.audioBase64; // You can return TTS base64 from server
    if (base64Audio) {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const audioBuffer = await decodeAudioData(decode(base64Audio), audioCtx, 24000, 1);
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      source.start();
    }
  },
};
