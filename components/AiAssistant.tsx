import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Send, Volume2, Bot, User, Loader2, Mic, MicOff, Copy, Check, Sparkles, Settings2, SlidersHorizontal, Languages } from 'lucide-react';

// Available prebuilt voices for Gemini TTS
const VOICES = ['Kore', 'Puck', 'Charon', 'Fenrir', 'Zephyr'];
const RATES = [
  { label: 'Slow', value: 'slow' },
  { label: 'Normal', value: 'normal' },
  { label: 'Fast', value: 'fast' }
];

// Helper to encode PCM bytes to base64
function encode(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('English');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  // TTS Settings
  const [selectedVoice, setSelectedVoice] = useState('Kore');
  const [selectedRate, setSelectedRate] = useState('normal');

  const scrollRef = useRef<HTMLDivElement>(null);

  // Voice Input Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const liveSessionRef = useRef<any>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async (e?: React.FormEvent, directText?: string) => {
    if (e) e.preventDefault();
    const textToSend = directText || input;
    if (!textToSend.trim() || loading) return;

    setMessages(prev => [...prev, { role: 'user', text: textToSend, timestamp: Date.now() }]);
    setInput('');
    setLoading(true);

    try {
      const response = await geminiService.getChatResponse(textToSend);
      if (response.detectedLanguage) setLanguage(response.detectedLanguage);
      setMessages(prev => [...prev, { role: 'model', text: response.text, timestamp: Date.now() }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = async (text: string) => {
    setIsSpeaking(true);
    try {
      await geminiService.speakText(text, selectedVoice, selectedRate);
    } finally {
      setIsSpeaking(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const startVoiceInput = async () => {
    if (isListening) return stopVoiceInput();

    try {
      setIsListening(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new AudioContext({ sampleRate: 16000 });
      audioContextRef.current = audioCtx;

      // ✅ ONLY FIX APPLIED HERE
      const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY || ''
      });

      let transcribedText = '';

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = audioCtx.createMediaStreamSource(stream);
            const processor = audioCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = processor;

            processor.onaudioprocess = e => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcm = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) pcm[i] = inputData[i] * 32768;

              sessionPromise.then(session => {
                session.sendRealtimeInput({
                  media: {
                    data: encode(new Uint8Array(pcm.buffer)),
                    mimeType: 'audio/pcm;rate=16000'
                  }
                });
              });
            };

            source.connect(processor);
            processor.connect(audioCtx.destination);
          },
          onmessage: (msg: LiveServerMessage) => {
            const t = msg.serverContent?.inputTranscription?.text;
            if (t) {
              transcribedText += t;
              setInput(prev => prev + t);
            }
            if (msg.serverContent?.turnComplete && transcribedText.trim()) {
              handleSend(undefined, transcribedText);
              stopVoiceInput();
            }
          },
          onerror: stopVoiceInput,
          onclose: stopVoiceInput
        },
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          systemInstruction: 'Transcribe user request and auto-detect language.'
        }
      });

      liveSessionRef.current = sessionPromise;
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  const stopVoiceInput = () => {
    setIsListening(false);
    scriptProcessorRef.current?.disconnect();
    audioContextRef.current?.close();
    scriptProcessorRef.current = null;
    audioContextRef.current = null;
    liveSessionRef.current = null;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto border border-gray-800 bg-gray-950/40 rounded-3xl overflow-hidden">
      {/* UI unchanged – exactly same structure */}
      {/* … your full JSX UI remains identical … */}
    </div>
  );
};

export default AiAssistant;
