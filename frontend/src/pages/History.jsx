import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Trash2 } from "lucide-react";

import Sidebar from "../components/Sidebar";
import { auth, db } from "../firebase/firebase";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const user = auth.currentUser;

      const snapshot = await getDocs(collection(db, "translations"));

      const data = snapshot.docs
        .map((docItem) => ({
          id: docItem.id,
          ...docItem.data(),
        }))
        .filter((item) => item.userId === user?.uid);

      setHistory(data);
    } catch (error) {
      console.log("History Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "translations", id));
    fetchHistory();
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-cyan-400">
          Translation History
        </h1>

        <p className="text-gray-400 mt-2 mb-8">
          Your saved translations appear here.
        </p>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : history.length === 0 ? (
          <p className="text-gray-400">No translations saved yet.</p>
        ) : (
          <div className="grid gap-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 p-6 rounded-2xl border border-slate-800"
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">
                      {item.fromLang} → {item.toLang}
                    </p>

                    <p className="text-gray-300 mb-2">
                      <span className="text-cyan-400">Input:</span>{" "}
                      {item.inputText}
                    </p>

                    <p className="text-gray-300">
                      <span className="text-cyan-400">Output:</span>{" "}
                      {item.translatedText}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 h-fit p-3 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default History;