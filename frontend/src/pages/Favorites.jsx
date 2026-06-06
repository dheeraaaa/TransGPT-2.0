import Sidebar from "../components/Sidebar";

function Favorites() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-cyan-400">Favorites</h1>
        <p className="text-gray-400 mt-3">
          Favorite translations will appear here.
        </p>
      </main>
    </div>
  );
}

export default Favorites;