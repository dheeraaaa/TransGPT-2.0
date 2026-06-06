function FeatureCard({ title, description }) {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500 transition">
      <h3 className="text-xl font-semibold mb-3 text-cyan-400">
        {title}
      </h3>

      <p className="text-gray-400">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;