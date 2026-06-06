import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-slate-900 p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-cyan-400">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-slate-800 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded bg-slate-800 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-cyan-500 py-3 rounded font-semibold">
          Login
        </button>

        <p className="mt-4 text-gray-400">
          New user? <Link to="/signup" className="text-cyan-400">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;