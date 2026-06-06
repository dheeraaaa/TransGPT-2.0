import Sidebar from "../components/Sidebar";
import { auth } from "../firebase/firebase";

function Profile() {
  const user = auth.currentUser;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-cyan-400">Profile</h1>

        <div className="bg-slate-900 p-6 rounded-2xl mt-6 max-w-md">
          <p className="text-gray-400">Email</p>
          <p className="text-xl mt-2">{user?.email}</p>
        </div>
      </main>
    </div>
  );
}

export default Profile;