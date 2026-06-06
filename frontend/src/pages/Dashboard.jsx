import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { Volume2, Mic, Copy, Star } from "lucide-react";

import { auth } from "../firebase/firebase";

function Dashboard() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("hi");

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleTranslate = () => {
    if (!inputText.trim()) {
      alert("Please enter text first");
      return;
    }

    const demoTranslations = {
      hi: "नमस्ते, आप कैसे हैं?",
      te: "హలో, మీరు ఎలా ఉన్నారు?",
      ta: "வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?",
      kn: "ಹಲೋ, ನೀವು ಹೇಗಿದ್ದೀರಿ?",
      en: inputText,
    };

    setTranslatedText(demoTranslations[toLang] || inputText);
  };

  const handleSpeak = () => {
    if (!translatedText) {
      alert("Translate text first");
      return;
    }

    const speech = new SpeechSynthesisUtterance(translatedText);
    window.speechSynthesis.speak(speech);
  };

  const handleCopy = () => {
    if (!translatedText) {
      alert("Nothing to copy");
      return;
    }

    navigator.clipboard.writeText(translatedText);
    alert("Copied!");
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = fromLang;
    recognition.start();

    recognition.onresult = (event) => {
      setInputText(event.results[0][0].transcript);
    };
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-cyan-400">
          TransGPT Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Input Text</h2>

          <select
            className="w-full mb-4 p-3 rounded bg-slate-800 outline-none"
            value={fromLang}
            onChange={(e) => setFromLang(e.target.value)}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="te">Telugu</option>
            <option value="ta">Tamil</option>
            <option value="kn">Kannada</option>
          </select>

          <textarea
            className="w-full h-48 p-4 rounded bg-slate-800 outline-none"
            placeholder="Type or speak something..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <button
            onClick={handleVoiceInput}
            className="mt-4 flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-lg"
          >
            <Mic size={18} />
            Voice Input
          </button>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Translated Text</h2>

          <select
            className="w-full mb-4 p-3 rounded bg-slate-800 outline-none"
            value={toLang}
            onChange={(e) => setToLang(e.target.value)}
          >
            <option value="hi">Hindi</option>
            <option value="en">English</option>
            <option value="te">Telugu</option>
            <option value="ta">Tamil</option>
            <option value="kn">Kannada</option>
          </select>

          <div className="w-full h-48 p-4 rounded bg-slate-800 text-gray-300">
            {translatedText || "Translation will appear here..."}
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSpeak}
              className="bg-cyan-500 hover:bg-cyan-600 px-4 py-3 rounded-lg"
            >
              <Volume2 size={18} />
            </button>

            <button
              onClick={handleCopy}
              className="bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-lg"
            >
              <Copy size={18} />
            </button>

            <button className="bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-lg">
              <Star size={18} />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleTranslate}
        className="mt-8 bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl font-semibold"
      >
        Translate
      </button>
    </div>
  );
}

export default Dashboard;