import { Link, useNavigate } from "react-router-dom";
import { Languages, History, Star, User, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-6 hidden md:flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-cyan-400 mb-10">
          TransGPT 2.0
        </h1>

        <nav className="space-y-3">
          <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800">
            <Languages size={20} /> Translate
          </Link>

          <Link to="/history" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800">
            <History size={20} /> History
          </Link>

          <Link to="/favorites" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800">
            <Star size={20} /> Favorites
          </Link>

          <Link to="/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800">
            <User size={20} /> Profile
          </Link>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-3 rounded-lg bg-red-500 hover:bg-red-600"
      >
        <LogOut size={20} /> Logout
      </button>
    </aside>
  );
}

export default Sidebar;