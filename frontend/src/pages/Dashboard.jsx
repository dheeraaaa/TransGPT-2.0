import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Volume2, Mic, Copy, Star, ArrowLeftRight } from "lucide-react";

import Sidebar from "../components/Sidebar";
import { auth, db } from "../firebase/firebase";
import API from "../services/api";

function Dashboard() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("hi");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const saveHistory = async (translated) => {
    const user = auth.currentUser;
    if (!user) return;

    await addDoc(collection(db, "translations"), {
      userId: user.uid,
      inputText,
      translatedText: translated,
      fromLang,
      toLang,
      createdAt: serverTimestamp(),
    });
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      alert("Please enter text first");
      return;
    }

    setIsLoading(true);

    try {
      const response = await API.post("/translate", {
        text: inputText,
        source: fromLang,
        target: toLang,
      });

      const translated = response.data.translated;
      setTranslatedText(translated);
      await saveHistory(translated);
    } catch (error) {
      console.log(error);
      alert("Translation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwap = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const handleSpeak = () => {
  if (!translatedText) {
    alert("Translate text first");
    return;
  }

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(translatedText);

  const voiceLangs = {
    en: "en-US",
    hi: "hi-IN",
    te: "te-IN",
    ta: "ta-IN",
    kn: "kn-IN",
  };

  speech.lang = voiceLangs[toLang] || "en-US";
  speech.rate = 0.9;
  speech.pitch = 1;

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
    alert("Speech recognition works best in Google Chrome");
    return;
  }

  const recognition = new SpeechRecognition();

  const voiceLangs = {
    en: "en-US",
    hi: "hi-IN",
    te: "te-IN",
    ta: "ta-IN",
    kn: "kn-IN",
  };

  recognition.lang = voiceLangs[fromLang] || "en-US";
  recognition.interimResults = false;
  recognition.continuous = false;

  setIsListening(true);
  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setInputText(transcript);
    setIsListening(false);
  };

  recognition.onerror = (event) => {
    console.log(event.error);
    setIsListening(false);
    alert("Voice input failed. Please allow microphone permission.");
  };

  recognition.onend = () => {
    setIsListening(false);
  };
};

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Voice Translator</h1>
          <p className="text-gray-400 mt-2">
            Speak or type in one language, translate into another.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-400 text-sm">Source Language</label>

              <select
                className="w-full mt-2 mb-4 p-3 rounded-xl bg-slate-800 outline-none"
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
                className="w-full h-56 p-4 rounded-xl bg-slate-800 outline-none resize-none"
                placeholder="Type here or use microphone..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />

              <button
                onClick={handleVoiceInput}
                className={`mt-4 flex items-center gap-3 px-5 py-3 rounded-full font-semibold transition ${
                  isListening
                    ? "bg-red-500 animate-pulse"
                    : "bg-cyan-500 hover:bg-cyan-600"
                }`}
              >
                <Mic size={18} />
                {isListening ? "Listening..." : "Speak Now"}
              </button>

              {isListening && (
                <div className="flex gap-1 mt-4 h-10 items-end">
                  {[...Array(18)].map((_, i) => (
                    <span
                      key={i}
                      className="w-1 bg-cyan-400 rounded animate-pulse"
                      style={{ height: `${10 + (i % 6) * 5}px` }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="text-gray-400 text-sm">Translate To</label>

              <select
                className="w-full mt-2 mb-4 p-3 rounded-xl bg-slate-800 outline-none"
                value={toLang}
                onChange={(e) => setToLang(e.target.value)}
              >
                <option value="hi">Hindi</option>
                <option value="en">English</option>
                <option value="te">Telugu</option>
                <option value="ta">Tamil</option>
                <option value="kn">Kannada</option>
              </select>

              <div className="w-full h-56 p-4 rounded-xl bg-slate-800 text-gray-300 overflow-y-auto">
                {translatedText || "Translation will appear here..."}
              </div>

              <div className="flex gap-3 mt-4">
                <button onClick={handleCopy} className="bg-slate-800 hover:bg-slate-700 p-3 rounded-xl">
                  <Copy size={18} />
                </button>

                <button onClick={handleSpeak} className="bg-slate-800 hover:bg-slate-700 p-3 rounded-xl">
                  <Volume2 size={18} />
                </button>

                <button className="bg-slate-800 hover:bg-slate-700 p-3 rounded-xl">
                  <Star size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <button
              onClick={handleSwap}
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 px-6 py-4 rounded-xl"
            >
              <ArrowLeftRight size={18} />
              Swap
            </button>

            <button
              onClick={handleTranslate}
              className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl font-semibold"
            >
              {isLoading ? "Translating..." : "Translate"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;